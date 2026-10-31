const { GoogleGenerativeAI } = require('@google/generative-ai');
const { classifyByKeywords, hasSafetyKeywords } = require('./classificationService');
const { generateFallbackSummary } = require('./summaryService');
const { detectDuplicates } = require('./duplicateDetectionService');
const { calculatePriority } = require('./priorityService');
const { CATEGORIES } = require('../config/constants');

let genAI = null;

const initGemini = () => {
  if (process.env.GEMINI_API_KEY && !genAI) {
    try {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (e) {
      console.warn('Failed to init Gemini AI:', e.message);
    }
  }
  return genAI;
};

const getGeminiModel = () => {
  const ai = initGemini();
  if (!ai) return null;
  return ai.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  });
};

/**
 * Classify text using Gemini
 */
const classifyWithGemini = async (text) => {
  const model = getGeminiModel();
  if (!model) throw new Error('Gemini not available');

  const prompt = `You are a civic issue classifier. Classify the following complaint into exactly ONE of these categories:
${CATEGORIES.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Complaint: "${text}"

Respond with ONLY a JSON object in this exact format:
{"category": "<category name>", "confidence": <0-1>, "safetyFlag": <true/false>, "reasoning": "<brief reason>"}`;

  const result = await Promise.race([
    model.generateContent(prompt),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Gemini timeout')), 8000)),
  ]);

  const responseText = result.response.text();
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Invalid Gemini response');

  const parsed = JSON.parse(jsonMatch[0]);
  if (!CATEGORIES.includes(parsed.category)) {
    parsed.category = classifyByKeywords(text);
  }
  return parsed;
};

/**
 * Summarize text using Gemini
 */
const summarizeWithGemini = async (text, category) => {
  const model = getGeminiModel();
  if (!model) throw new Error('Gemini not available');

  const prompt = `Summarize this civic complaint in 1-2 concise sentences for a municipal officer dashboard. Be specific about the issue.

Category: ${category}
Complaint: "${text}"

Respond with ONLY the summary text, no JSON, no markdown.`;

  const result = await Promise.race([
    model.generateContent(prompt),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Gemini timeout')), 8000)),
  ]);

  return result.response.text().trim();
};

/**
 * Generate action brief using Gemini
 */
const generateActionBrief = async (topReports, clusters) => {
  const model = getGeminiModel();
  let source = 'gemini';

  if (model) {
    try {
      const context = JSON.stringify({
        criticalReports: topReports.slice(0, 5).map((r) => ({
          id: r.reportId,
          category: r.categoryFinal,
          priority: r.priority?.label,
          score: r.priority?.score,
          location: r.location?.address || `${r.location?.lat?.toFixed(3)}, ${r.location?.lng?.toFixed(3)}`,
          summary: r.summary,
        })),
        hotspots: clusters.slice(0, 3).map((c) => ({
          id: c.clusterId,
          reportCount: c.reportCount,
          dominantCategory: c.dominantCategory,
          location: `${c.center?.lat?.toFixed(3)}, ${c.center?.lng?.toFixed(3)}`,
        })),
      });

      const prompt = `You are a civic planning AI assistant. Based on the following data about critical civic complaints and hotspots, generate a concise action brief (3-5 bullet points) for a municipal decision-maker. Each bullet should state: what to prioritize, where, and why.

Data: ${context}

Respond with ONLY the action brief as bullet points (use • for bullets). Be specific and actionable.`;

      const result = await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 8000)),
      ]);

      return { text: result.response.text().trim(), source: 'gemini' };
    } catch (e) {
      console.warn('Gemini brief failed, using fallback:', e.message);
      source = 'fallback';
    }
  } else {
    source = 'fallback';
  }

  // Fallback brief
  const lines = [];
  if (topReports.length > 0) {
    const critical = topReports.filter((r) => r.priority?.label === 'Critical');
    const high = topReports.filter((r) => r.priority?.label === 'High');
    if (critical.length > 0) {
      lines.push(`• URGENT: ${critical.length} critical complaint(s) require immediate attention, including: ${critical[0].categoryFinal} at ${critical[0].location?.address || 'reported location'}.`);
    }
    if (high.length > 0) {
      lines.push(`• HIGH PRIORITY: ${high.length} high-priority issue(s) pending, primarily ${high[0].categoryFinal} problems.`);
    }
  }
  if (clusters.length > 0) {
    lines.push(`• HOTSPOT DETECTED: ${clusters[0].reportCount} reports clustered near ${clusters[0].center?.lat?.toFixed(3)}, ${clusters[0].center?.lng?.toFixed(3)} - mainly ${clusters[0].dominantCategory}.`);
  }
  const pending = topReports.filter((r) => r.status === 'Submitted' || r.status === 'Reviewed');
  if (pending.length > 0) {
    lines.push(`• ${pending.length} complaint(s) awaiting initial review and assignment.`);
  }
  lines.push('• Recommend prioritizing safety hazards and cluster hotspots for dispatch.');

  return { text: lines.join('\n'), source: 'fallback' };
};

/**
 * Main AI pipeline - runs when a report is submitted
 */
const runAIPipeline = async ({ title, text, location, categoryUser, existingReports, ageInDays = 0 }) => {
  let categoryAI = 'Other';
  let summary = '';
  let aiSource = 'fallback';
  let safetyFlag = false;
  let confidence = 0;
  let reasonText = '';

  // Step 1: Categorize
  try {
    const geminiResult = await classifyWithGemini(text);
    categoryAI = geminiResult.category;
    safetyFlag = geminiResult.safetyFlag || false;
    confidence = geminiResult.confidence || 0.8;
    reasonText = geminiResult.reasoning || '';
    aiSource = 'gemini';
  } catch (e) {
    console.warn('Classification fallback:', e.message);
    categoryAI = classifyByKeywords(`${title} ${text}`);
    safetyFlag = hasSafetyKeywords(`${title} ${text}`);
    confidence = 0.5;
    reasonText = 'Classified using keyword matching (Gemini unavailable)';
    aiSource = 'fallback';
  }

  const categoryFinal = categoryUser && categoryUser !== '' ? categoryUser : categoryAI;

  // Step 2: Summarize
  try {
    if (aiSource === 'gemini') {
      summary = await summarizeWithGemini(`${title}. ${text}`, categoryFinal);
    } else {
      throw new Error('Use fallback');
    }
  } catch (e) {
    summary = generateFallbackSummary(`${title}. ${text}`, categoryFinal);
  }

  // Step 3: Duplicate detection
  const duplicateResult = detectDuplicates(
    { text: `${title} ${text}`, location, categoryAI },
    existingReports
  );

  const duplicateCount = duplicateResult.isDuplicate ? 1 : 0;

  // Step 4: Priority scoring
  const priorityResult = calculatePriority({
    text: `${title} ${text}`,
    categoryFinal,
    duplicateCount,
    isInCluster: false, // will be updated after hotspot detection
    ageInDays,
  });

  return {
    categoryAI,
    categoryFinal,
    summary,
    aiSource,
    safetyFlag: priorityResult.safetyFlag || safetyFlag,
    confidence,
    reasonText,
    duplicate: duplicateResult,
    priority: {
      score: priorityResult.score,
      label: priorityResult.label,
      factors: priorityResult.factors,
    },
  };
};

module.exports = { runAIPipeline, generateActionBrief };


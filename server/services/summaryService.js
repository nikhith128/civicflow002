/**
 * Fallback summary generation
 */
const generateFallbackSummary = (text, category) => {
  // Trim to 150 chars or first 2 sentences
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  if (sentences.length >= 2) {
    return sentences.slice(0, 2).join('. ') + '.';
  }
  return text.length > 150 ? text.substring(0, 150) + '...' : text;
};

module.exports = { generateFallbackSummary };


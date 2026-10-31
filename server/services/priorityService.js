const {
  CATEGORY_BASE_SEVERITY,
  PRIORITY_THRESHOLDS,
  PRIORITY_LABELS,
} = require('../config/constants');
const { hasSafetyKeywords } = require('./classificationService');

/**
 * Calculate priority score with explainable factors
 */
const calculatePriority = ({ text, categoryFinal, duplicateCount, isInCluster, ageInDays }) => {
  const factors = [];
  let totalScore = 0;

  // 1. Safety risk
  const safetyFlag = hasSafetyKeywords(text);
  let safetyScore = 0;
  if (safetyFlag) {
    safetyScore = 35;
    factors.push({
      name: 'Safety Risk',
      contribution: safetyScore,
      description: 'Report contains safety hazard keywords (manhole, live wire, unsafe structure, etc.)',
    });
  } else {
    // Minor safety check
    const minorSafetyWords = ['broken', 'damaged', 'urgent', 'dangerous'];
    const hasMinor = minorSafetyWords.some((w) => text.toLowerCase().includes(w));
    if (hasMinor) {
      safetyScore = 15;
      factors.push({
        name: 'Safety Risk',
        contribution: safetyScore,
        description: 'Report indicates potential risk or urgent damage',
      });
    } else {
      factors.push({
        name: 'Safety Risk',
        contribution: 0,
        description: 'No immediate safety hazard detected',
      });
    }
  }
  totalScore += safetyScore;

  // 2. Category base severity
  const baseSeverity = CATEGORY_BASE_SEVERITY[categoryFinal] || 5;
  factors.push({
    name: 'Category Severity',
    contribution: baseSeverity,
    description: `${categoryFinal} category has a base severity of ${baseSeverity} points`,
  });
  totalScore += baseSeverity;

  // 3. Duplicate/report count bonus
  const dupBonus = Math.min(duplicateCount * 3, 15);
  if (duplicateCount > 0) {
    factors.push({
      name: 'Duplicate Reports',
      contribution: dupBonus,
      description: `${duplicateCount} similar report(s) found in the area (+3 per duplicate, max 15)`,
    });
  } else {
    factors.push({
      name: 'Duplicate Reports',
      contribution: 0,
      description: 'No duplicate reports found in the area',
    });
  }
  totalScore += dupBonus;

  // 4. Cluster membership
  if (isInCluster) {
    factors.push({
      name: 'Hotspot Cluster',
      contribution: 10,
      description: 'This report is part of a geographic hotspot with multiple related issues',
    });
    totalScore += 10;
  } else {
    factors.push({
      name: 'Hotspot Cluster',
      contribution: 0,
      description: 'Not part of an identified hotspot cluster',
    });
  }

  // 5. Age
  const ageBonus = Math.min(ageInDays || 0, 15);
  if (ageBonus > 0) {
    factors.push({
      name: 'Report Age',
      contribution: ageBonus,
      description: `Issue has been unresolved for ${Math.round(ageInDays)} day(s) (+1 per day, max 15)`,
    });
  } else {
    factors.push({
      name: 'Report Age',
      contribution: 0,
      description: 'Newly submitted report',
    });
  }
  totalScore += ageBonus;

  // Cap at 100
  const finalScore = Math.min(Math.round(totalScore), 100);

  let label;
  if (finalScore >= PRIORITY_THRESHOLDS.CRITICAL) {
    label = PRIORITY_LABELS.CRITICAL;
  } else if (finalScore >= PRIORITY_THRESHOLDS.HIGH) {
    label = PRIORITY_LABELS.HIGH;
  } else if (finalScore >= PRIORITY_THRESHOLDS.MEDIUM) {
    label = PRIORITY_LABELS.MEDIUM;
  } else {
    label = PRIORITY_LABELS.LOW;
  }

  return { score: finalScore, label, factors, safetyFlag };
};

module.exports = { calculatePriority };


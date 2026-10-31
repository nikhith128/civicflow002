const haversine = require('../utils/haversine');
const { textSimilarity } = require('../utils/tfidf');
const { DUPLICATE_RADIUS_METERS, DUPLICATE_SIMILARITY_THRESHOLD } = require('../config/constants');

/**
 * Find potential duplicate reports
 * @param {Object} newReport - The new report being submitted {text, location, categoryAI}
 * @param {Array} existingReports - Array of existing reports from DB
 * @returns {Object} { isDuplicate, parentId, similarity, reason }
 */
const detectDuplicates = (newReport, existingReports) => {
  const candidates = existingReports.filter((r) => {
    if (!r.location || !r.location.lat) return false;
    const dist = haversine(
      newReport.location.lat,
      newReport.location.lng,
      r.location.lat,
      r.location.lng
    );
    return dist <= DUPLICATE_RADIUS_METERS;
  });

  if (candidates.length === 0) {
    return { isDuplicate: false, parentId: null, similarity: 0, reason: '' };
  }

  // Find best similarity match
  let bestMatch = null;
  let bestScore = 0;

  for (const candidate of candidates) {
    const simScore = textSimilarity(newReport.text, candidate.text);
    if (simScore > bestScore) {
      bestScore = simScore;
      bestMatch = candidate;
    }
  }

  if (bestScore >= DUPLICATE_SIMILARITY_THRESHOLD && bestMatch) {
    const dist = haversine(
      newReport.location.lat,
      newReport.location.lng,
      bestMatch.location.lat,
      bestMatch.location.lng
    );
    return {
      isDuplicate: true,
      parentId: bestMatch.reportId,
      similarity: Math.round(bestScore * 100) / 100,
      reason: `Found similar report ${bestMatch.reportId} within ${Math.round(dist)}m with ${Math.round(bestScore * 100)}% text similarity`,
    };
  }

  return { isDuplicate: false, parentId: null, similarity: 0, reason: '' };
};

module.exports = { detectDuplicates };


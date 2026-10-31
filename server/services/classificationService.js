const { CATEGORIES, CATEGORY_BASE_SEVERITY } = require('../config/constants');

const CATEGORY_KEYWORDS = {
  'Waterlogging/Drainage': [
    'waterlog', 'flooding', 'flood', 'drain', 'drainage', 'waterlogged',
    'stagnant', 'water accumulation', 'puddle', 'overflow', 'blocked drain',
    'sewage overflow', 'waterlogging',
  ],
  'Road Damage': [
    'pothole', 'road', 'pavement', 'crack', 'broken road', 'road damage',
    'bump', 'damaged road', 'road repair', 'speed bump', 'road broken',
    'tarmac', 'asphalt',
  ],
  'Garbage/Waste': [
    'garbage', 'waste', 'trash', 'litter', 'dump', 'refuse', 'rubbish',
    'filth', 'dirty', 'bin', 'overflowing', 'solid waste',
  ],
  Streetlight: [
    'streetlight', 'street light', 'lamp post', 'dark', 'light broken',
    'no lighting', 'night visibility', 'street lamp', 'pole light',
  ],
  'Water Supply': [
    'water supply', 'no water', 'water shortage', 'water pipeline', 'pipe leak',
    'water pressure', 'drinking water', 'tap water', 'water connection',
    'water cut',
  ],
  'Electricity/Power': [
    'electricity', 'power cut', 'power outage', 'no power', 'electric pole',
    'wire', 'transformer', 'power supply', 'electric failure',
  ],
  'Public Safety Hazard': [
    'manhole', 'open manhole', 'safety hazard', 'dangerous', 'accident',
    'live wire', 'unsafe', 'risk', 'hazard', 'danger', 'emergency',
    'unsafe structure', 'collapse',
  ],
};

const classifyByKeywords = (text) => {
  const lowerText = text.toLowerCase();
  const scores = {};

  Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
    let score = 0;
    keywords.forEach((kw) => {
      if (lowerText.includes(kw.toLowerCase())) {
        score += 1;
      }
    });
    scores[category] = score;
  });

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (best && best[1] > 0) {
    return best[0];
  }
  return 'Other';
};

const hasSafetyKeywords = (text) => {
  const safetyWords = [
    'manhole', 'live wire', 'unsafe', 'dangerous', 'hazard', 'emergency',
    'accident', 'collapse', 'flood near school', 'fire',
  ];
  const lower = text.toLowerCase();
  return safetyWords.some((w) => lower.includes(w));
};

module.exports = { classifyByKeywords, hasSafetyKeywords };


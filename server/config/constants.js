const CATEGORIES = [
  'Waterlogging/Drainage',
  'Road Damage',
  'Garbage/Waste',
  'Streetlight',
  'Water Supply',
  'Electricity/Power',
  'Public Safety Hazard',
  'Other',
];

const STATUSES = ['Submitted', 'Reviewed', 'Assigned', 'In Progress', 'Resolved'];

const ROLES = ['citizen', 'officer', 'admin'];

const ASSIGNEES = [
  'Road Maintenance Team',
  'Sanitation Dept',
  'Electrical Division',
  'Water Supply Board',
  'Public Safety Unit',
];

const PRIORITY_LABELS = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

const PRIORITY_THRESHOLDS = {
  CRITICAL: 75,
  HIGH: 55,
  MEDIUM: 35,
};

const CATEGORY_BASE_SEVERITY = {
  'Public Safety Hazard': 25,
  'Waterlogging/Drainage': 18,
  'Road Damage': 14,
  Streetlight: 10,
  'Garbage/Waste': 8,
  'Water Supply': 10,
  'Electricity/Power': 12,
  Other: 5,
};

const DUPLICATE_RADIUS_METERS = 150;
const DUPLICATE_SIMILARITY_THRESHOLD = 0.6;
const DBSCAN_RADIUS_METERS = 250;
const DBSCAN_MIN_POINTS = 3;

module.exports = {
  CATEGORIES,
  STATUSES,
  ROLES,
  ASSIGNEES,
  PRIORITY_LABELS,
  PRIORITY_THRESHOLDS,
  CATEGORY_BASE_SEVERITY,
  DUPLICATE_RADIUS_METERS,
  DUPLICATE_SIMILARITY_THRESHOLD,
  DBSCAN_RADIUS_METERS,
  DBSCAN_MIN_POINTS,
};


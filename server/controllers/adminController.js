const Report = require('../models/Report');
const { STATUSES, CATEGORIES, ASSIGNEES } = require('../config/constants');

const getAdminStats = async (req, res, next) => {
  try {
    const [total, statusCounts, priorityCounts, categoryCounts] = await Promise.all([
      Report.countDocuments(),
      Report.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Report.aggregate([
        { $group: { _id: '$priority.label', count: { $sum: 1 } } },
      ]),
      Report.aggregate([
        { $group: { _id: '$categoryFinal', count: { $sum: 1 } } },
      ]),
    ]);

    const statusMap = {};
    statusCounts.forEach((s) => { statusMap[s._id] = s.count; });

    const priorityMap = {};
    priorityCounts.forEach((p) => { priorityMap[p._id] = p.count; });

    res.json({
      success: true,
      data: {
        total,
        byStatus: statusMap,
        byPriority: priorityMap,
        byCategory: Object.fromEntries(categoryCounts.map((c) => [c._id, c.count])),
        assignees: ASSIGNEES,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRecentReports = async (req, res, next) => {
  try {
    const reports = await Report.find()
      .sort({ 'priority.score': -1, createdAt: -1 })
      .limit(20)
      .populate('submittedBy', 'name')
      .lean();
    res.json({ success: true, data: { reports } });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminStats, getRecentReports };


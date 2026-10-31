const Report = require('../models/Report');
const { getHotspots, updateHotspots } = require('../services/hotspotService');
const { generateActionBrief } = require('../services/aiService');

const getSummary = async (req, res, next) => {
  try {
    const [total, statusAgg, priorityAgg, categoryAgg] = await Promise.all([
      Report.countDocuments(),
      Report.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Report.aggregate([{ $group: { _id: '$priority.label', count: { $sum: 1 } } }]),
      Report.aggregate([{ $group: { _id: '$categoryFinal', count: { $sum: 1 } } }]),
    ]);

    res.json({
      success: true,
      data: {
        total,
        byStatus: Object.fromEntries(statusAgg.map((s) => [s._id, s.count])),
        byPriority: Object.fromEntries(priorityAgg.map((p) => [p._id, p.count])),
        byCategory: Object.fromEntries(categoryAgg.map((c) => [c._id, c.count])),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getHotspotsAnalytics = async (req, res, next) => {
  try {
    const hotspots = await getHotspots();
    const allReports = await Report.find()
      .select('reportId location categoryFinal priority status clusterId')
      .lean();

    res.json({
      success: true,
      data: {
        clusters: hotspots,
        reports: allReports,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getActionBrief = async (req, res, next) => {
  try {
    const [topReports, clusters] = await Promise.all([
      Report.find({ status: { $ne: 'Resolved' } })
        .sort({ 'priority.score': -1 })
        .limit(10)
        .lean(),
      getHotspots(),
    ]);

    const brief = await generateActionBrief(topReports, clusters);

    res.json({
      success: true,
      data: { brief },
    });
  } catch (error) {
    next(error);
  }
};

const refreshHotspots = async (req, res, next) => {
  try {
    const count = await updateHotspots();
    res.json({ success: true, message: `Updated ${count} cluster(s)` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSummary, getHotspotsAnalytics, getActionBrief, refreshHotspots };


const Report = require('../models/Report');
const { runAIPipeline } = require('../services/aiService');
const { updateHotspots } = require('../services/hotspotService');
const { CATEGORIES, STATUSES, ASSIGNEES } = require('../config/constants');

let reportCounter = 1000;

const getNextReportId = async () => {
  const last = await Report.findOne().sort({ createdAt: -1 }).select('reportId').lean();
  if (last && last.reportId) {
    const num = parseInt(last.reportId.replace('CF-', ''), 10);
    if (!isNaN(num) && num >= reportCounter) {
      reportCounter = num + 1;
    }
  }
  return `CF-${reportCounter++}`;
};

const submitReport = async (req, res, next) => {
  try {
    const { title, text, categoryUser, lat, lng, address } = req.body;

    if (!text && !req.file) {
      return res.status(400).json({ success: false, message: 'Description or image is required' });
    }
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'Location is required' });
    }

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (isNaN(parsedLat) || isNaN(parsedLng) || parsedLat < -90 || parsedLat > 90 || parsedLng < -180 || parsedLng > 180) {
      return res.status(400).json({ success: false, message: 'Invalid coordinates' });
    }

    // Image handling
    let imageUrl = null;
    if (req.file) {
      const base64 = req.file.buffer.toString('base64');
      const mimeType = req.file.mimetype;
      imageUrl = `data:${mimeType};base64,${base64}`;
    }

    // Get existing reports for duplicate detection
    const existingReports = await Report.find({
      status: { $ne: 'Resolved' },
    }).select('reportId text location categoryFinal').lean();

    // Run AI pipeline
    const aiResult = await runAIPipeline({
      title,
      text: text || '',
      location: { lat: parsedLat, lng: parsedLng },
      categoryUser: categoryUser || '',
      existingReports,
      ageInDays: 0,
    });

    const reportId = await getNextReportId();

    const report = await Report.create({
      reportId,
      title,
      text: text || '',
      imageUrl,
      categoryUser: categoryUser || null,
      categoryAI: aiResult.categoryAI,
      categoryFinal: aiResult.categoryFinal,
      summary: aiResult.summary,
      location: {
        lat: parsedLat,
        lng: parsedLng,
        address: address || '',
      },
      status: 'Submitted',
      statusHistory: [
        {
          status: 'Submitted',
          at: new Date(),
          byRole: 'system',
          note: 'Report submitted',
        },
      ],
      priority: aiResult.priority,
      ai: {
        source: aiResult.aiSource,
        safetyFlag: aiResult.safetyFlag,
        confidence: aiResult.confidence,
        reasonText: aiResult.reasonText,
      },
      duplicate: aiResult.duplicate,
      submittedBy: req.user ? req.user._id : null,
    });

    // Run hotspot detection asynchronously
    updateHotspots().catch((e) => console.error('Hotspot update error:', e.message));

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      data: { report },
    });
  } catch (error) {
    next(error);
  }
};

const getAllReports = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      priority,
      search,
      sortBy = 'priority.score',
      sortOrder = 'desc',
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.categoryFinal = category;
    if (priority) filter['priority.label'] = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { text: { $regex: search, $options: 'i' } },
        { reportId: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortDir = sortOrder === 'asc' ? 1 : -1;

    const [reports, total] = await Promise.all([
      Report.find(filter)
        .sort({ [sortBy]: sortDir })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('submittedBy', 'name email')
        .lean(),
      Report.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        reports,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id).populate('submittedBy', 'name email').lean();
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.json({ success: true, data: { report } });
  } catch (error) {
    next(error);
  }
};

const trackReport = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findOne({ reportId: reportId.toUpperCase() })
      .select('-submittedBy -imageUrl')
      .lean();
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found. Check the report ID.' });
    }
    res.json({ success: true, data: { report } });
  } catch (error) {
    next(error);
  }
};

const getMyReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ submittedBy: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: { reports } });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    if (!STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    report.status = status;
    report.statusHistory.push({
      status,
      at: new Date(),
      byRole: req.user.role,
      note: note || '',
    });

    await report.save();

    res.json({ success: true, message: 'Status updated', data: { report } });
  } catch (error) {
    next(error);
  }
};

const assignReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assignee } = req.body;

    if (!assignee) {
      return res.status(400).json({ success: false, message: 'Assignee is required' });
    }

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    report.assignee = assignee;
    if (report.status === 'Submitted' || report.status === 'Reviewed') {
      report.status = 'Assigned';
      report.statusHistory.push({
        status: 'Assigned',
        at: new Date(),
        byRole: req.user.role,
        note: `Assigned to ${assignee}`,
      });
    }

    await report.save();
    res.json({ success: true, message: 'Report assigned', data: { report } });
  } catch (error) {
    next(error);
  }
};

const overrideAI = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryFinal, priorityLabel, priorityScore } = req.body;

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    if (categoryFinal && CATEGORIES.includes(categoryFinal)) {
      report.categoryFinal = categoryFinal;
    }
    if (priorityLabel) {
      report.priority.label = priorityLabel;
    }
    if (priorityScore !== undefined) {
      report.priority.score = priorityScore;
    }

    await report.save();
    res.json({ success: true, message: 'AI output overridden', data: { report } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitReport,
  getAllReports,
  getReportById,
  trackReport,
  getMyReports,
  updateStatus,
  assignReport,
  overrideAI,
};


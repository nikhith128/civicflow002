const express = require('express');
const router = express.Router();
const {
  submitReport,
  getAllReports,
  getReportById,
  trackReport,
  getMyReports,
  updateStatus,
  assignReport,
  overrideAI,
} = require('../controllers/reportController');
const { authMiddleware, optionalAuth } = require('../middleware/authMiddleware');
const { requireOfficerOrAdmin } = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');
const { submitRateLimit } = require('../middleware/rateLimit');

// Public
router.get('/track/:reportId', trackReport);

// Requires auth
router.post('/', submitRateLimit, optionalAuth, upload.single('image'), submitReport);
router.get('/my', authMiddleware, getMyReports);

// Admin/Officer only
router.get('/', authMiddleware, requireOfficerOrAdmin, getAllReports);
router.get('/:id', authMiddleware, requireOfficerOrAdmin, getReportById);
router.patch('/:id/status', authMiddleware, requireOfficerOrAdmin, updateStatus);
router.patch('/:id/assign', authMiddleware, requireOfficerOrAdmin, assignReport);
router.patch('/:id/override', authMiddleware, requireOfficerOrAdmin, overrideAI);

module.exports = router;


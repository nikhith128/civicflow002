const express = require('express');
const router = express.Router();
const {
  getSummary,
  getHotspotsAnalytics,
  getActionBrief,
  refreshHotspots,
} = require('../controllers/analyticsController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { requireOfficerOrAdmin } = require('../middleware/roleMiddleware');

router.get('/summary', authMiddleware, requireOfficerOrAdmin, getSummary);
router.get('/hotspots', authMiddleware, requireOfficerOrAdmin, getHotspotsAnalytics);
router.get('/brief', authMiddleware, requireOfficerOrAdmin, getActionBrief);
router.post('/refresh-hotspots', authMiddleware, requireOfficerOrAdmin, refreshHotspots);

module.exports = router;


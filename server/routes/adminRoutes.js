const express = require('express');
const router = express.Router();
const { getAdminStats, getRecentReports } = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { requireOfficerOrAdmin } = require('../middleware/roleMiddleware');

router.get('/stats', authMiddleware, requireOfficerOrAdmin, getAdminStats);
router.get('/recent', authMiddleware, requireOfficerOrAdmin, getRecentReports);

module.exports = router;


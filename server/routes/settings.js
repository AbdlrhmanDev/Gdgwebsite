const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings
} = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin', 'leader'), getSettings)
  .put(protect, authorize('admin', 'leader'), updateSettings);

module.exports = router;
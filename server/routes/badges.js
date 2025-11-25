const express = require('express');
const router = express.Router();
const {
  getBadges,
  getBadge,
  createBadge,
  updateBadge,
  deleteBadge
} = require('../controllers/badgeController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getBadges)
  .post(protect, authorize('admin'), createBadge);

router.route('/:id')
  .get(getBadge)
  .put(protect, authorize('admin'), updateBadge)
  .delete(protect, authorize('admin', 'leader'), deleteBadge);

module.exports = router;

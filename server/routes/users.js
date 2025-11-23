const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addPoints,
  awardBadge,
  getLeaderboard
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.get('/leaderboard', getLeaderboard);

// Public route for getting team members (filtered in frontend)
router.get('/public/team', getUsers);

router.route('/')
  .get(protect, authorize('admin'), getUsers)
  .post(protect, authorize('admin'), createUser);

router.route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, authorize('admin'), deleteUser);

router.post('/:id/points', protect, authorize('admin'), addPoints);
router.post('/:id/badges', protect, authorize('admin'), awardBadge);

module.exports = router;

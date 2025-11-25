const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  completeTask,
  addComment,
  deleteTask
} = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getTasks)
  .post(protect, authorize('admin'), createTask);

router.route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, authorize('admin', 'leader'), deleteTask);

router.put('/:id/complete', protect, completeTask);
router.post('/:id/comments', protect, addComment);

module.exports = router;

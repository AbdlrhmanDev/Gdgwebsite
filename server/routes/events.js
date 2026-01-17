const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventStats
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getEvents)
  .post(protect, authorize('admin', 'leader'), createEvent);

router.route('/:id')
  .get(getEvent)
  .put(protect, authorize('admin', 'leader'), updateEvent)
  .delete(protect, authorize('admin', 'leader'), deleteEvent);

router.get('/:id/stats', protect, authorize('admin', 'leader'), getEventStats);

module.exports = router;

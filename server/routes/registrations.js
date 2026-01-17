const express = require('express');
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  getRegistrations,
  cancelRegistration,
  markAttendance,
  addFeedback,
  deleteRegistration
} = require('../controllers/registrationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, registerForEvent);
router.get('/my', protect, getMyRegistrations);
router.get('/', protect, authorize('admin', 'leader'), getRegistrations);

router.delete('/:id', protect, authorize('admin', 'leader'), deleteRegistration);

router.put('/:id/cancel', protect, cancelRegistration);
router.put('/:id/attend', protect, authorize('admin', 'leader'), markAttendance);
router.put('/:id/feedback', protect, addFeedback);

module.exports = router;

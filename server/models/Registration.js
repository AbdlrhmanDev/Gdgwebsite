const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Registration details
  registrationMethod: {
    type: String,
    enum: ['google-forms', 'typeform', 'microsoft-forms', 'eventbrite', 'airtable', 'custom'],
    required: true
  },
  externalRegistrationId: {
    type: String
  },
  // Attendance tracking
  attended: {
    type: Boolean,
    default: false
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  // Feedback
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String
  },
  // Additional info
  questions: [{
    question: String,
    answer: String
  }],
  status: {
    type: String,
    enum: ['registered', 'confirmed', 'cancelled', 'attended', 'no-show'],
    default: 'registered'
  },
  cancellationReason: {
    type: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index to ensure one registration per user per event
registrationSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);

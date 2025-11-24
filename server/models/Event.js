const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true
  },
  titleEn: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide event description']
  },
  descriptionEn: {
    type: String
  },
  date: {
    type: Date,
    required: [true, 'Please provide event date']
  },
  time: {
    type: String,
    required: [true, 'Please provide event time']
  },
  location: {
    type: String,
    required: [true, 'Please provide event location']
  },
  locationEn: {
    type: String
  },
  type: {
    type: String,
    enum: ['workshop', 'hackathon', 'meetup', 'conference', 'webinar', 'competition', 'other'],
    default: 'workshop'
  },
  category: {
    type: String,
    enum: ['technical', 'design', 'business', 'networking', 'social', 'other'],
    default: 'technical'
  },
  image: {
    type: String,
    default: ''
  },
  capacity: {
    type: Number,
    default: 100
  },
  attendees: {
    type: Number,
    default: 0
  },
  registrationMethod: {
    type: String,
    enum: ['google-forms', 'typeform', 'microsoft-forms', 'eventbrite', 'airtable', 'custom', 'internal'],
    default: 'google-forms'
  },
  registrationUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  // Organizer info
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  speakers: [{
    name: String,
    title: String,
    bio: String,
    avatar: String
  }],
  // Registration tracking
  registrations: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    attended: {
      type: Boolean,
      default: false
    }
  }],
  // Requirements
  prerequisites: [String],
  requirements: [String],
  // Additional info
  duration: String,
  isOnline: {
    type: Boolean,
    default: false
  },
  meetingLink: String,
  resources: [{
    title: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
});

// Index for searching
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Virtual for checking if event is full
eventSchema.virtual('isFull').get(function() {
  return this.attendees >= this.capacity;
});

module.exports = mongoose.model('Event', eventSchema);

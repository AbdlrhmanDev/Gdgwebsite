const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide task title'],
    trim: true
  },
  titleEn: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide task description']
  },
  descriptionEn: {
    type: String
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'review', 'completed', 'cancelled'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  completedDate: {
    type: Date
  },
  tags: [String],
  // Points awarded upon completion
  points: {
    type: Number,
    default: 10
  },
  // Related event
  relatedEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  // Subtasks
  subtasks: [{
    title: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  // Comments/Updates
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Attachments
  attachments: [{
    name: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
});

// Index for filtering and searching
taskSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Task', taskSchema);

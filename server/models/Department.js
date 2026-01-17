const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['leadership', 'events', 'technical', 'marketing', 'design', 'pr', 'finance', 'hr']
  },
  nameAr: {
    type: String,
    required: true
  },
  nameEn: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  descriptionAr: {
    type: String
  },
  descriptionEn: {
    type: String
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#1a73e8'
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  goals: [String],
  achievements: [{
    title: String,
    description: String,
    date: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Department', departmentSchema);

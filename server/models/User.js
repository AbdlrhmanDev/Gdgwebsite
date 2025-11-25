const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'member', 'admin', 'leader'],
    default: 'member'
  },
  studentId: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    enum: ['leadership', 'events', 'technical', 'marketing', 'design', 'pr', 'finance', 'hr', 'none'],
    default: 'none'
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  skills: {
    type: [String],
    default: []
  },
  interests: {
    type: [String],
    default: []
  },
  avatar: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    trim: true
  },
  // Gamification fields
  points: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  badges: [{
    badgeId: String,
    earnedDate: {
      type: Date,
      default: Date.now
    }
  }],
  // Social links
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    website: String
  },
  // Activity tracking
  eventsAttended: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  tasksCompleted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  projects: [{
    name: String,
    description: String,
    url: String,
    stars: Number,
    tech: [String]
  }],
  certificates: [{
    name: String,
    url: String,
    date: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Calculate level based on points
userSchema.methods.calculateLevel = function() {
  this.level = Math.floor(this.points / 200) + 1;
  return this.level;
};

module.exports = mongoose.model('User', userSchema);

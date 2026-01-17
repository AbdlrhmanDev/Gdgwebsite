const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
    type: String,
    required: true
  },
  descriptionAr: {
    type: String
  },
  descriptionEn: {
    type: String
  },
  icon: {
    type: String,
    default: '🏆'
  },
  category: {
    type: String,
    enum: ['participation', 'achievement', 'leadership', 'skill', 'special'],
    default: 'achievement'
  },
  requirement: {
    type: String,
    required: true
  },
  requirementValue: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    default: 50
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Badge', badgeSchema);

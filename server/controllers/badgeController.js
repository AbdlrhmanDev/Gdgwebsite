const Badge = require('../models/Badge');

// @desc    Get all badges
// @route   GET /api/badges
// @access  Public
exports.getBadges = async (req, res) => {
  try {
    const { category, rarity } = req.query;
    
    let query = { isActive: true };
    if (category) query.category = category;
    if (rarity) query.rarity = rarity;
    
    const badges = await Badge.find(query).sort('points');
    
    res.status(200).json({
      success: true,
      count: badges.length,
      data: badges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single badge
// @route   GET /api/badges/:id
// @access  Public
exports.getBadge = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    
    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: badge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create badge
// @route   POST /api/badges
// @access  Private (Admin only)
exports.createBadge = async (req, res) => {
  try {
    const badge = await Badge.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Badge created successfully',
      data: badge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update badge
// @route   PUT /api/badges/:id
// @access  Private (Admin only)
exports.updateBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Badge updated successfully',
      data: badge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete badge
// @route   DELETE /api/badges/:id
// @access  Private (Admin only)
exports.deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    
    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found'
      });
    }
    
    await badge.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Badge deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

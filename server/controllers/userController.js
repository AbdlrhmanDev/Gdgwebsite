const User = require('../models/User');
const Badge = require('../models/Badge');
const bcrypt = require('bcryptjs');

// @desc    Create new user
// @route   POST /api/users
// @access  Private (Admin only)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only)
exports.getUsers = async (req, res) => {
  try {
    const { role, department, search } = req.query;
    
    let query = {};
    if (role) query.role = role;
    if (department) query.department = department;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .select('-password')
      .sort('-points');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('eventsAttended', 'title date type')
      .populate('tasksCompleted', 'title points department');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, bio, avatar, socialLinks, department } = req.body;
    
    // Check if user is updating their own profile or is admin
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (bio) updateData.bio = bio;
    if (avatar) updateData.avatar = avatar;
    if (socialLinks) updateData.socialLinks = socialLinks;
    if (department) updateData.department = department;
    
    // Admin-only fields
    if (req.user.role === 'admin') {
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (password) {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add points to user
// @route   POST /api/users/:id/points
// @access  Private (Admin only)
exports.addPoints = async (req, res) => {
  try {
    const { points, reason } = req.body;
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    user.points += points;
    user.calculateLevel();
    await user.save();
    
    res.status(200).json({
      success: true,
      message: `Added ${points} points for: ${reason}`,
      data: {
        points: user.points,
        level: user.level
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Award badge to user
// @route   POST /api/users/:id/badges
// @access  Private (Admin only)
exports.awardBadge = async (req, res) => {
  try {
    const { badgeId } = req.body;
    
    const user = await User.findById(req.params.id);
    const badge = await Badge.findById(badgeId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found'
      });
    }
    
    // Check if user already has this badge
    const hasBadge = user.badges.some(b => b.badgeId === badgeId);
    if (hasBadge) {
      return res.status(400).json({
        success: false,
        message: 'User already has this badge'
      });
    }
    
    user.badges.push({ badgeId, earnedDate: new Date() });
    user.points += badge.points;
    user.calculateLevel();
    await user.save();
    
    res.status(200).json({
      success: true,
      message: `Badge "${badge.name}" awarded successfully`,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get leaderboard
// @route   GET /api/users/leaderboard
// @access  Public
exports.getLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const users = await User.find({ isActive: true })
      .select('name email avatar points level badges department')
      .sort('-points')
      .limit(limit);
    
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        department: user.department
      },
      points: user.points,
      level: user.level,
      badgeCount: user.badges.length
    }));
    
    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user rank
// @route   GET /api/users/:id/rank
// @access  Public
exports.getUserRank = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const rank = await User.countDocuments({ points: { $gt: user.points } }) + 1;

    res.status(200).json({
      success: true,
      data: {
        rank
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

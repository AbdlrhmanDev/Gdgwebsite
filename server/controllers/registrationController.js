const Registration = require('../models/Registration');
const Event = require('../models/Event');
const User = require('../models/User');
const Settings = require('../models/Settings');
const mongoose = require('mongoose');

// @desc    Register for event
// @route   POST /api/registrations
// @access  Private
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId, registrationMethod, questions } = req.body;
    
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if event is full
    if (event.attendees >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }
    
    // Check if already registered
    const existingRegistration = await Registration.findOne({
      event: eventId,
      user: req.user.id
    });
    
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this event'
      });
    }
    
    // Create registration
    const registration = await Registration.create({
      event: eventId,
      user: req.user.id,
      registrationMethod,
      questions
    });
    
    // Update event attendees count
    event.attendees += 1;
    await event.save();
    
    // Add event to user's eventsAttended
    await User.findByIdAndUpdate(req.user.id, {
      $push: { eventsAttended: eventId }
    });
    
    res.status(201).json({
      success: true,
      message: 'Successfully registered for event',
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's registrations
// @route   GET /api/registrations/my
// @access  Private
exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate('event', 'title date time location type image')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all registrations (admin)
// @route   GET /api/registrations
// @access  Private (Admin only)
exports.getRegistrations = async (req, res) => {
  try {
    const { eventId, status } = req.query;
    
    let query = {};
    if (eventId) query.event = eventId;
    if (status) query.status = status;
    
    const registrations = await Registration.find(query)
      .populate('event', 'title date time location')
      .populate('user', 'name email studentId department')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel registration
// @route   PUT /api/registrations/:id/cancel
// @access  Private
exports.cancelRegistration = async (req, res) => {
  try {
    const { cancellationReason } = req.body;
    
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    // Check authorization
    if (registration.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this registration'
      });
    }
    
    // Delete the registration instead of marking it as cancelled
    await Registration.findByIdAndDelete(req.params.id);
    
    // Update event attendees count
    await Event.findByIdAndUpdate(registration.event, {
      $inc: { attendees: -1 }
    });
    
    // Remove event from user's eventsAttended array
    const userId = registration.user;
    const eventId = registration.event;
    console.log('Removing event from user:', { userId, eventId });
    
    const updateResult = await User.findByIdAndUpdate(
      userId,
      { $pull: { eventsAttended: eventId } },
      { new: true }
    );
    
    console.log('User update result:', updateResult?.eventsAttended);
    
    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Mark attendance
// @route   PUT /api/registrations/:id/attend
// @access  Private (Admin only)
exports.markAttendance = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    registration.attended = true;
    registration.status = 'attended';
    registration.checkInTime = new Date();
    await registration.save();
    
    // Award points to user
    const user = await User.findById(registration.user);
    if (user) {
      const attendancePointsSetting = await Settings.findOne({ key: 'attendancePoints' });
      const attendancePoints = attendancePointsSetting ? attendancePointsSetting.value : 50;
      user.points += attendancePoints;
      user.calculateLevel();
      await user.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Attendance marked successfully',
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add feedback
// @route   PUT /api/registrations/:id/feedback
// @access  Private
exports.addFeedback = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }
    
    // Check authorization
    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add feedback for this registration'
      });
    }
    
    registration.rating = rating;
    registration.feedback = feedback;
    await registration.save();
    
    res.status(200).json({
      success: true,
      message: 'Feedback added successfully',
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete registration
// @route   DELETE /api/registrations/:id
// @access  Private (Admin & Leader)
exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    // Update event attendees count
    await Event.findByIdAndUpdate(registration.event, {
      $inc: { attendees: -1 }
    });

    res.status(200).json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
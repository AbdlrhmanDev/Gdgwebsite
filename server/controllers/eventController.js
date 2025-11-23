const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const { type, status, featured, search, sort } = req.query;
    
    // Build query
    let query = {};
    
    if (type) query.type = type;
    if (status) query.status = status;
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$text = { $search: search };
    }
    
    // Build sort
    let sortOption = {};
    if (sort === 'date') sortOption = { date: 1 };
    else if (sort === '-date') sortOption = { date: -1 };
    else sortOption = { createdAt: -1 };
    
    const events = await Event.find(query)
      .populate('organizer', 'name email avatar')
      .sort(sortOption);
    
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email avatar department')
      .populate('registrations.user', 'name email avatar');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin only)
exports.createEvent = async (req, res) => {
  try {
    // Add organizer to req.body
    req.body.organizer = req.user.id;
    
    const event = await Event.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin only)
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    await event.deleteOne();
    
    // Also delete related registrations
    await Registration.deleteMany({ event: req.params.id });
    
    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get event statistics
// @route   GET /api/events/:id/stats
// @access  Private (Admin only)
exports.getEventStats = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    const registrations = await Registration.find({ event: req.params.id })
      .populate('user', 'name email department');
    
    const stats = {
      totalRegistrations: registrations.length,
      attended: registrations.filter(r => r.attended).length,
      cancelled: registrations.filter(r => r.status === 'cancelled').length,
      capacity: event.capacity,
      availableSpots: event.capacity - registrations.length,
      registrationRate: ((registrations.length / event.capacity) * 100).toFixed(2),
      attendanceRate: registrations.length > 0 
        ? ((registrations.filter(r => r.attended).length / registrations.length) * 100).toFixed(2)
        : 0
    };
    
    res.status(200).json({
      success: true,
      data: {
        event,
        stats,
        registrations
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

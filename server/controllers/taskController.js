const Task = require('../models/Task');
const User = require('../models/User');
const Department = require('../models/Department');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const { department, status, priority, assignedTo } = req.query;
    
    let query = {};
    if (department) query.department = department;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;
    
    // If not admin, only show tasks assigned to user or in their department
    if (req.user.role !== 'admin') {
      query.$or = [
        { assignedTo: req.user.id },
        { department: req.user.department }
      ];
    }
    
    const tasks = await Task.find(query)
      .populate('department', 'name nameAr nameEn color')
      .populate('assignedTo', 'name email avatar')
      .populate('createdBy', 'name email')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('department', 'name nameAr nameEn color')
      .populate('assignedTo', 'name email avatar department')
      .populate('createdBy', 'name email avatar')
      .populate('relatedEvent', 'title date')
      .populate('comments.user', 'name avatar');
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (Admin only)
exports.createTask = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    
    const task = await Task.create(req.body);
    
    // Add task to department
    await Department.findByIdAndUpdate(
      req.body.department,
      { $push: { tasks: task._id } }
    );
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check authorization
    const isAssigned = task.assignedTo.some(id => id.toString() === req.user.id);
    if (req.user.role !== 'admin' && !isAssigned) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }
    
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Complete task
// @route   PUT /api/tasks/:id/complete
// @access  Private
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if user is assigned to task
    const isAssigned = task.assignedTo.some(id => id.toString() === req.user.id);
    if (!isAssigned && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to complete this task'
      });
    }
    
    task.status = 'completed';
    task.completedDate = new Date();
    await task.save();
    
    // Award points to assigned users
    for (const userId of task.assignedTo) {
      const user = await User.findById(userId);
      if (user) {
        user.points += task.points;
        user.tasksCompleted.push(task._id);
        user.calculateLevel();
        await user.save();
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Task completed! ${task.points} points awarded`,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add comment to task
// @route   POST /api/tasks/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    task.comments.push({
      user: req.user.id,
      text,
      createdAt: new Date()
    });
    
    await task.save();
    
    await task.populate('comments.user', 'name avatar');
    
    res.status(200).json({
      success: true,
      message: 'Comment added successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Admin only)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Remove task from department
    await Department.findByIdAndUpdate(
      task.department,
      { $pull: { tasks: task._id } }
    );
    
    await task.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

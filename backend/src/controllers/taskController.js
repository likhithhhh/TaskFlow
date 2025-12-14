const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({
      title,
      description,
      status,
      userId: req.user.id // Associate task with logged-in user
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Tasks (RBAC Logic) [cite: 12]
exports.getTasks = async (req, res) => {
  try {
    let tasks;
    // If Admin, fetch ALL tasks. If User, fetch only THEIR tasks.
    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('userId', 'username email');
    } else {
      tasks = await Task.find({ userId: req.user.id });
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Ensure user owns the task or is admin
    if (task.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Ensure user owns the task or is admin
    if (task.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
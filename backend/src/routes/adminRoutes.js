const express = require('express');
const router = express.Router();
const { protect, adminGuard } = require('../middleware/authMiddleware');
const User = require('../models/User');

// GET /api/admin/users - Get all users (Admin only)
router.get('/users', protect, adminGuard, async (req, res) => {
  try {
    // Fetch all users excluding passwords
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


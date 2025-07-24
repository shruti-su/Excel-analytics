const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 📋 [GET] List all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('❌ Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 🗑️ [DELETE] Delete user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('❌ Error deleting user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✏️ [PUT] Update user by ID
router.put('/users/:id', async (req, res) => {
    const { name, email, role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error('❌ Error updating user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// [GET] Today's user logins per hour
router.get('/user-logins/today', async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const users = await User.aggregate([
      {
        $match: {
          lastLogin: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        }
      },
      {
        $group: {
          _id: { $hour: "$lastLogin" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formatted = Array.from({ length: 24 }, (_, hour) => {
      const match = users.find(u => u._id === hour);
      return match ? match.count : 0;
    });

    res.json({ logins: formatted });

  } catch (err) {
    console.error("❌ Error fetching today's logins:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

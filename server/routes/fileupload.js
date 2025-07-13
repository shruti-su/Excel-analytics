const express = require('express');
const router = express.Router();
const multer = require('multer');
const Upload = require('../models/upload');
const auth = require('../middleware/authMiddleware');

// Set up multer for file uploads
const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only Excel and CSV files are allowed.'));
//     }
//   },
//   limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
// });     




// // Create new user (POST)
// router.post('/users', async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         const user = new User({ name, email });
//         await user.save();
//         res.status(201).json(user);
//     } catch (err) {
//         console.error('❌ Error creating user:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Get a user by ID (GET)
// router.get('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) return res.status(404).json({ error: 'User not found' });
//         res.json(user);
//     } catch (err) {
//         console.error('❌ Error fetching user:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Delete user by ID
// router.delete('/users/:id', async (req, res) => {
//     try {
//         const result = await User.findByIdAndDelete(req.params.id);
//         if (!result) return res.status(404).json({ error: 'User not found' });
//         res.json({ message: 'User deleted' });
//     } catch (err) {
//         console.error('❌ Error deleting user:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


module.exports = router;
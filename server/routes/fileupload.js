const express = require('express');
const router = express.Router();
const multer = require('multer'); // <-- Add this import
const Upload = require('../models/upload');
const auth = require('../middleware/authMiddleware');
const XLSX = require('xlsx');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Parse file buffer to JSON
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Save to DB
        const uploadDoc = new Upload({
            user: req.user.id,
            fileName: req.file.originalname,
            fileType: req.file.originalname.split('.').pop().toLowerCase(),
            fileSize: req.file.size,
            data: jsonData
        });
        await uploadDoc.save();

        res.json({ message: 'File uploaded and data saved', data: jsonData });
    } catch (err) {
        console.error('❌ Error uploading file:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



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
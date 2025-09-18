const express = require('express');
const router = express.Router();
const multer = require('multer'); // <-- Add this import
const Upload = require('../models/upload');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const XLSX = require('xlsx');

// --- Multer Configuration ---

// 1. Storage for Excel files (in-memory)
const excelMemoryStorage = multer.memoryStorage();
const excelUpload = multer({ storage: excelMemoryStorage });

// 2. Storage for Profile Pictures (in-memory, for Base64 conversion)
const profilePictureMemoryStorage = multer.memoryStorage();
const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const profilePictureUpload = multer({ storage: profilePictureMemoryStorage, fileFilter: imageFileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

router.post('/upload', auth, excelUpload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Parse file buffer
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        if (!rawData || rawData.length === 0) {
            return res.status(400).json({ error: 'Uploaded file contains no data or headers.' });
        }
        const uploadDoc = new Upload({
            user: req.user.id,
            fileName: req.file.originalname,
            fileType: req.file.originalname.split('.').pop().toLowerCase(),
            fileSize: req.file.size,
            data: rawData // Store the array of arrays directly
        });
        await uploadDoc.save();

        res.json({ message: 'File uploaded and data saved', data: rawData }); // Return the rawData
    } catch (err) {
        console.error('❌ Error uploading file:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message }); // Added details
    }
});

// 🖼️ [POST] Upload a profile picture
router.post('/profile-picture', auth, profilePictureUpload.single('profilePicture'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Convert image buffer to a Base64 Data URL string
        const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        user.profilePicture = dataUrl;
        await user.save();

        // Return the Data URL to the client so the UI can update
        res.json({
            message: 'Profile picture uploaded successfully.',
            // We use 'filePath' as the key for consistency with the client's expectation
            filePath: dataUrl
        });

    } catch (err) {
        console.error('❌ Error uploading profile picture:', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
});
// // 📋 [GET] List all 
router.get('/getall', auth, async (req, res) => {
    try {
        const uploads = await Upload.find({ user: req.user.id });
        res.json(uploads);
    } catch (err) {
        console.error('❌ Error fetching uploads:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// count of records
router.get('/count', auth, async (req, res) => {
    try {
        const count = await Upload.countDocuments({ user: req.user.id });
        res.status(200).json({ count: count });
    } catch (err) {
        console.error('❌ Error counting uploads:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/lastupload', auth, async (req, res) => {
    try {
        const lastUpload = await Upload.findOne({ user: req.user.id }).sort({ createdAt: -1 });
        if (!lastUpload) {
            return res.status(404).json({ error: 'No uploads found' });
        }
        res.status(200).json({ lastUpload: lastUpload });
    } catch (err) {
        console.error('❌ Error fetching last upload:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// delete 
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const upload = await Upload.findById(req.params.id);
        if (!upload) {
            return res.status(404).json({ error: 'Upload not found' });
        }


        await Upload.findByIdAndDelete(req.params.id);
        res.json({ message: 'Upload deleted successfully' });
    } catch (err) {
        console.error('❌ Error deleting ');
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
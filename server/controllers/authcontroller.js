const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // For input validation
const User = require('../models/User');

// ...existing code...

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' }); // Use generic message for security
        }

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create and return JWT
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role, // Include role in the payload
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' }, // Token expires in 7 days (1 week)
            (err, token) => {
                if (err) throw err;
                res.json({ token, msg: 'Logged in successfully!' });
            }
        );
    }
    catch (err) {
        console.error('❌ Error during login:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;


    try {
        // Check if user already exists (by email or username)
        let user = await User.findOne({ $or: [{ email }, { name }] });
        if (user) {
            return res.status(400).json({ warning: 'User with that email or username already exists' });
        }


        // Create new user instance
        user = new User({
            name,
            email,
            password, // Password will be hashed below
        });

        // Hash password
        const salt = await bcrypt.genSalt(10); // Generate a salt
        user.password = await bcrypt.hash(password, salt); // Hash the password with the salt

        // Save user to the database
        await user.save();

        // Create and return JWT
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: "user", // Include role in the payload
            },
        };
        try {
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
            res.json({ token, msg: 'User registered successfully!' });
        } catch (err) {
            console.error('❌ Error during signup:', err);
            res.status(500).json({ error: 'JWT signing failed' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.googleLogin = async (req, res) => {
    const { email, name } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) { // If user exists, create JWT and return it
            const payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role, // Include role in the payload
                },
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
            return res.json({ token, msg: 'Logged in successfully!' });
        }
        // If user does not exist, create a new user
        user = new User({
            name,
            email,
            password: 'google-auth', // Placeholder password, not used for Google login
            role: 'user', // Default role for new users
        });
        await user.save();
        // Create JWT for the new user
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role, // Include role in the payload
            },
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ token, msg: 'User registered and logged in successfully!' });
    } catch (err) {
        console.error('❌ Error during Google login:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

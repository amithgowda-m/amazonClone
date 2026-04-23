const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token so user can stay logged in
        const payload = {
            user: {
                id: user.id
            }
        };

        // For beginner simplicity, we are using a simple string as the JWT secret here.
        // Usually, this should be an environment variable.
        jwt.sign(payload, process.env.JWT_SECRET || 'secretString123', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ 
                message: 'Logged in successfully',
                token,
                userId: user.id,
                name: user.name
            });
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
});

module.exports = router;

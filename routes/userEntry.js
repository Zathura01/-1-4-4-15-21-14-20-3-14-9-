const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'AliceHevinForever';

// ✅ Register Route
router.post('/register', async (req, res) => {
    const { Username, Useremail, Password } = req.body;

    try {
        const existing = await User.findOne({ Useremail });
        if (existing) return res.json({ mgs: 409, msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new User({
            Username,
            Useremail,
            Password: hashedPassword
        });

        await newUser.save();
        return res.json({ success: true, msg: "User registered" });
    } catch (error) {
        console.error("Error in /register:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ Useremail: Username }, { Username: Username }]
        });

        if (!user) return res.json({ mgs: 401, msg: "Username not found" });

        const passwordMatch = await bcrypt.compare(Password, user.Password);
        if (!passwordMatch) return res.json({ mgs: 401, msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ mgs: 200, msg: "Login successful", token });
    } catch (error) {
        console.error("Error in /login:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

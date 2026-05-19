const User = require('../models/User');
const generateToken = require('..utils/jwt');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters'
            });
        }

        const validRoles = ['business', 'creator', 'influencer'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase();

        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(403).json({ message: "User already exists" });
        }

        // Create user
        const user = await User.create({
            name,
            email: normalizedEmail,
            role,
            password
        });

        // Generate Token
        const token = generateToken(user._id);

        // Send cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            samesite: "lax"
        });

        // Response without password
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.name
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { registerUser };
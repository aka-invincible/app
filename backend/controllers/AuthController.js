const User = require('../models/User');
const generateToken = require('../utils/jwt');

const registerUser = async (req, res) => {
    try {
        console.log('1. Register endpoint called');
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

        console.log('2. Checking if user exists');
        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(403).json({ message: "User already exists" });
        }

        // Create user
        console.log('3. Creating user in database');
        const user = await User.create({
            name,
            email: normalizedEmail,
            role,
            password
        });

        console.log('4. User created, generating token');
        // Generate Token
        const token = generateToken(user._id);

        // Send cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "none",
            path: "/"
        });

        // Response without password
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        console.error('Registration error:', error.message, error.stack);
        res.status(500).json({ message: error.message || "Server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });

        // If the user is not found, return a 404 response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password against the stored hashed password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token for authenticated sessions
        const token = generateToken(user._id);

        // Store token in an HTTP-only cookie for client-side usage
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "none",
            path: "/"
        });

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        console.error('Login error:', err.message, err.stack);
        res.status(500).json({ message: err.message || 'Server error' });
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "none",
            path: "/"
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getMe = async (req, res) => {
    try {
        // user is already attached by auth middleware
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        res.status(200).json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        });

    } catch (err) {
        console.error('GetMe error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, logoutUser, getMe };
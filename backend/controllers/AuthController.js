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

const loginUser = async (req, res) => {
    try {
        // Extract the expected login fields from the request body
        const { name, email, password, role } = req.body;

        // Basic validation: ensure all required fields are present
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Normalize the email before searching to avoid case-sensitivity issues
        const normalizedEmail = email.lowerCase();
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
            secure: false,
            samesite: "lax"
        });

        // Return user information (excluding sensitive fields)
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        // Catch any unexpected server errors and return a generic message
        res.status(500).json({ message: 'Server error' });
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { registerUser, loginUser, logoutUser };
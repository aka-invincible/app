// Controller for handling user login requests
const User = require('../models/user');
const generateToken = require('../utils/jwt');

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
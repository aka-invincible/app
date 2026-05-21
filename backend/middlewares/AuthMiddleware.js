const User = require('../models/User');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
}

const authorizeRoles = (...roles) => {
    try {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        }
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}


module.exports = { protect, authorizeRoles };
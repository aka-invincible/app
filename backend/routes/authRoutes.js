const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getMe } = require("../controllers/authController");

const protect = require("../middlewares/authMiddleware");

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Current user
router.get("/me", protect, getMe);

module.exports = router;
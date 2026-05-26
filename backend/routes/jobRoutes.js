const express = require("express");
const router = express.Router();

const {
    createJob,
    getJobs,
    getJobById
} = require("../controllers/jobController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

// Create job (business only)
router.post("/", protect, authorizeRoles("business"), createJob);

// Browse jobs
router.get("/", protect, getJobs);

// Single job
router.get("/:id", protect, getJobById);

module.exports = router;
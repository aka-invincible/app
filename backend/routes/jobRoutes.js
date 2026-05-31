const express = require("express");
const router = express.Router();

const {
    createJob,
    getJobs,
    getJobById,
    getMyJobs
} = require("../controllers/jobController");

const { protect, authorizeRoles } = require("../middlewares/AuthMiddleware");

// Create job (business only)
router.post("/", protect, authorizeRoles("business"), createJob);

// Browse jobs
router.get("/", protect, getJobs);

// View my jobs (business only)
router.get("/my", protect, authorizeRoles("business"), getMyJobs);

// Single job
router.get("/:id", protect, getJobById);


module.exports = router;
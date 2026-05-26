const express = require("express");
const router = express.Router();

const {
    applyToJob,
    getApplicationsByJob
} = require("../controllers/applicationController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

// Apply to job
router.post("/", protect, applyToJob);

// View applicants (business only)
router.get(
    "/job/:jobId",
    protect,
    authorizeRoles("business"),
    getApplicationsByJob
);

module.exports = router;
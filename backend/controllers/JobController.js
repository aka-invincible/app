const Job = require('../models/Jobs.js');

/**
 * Create a new job posting.
 * Validates input, constructs a Job model instance, and saves it.
 * Expects `req.user._id` to be set by authentication middleware.
 * Request body fields:
 *  - title: string (required)
 *  - description: string (required)
 *  - requirements: array (optional)
 *  - budget: number (required, must be >= 0)
 *  - needCreator: boolean
 *  - needInfluencer: boolean
 */
const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements = [],
            budget,
            needCreator,
            needInfluencer
        } = req.body;

        // Basic required-field validation
        if (!title || !description || budget === undefined) {
            return res.status(400).json({ message: "Title, description and budget are required" });
        }

        // Budget must be non-negative
        if (typeof budget !== 'number' || budget < 0) {
            return res.status(400).json({ message: "Budget must be a positive number" });
        }

        // Ensure at least one role is required for the job
        if (!needCreator && !needInfluencer) {
            return res.status(400).json({ message: "At least one of creator or influencer must be required" });
        }

        const newJob = new Job({
            title,
            description,
            requirements,
            budget,
            needCreator,
            needInfluencer,
            createdBy: req.user._id
        });

        // Persist the new job to the database
        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        // Log the error server-side if needed, and return generic message
        res.status(500).json({ message: "Server error" });
    }
}

/**
 * Retrieve open jobs with optional filters and pagination.
 * Query params supported:
 *  - type: 'creator' | 'influencer' (filters jobs needing that role)
 *  - sort: 'budget_high' | 'budget_low' (defaults to newest first)
 *  - page: page number for pagination (defaults to 1)
 *  - limit: items per page (defaults to 10)
 */
const getJobs = async (req, res) => {
    try {
        const { type, sort, page = 1, limit = 10 } = req.query;
        let query = { status: "open" };

        // Apply role-based filtering when requested
        if (type === "creator") {
            query.needCreator = true;
        }
        if (type === "influencer") {
            query.needInfluencer = true;
        }

        // Determine sorting option
        let sortOption = { createdAt: -1 };
        if (sort === "budget_high") {
            sortOption = { budget: -1 };
        }
        if (sort === "budget_low") {
            sortOption = { budget: 1 };
        }

        // Fetch paginated results
        const jobs = await Job.find(query)
            .sort(sortOption)
            .skip((page - 1) * 10)
            .limit(Number(limit));
        res.status(200).json(jobs);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createJob
}
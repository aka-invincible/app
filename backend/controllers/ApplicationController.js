const Application = require('../models/Application.js');
const Job = require('../models/Jobs');

const applyToJob = async (req, res) => {
    try {
        const { jobId, type, proposal, portfolioLinks, socialStats } = req.body;

        //  Required fields
        if (!jobId || !type) {
            return res.status(400).json({ message: "Job ID and type are required" });
        }

        //  Type validation
        if (!["creator", "influencer"].includes(type)) {
            return res.status(400).json({ message: "Invalid application type" });
        }

        //  Role validation
        if (req.user.role === "business" || req.user.role !== type) {
            return res.status(403).json({ message: "You are not allowed to apply for this role" });
        }

        //  Job existence
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        //  Job requirement validation
        if (type === "creator" && !job.needCreator) {
            return res.status(400).json({ message: "This job does not require a creator" });
        }

        if (type === "influencer" && !job.needInfluencer) {
            return res.status(400).json({ message: "This job does not require an influencer" });
        }

        //  Create application
        const newApplication = new Application({
            jobId,
            userId: req.user._id,
            type,
            proposal,
            portfolioLinks,
            socialStats
        });

        await newApplication.save();

        res.status(201).json(newApplication);

    } catch (err) {
        //  Handle duplicate error
        if (err.code === 11000) {
            return res.status(400).json({ message: "You have already applied to this job" });
        }

        res.status(500).json({ message: "Server error" });
    }
};

const getApplicationByJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { type } = req.query;

        // Validate Job Id
        if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid Job ID" });
        }

        // match stage
        let matchStage = {
            jobId: mongoose.Types.ObjectId(jobId)
        }

        if (type && ['creator', 'influencer'].includes(type)) {
            matchStage.type = type;
        }

        const applications = await Application.aggregate([
            { $match: matchStage },

            // Lookup to get user details
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },

            // Convert array → object
            { $unwind: "$user" },

            // Project only necessary fields
            {
                $project: {
                    _id: 1,
                    type: 1,
                    status: 1,
                    proposal: 1,
                    portfolioLinks: 1,
                    socialStats: 1,
                    createdAt: 1,

                    "user._id": 1,
                    "user.name": 1,
                    "user.bio": 1,
                    "user.skills": 1,
                    "user.niche": 1,
                    "user.socialLinks": 1
                }
            },
            //Sort latest first
            { $sort: { createdAt: -1 } }


        ]);

        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    applyToJob,
    getApplicationsByJob
}
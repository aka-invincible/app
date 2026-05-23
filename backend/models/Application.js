const mongoose = require('mongoose');

// Define the Application schema that links a user to a job application.
const applicationSchema = new mongoose.Schema({
    // Reference to the Job being applied for.
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    // Reference to the User submitting the application.
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Identifies whether the applicant is applying as a creator or influencer.
    type: {
        type: String,
        enum: ['creator', 'influencer'],
        required: true
    },
    // Current application status with a default of pending.
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    // Optional proposal text submitted by the applicant.
    proposal: String,
    // Optional array of portfolio or profile links.
    portfolioLinks: [String],
    // Optional object storing social media metrics or related stats.
    socialStats: Object
}, { timestamps: true });

// Ensure a user cannot apply to the same job more than once.
applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
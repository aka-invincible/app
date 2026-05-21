const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [String],
    budget: {
        type: Number,
        required: true,
        min: 0
    },
    needCreator: {
        type: Boolean,
        default: false
    },
    needInfluencer: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
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

jobSchema.pre('save', function (next) {
    if (!this.needCreator && !this.needInfluencer) {
        return next(new Error('At least one of needCreator or needInfluencer must be true'));
    }
    next();
})

module.exports = mongoose.model("Job", jobSchema);
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    issueTitle: { type: String, required: true },
    priority: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["pending", "rejected", "completed"], 
        default: "pending" 
    }
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

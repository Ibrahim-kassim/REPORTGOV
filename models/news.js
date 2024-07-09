const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    tag: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true
});

const News = mongoose.model('News', newsSchema);

module.exports = News;

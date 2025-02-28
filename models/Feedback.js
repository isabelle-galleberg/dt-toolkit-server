const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	positive: { type: Array, required: true, default: [] },
	improvements: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model("Feedback", feedbackSchema);

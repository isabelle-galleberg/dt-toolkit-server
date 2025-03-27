const mongoose = require("mongoose");

const aiFeedbackSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	strengths: { type: String, default: "" },
	improvements: { type: String, default: "" },
});

aiFeedbackSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model("AiFeedback", aiFeedbackSchema);

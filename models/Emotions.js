const mongoose = require("mongoose");

const emotionsSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	personaId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PersonaCard",
		required: true,
	},
	emotions: {
		type: Map,
		of: String,
		required: true,
		default: {},
	},
});

module.exports = mongoose.model("Emotions", emotionsSchema);

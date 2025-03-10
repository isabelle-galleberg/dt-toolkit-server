const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
	personaId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PersonaCard",
		required: true,
	},
	storyline: { type: [[String]], required: true },
	imgHappy: { type: String, required: true },
	imgSad: { type: String, required: true },
	imgDisappointed: { type: String, required: true },
	imgSuprised: { type: String, required: true },
	imgAngry: { type: String, required: true },
	imgScared: { type: String, required: true },
});

module.exports = mongoose.model("Story", storySchema);

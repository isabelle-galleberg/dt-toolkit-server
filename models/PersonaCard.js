const mongoose = require("mongoose");

const personaCardSchema = new mongoose.Schema({
	alias: { type: String, required: true },
	cardImageUrl: { type: String, required: true },
	personaImageUrl: { type: String, required: true },
	traits: { type: Array, required: true },
	storyline: { type: [[String]], required: true },
});

module.exports = mongoose.model("PersonaCard", personaCardSchema);

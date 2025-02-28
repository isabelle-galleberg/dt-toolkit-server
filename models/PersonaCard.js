const mongoose = require("mongoose");

const personaCardSchema = new mongoose.Schema({
	type: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	quote: { type: String, required: true },
	characteristics: { type: Array, required: true },
});

module.exports = mongoose.model("PersonaCard", personaCardSchema);

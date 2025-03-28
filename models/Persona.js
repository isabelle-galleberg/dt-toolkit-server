const mongoose = require("mongoose");

const personaSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	cardId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PersonaCard",
		required: true,
	},
	traits: { type: Array, required: true },
	name: { type: String, default: "" },
	age: { type: Number },
	occupationAndHobbies: { type: String, default: "" },
	hopes: { type: String, default: "" },
	challenges: { type: String, default: "" },
	quote: { type: String, default: "" },
	sliders: {
		type: [Number],
		required: true,
		default: [50, 50, 50],
	},
});

personaSchema.index({ userId: 1, cardId: 1 }, { unique: true });

module.exports = mongoose.model("Persona", personaSchema);

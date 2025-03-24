const mongoose = require("mongoose");

const personaCardSchema = new mongoose.Schema({
  alias: { type: String, required: true },
  cardImageUrl: { type: String, required: true },
  personaImageUrl: { type: String, required: true },
  traits: { type: Array, required: true },
  sender: { type: String },
  subject: { type: String },
  text: { type: [String] },
  buttonText: { type: String },
  buttonLink: { type: String },
});

module.exports = mongoose.model("PersonaCard", personaCardSchema);

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
  characteristics: { type: Array, required: true },
  name: { type: String, default: "" },
  age: { type: Number },
  occupation: { type: String, default: "" },
  hobbies: { type: String, default: "" },
  goals: { type: String, default: "" },
  frustrations: { type: String, default: "" },
  slider1: { type: Number, required: true, default: 50 },
  slider2: { type: Number, required: true, default: 50 },
  slider3: { type: Number, required: true, default: 50 },
});

personaSchema.index({ userId: 1, cardId: 1 }, { unique: true });

module.exports = mongoose.model("Persona", personaSchema);

const mongoose = require("mongoose");

const problemExplorationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  text: { type: String, required: true },
  selected: { type: Boolean, default: false },
});

const defineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  personaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Persona",
    required: true,
  },
  problems: [problemExplorationSchema],
  causes: [problemExplorationSchema],
  consequences: [problemExplorationSchema],
  problemStatement: { type: String, default: "" },
});

defineSchema.index({ userId: 1, personaId: 1 }, { unique: true });

module.exports = mongoose.model("Define", defineSchema);

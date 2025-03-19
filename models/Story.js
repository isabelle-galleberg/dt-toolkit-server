const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  personaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonaCard",
    required: true,
  },
  introduction: { type: [String], required: true },
  storyline: { type: [[String]], required: true },
  happyImg: { type: String, required: true },
  sadImg: { type: String, required: true },
  disappointedImg: { type: String, required: true },
  surprisedImg: { type: String, required: true },
  angryImg: { type: String, required: true },
  scaredImg: { type: String, required: true },
});

module.exports = mongoose.model("Story", storySchema);

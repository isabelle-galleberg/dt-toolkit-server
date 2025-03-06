const mongoose = require("mongoose");

const spottedScamSchema = new mongoose.Schema({
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
  numeration: { type: Number },
  inputText: { type: String, default: "" },
  pin_x: { type: Number },
  pin_y: { type: Number },
});

module.exports = mongoose.model("SpottedScam", spottedScamSchema);

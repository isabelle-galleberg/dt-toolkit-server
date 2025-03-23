const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
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
  feedback: { type: [String], default: [] },
  score: { type: Number, default: 0 },
  testCompleted: { type: Boolean, default: false },
});

feedbackSchema.index({ userId: 1, cardId: 1 }, { unique: true });

module.exports = mongoose.model("Feedback", feedbackSchema);

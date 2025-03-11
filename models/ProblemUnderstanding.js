const mongoose = require("mongoose");

const problemUnderstandingSchema = new mongoose.Schema({
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
  whatHappened: { type: [String], default: [] },
  whyItHappened: { type: [String], default: [] },
  consequences: { type: [String], default: [] },
});

problemUnderstandingSchema.index({ userId: 1, cardId: 1 }, { unique: true });

module.exports = mongoose.model(
  "ProblemUnderstanding",
  problemUnderstandingSchema
);

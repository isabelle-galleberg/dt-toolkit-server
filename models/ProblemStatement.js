const mongoose = require("mongoose");

const problemStatementSchema = new mongoose.Schema({
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
  part1: { type: String, default: "" },
  part2: { type: String, default: "" },
  part3: { type: String, default: "" },
  part4: { type: String, default: "" },
  part5: { type: String, default: "" },
});

problemStatementSchema.index({ userId: 1, cardId: 1 }, { unique: true });

module.exports = mongoose.model("ProblemStatement", problemStatementSchema);

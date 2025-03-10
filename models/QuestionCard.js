const mongoose = require("mongoose");

const questionCardSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
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
  question: { type: String, default: "" },
  answer: { type: String, default: "" },
});

module.exports = mongoose.model("QuestionCard", questionCardSchema);

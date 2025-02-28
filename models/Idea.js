const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Idea", ideaSchema);

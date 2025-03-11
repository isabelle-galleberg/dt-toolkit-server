const QuestionCard = require("../models/QuestionCard");

exports.getQuestionCards = async (req, res) => {
  try {
    const { cardId } = req.query;
    if (!cardId) {
      return res.status(400).json({ message: "cardId is required" });
    }
    const userId = req.user.id;
    const questionCards = await QuestionCard.find({ userId, cardId });
    res.status(200).json(questionCards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addQuestionCard = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { cardId, question, answer } = req.body;
    const userId = req.user?.id;
    if (!userId || !cardId || !question || !answer) {
      console.error("Missing required fields:", {
        userId,
        cardId,
        question,
        answer,
      });
      return res.status(400).json({ message: "All fields are required" });
    }
    const newQuestionCard = new QuestionCard({
      userId,
      cardId,
      question,
      answer,
    });
    const savedQuestionCard = await newQuestionCard.save();
    res.status(201).json(savedQuestionCard);
  } catch (err) {
    console.error("Error saving question card:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteQuestionCard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedCard = await QuestionCard.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedCard) {
      return res.status(404).json({ message: "Question card not found" });
    }

    res.status(200).json({ message: "Question card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

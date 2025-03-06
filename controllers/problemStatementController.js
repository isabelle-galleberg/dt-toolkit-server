const ProblemStatement = require("../models/ProblemStatement");

exports.getProblemStatement = async (req, res) => {
  try {
    const problemStatement = await ProblemStatement.findOne({
      userId: req.user.id,
      cardId: req.params.cardId,
    });
    if (!problemStatement) {
      return res.status(200).json({
        userId: req.user.id,
        cardId: req.params.cardId,
        part1: "",
        part2: "",
        part3: "",
        part4: "",
        part5: "",
      });
    }
    res.status(200).json(problemStatement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upsertProblemStatement = async (req, res) => {
  try {
    const problemStatement = await ProblemStatement.findOneAndUpdate(
      { userId: req.user.id, cardId: req.body.cardId },
      { ...req.body, userId: req.user.id },
      { new: true, upsert: true }
    );
    res.status(200).json(problemStatement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

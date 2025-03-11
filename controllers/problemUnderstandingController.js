const ProblemUnderstanding = require("../models/ProblemUnderstanding");

exports.getProblemUnderstanding = async (req, res) => {
  try {
    const problemUnderstanding = await ProblemUnderstanding.findOne({
      userId: req.user.id,
      cardId: req.params.cardId,
    });
    if (!problemUnderstanding) {
      return res.status(200).json({
        userId: req.user.id,
        cardId: req.params.cardId,
        whatHappened: [],
        whyItHappened: [],
        consequences: [],
      });
    }
    res.status(200).json(problemUnderstanding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upsertProblemUnderstanding = async (req, res) => {
  try {
    const { cardId, whatHappened, whyItHappened, consequences } = req.body;
    const userId = req.user?.id;

    const savedProblemUnderstanding =
      await ProblemUnderstanding.findOneAndUpdate(
        { userId, cardId },
        { whatHappened, whyItHappened, consequences },
        { new: true, upsert: true }
      );

    res.status(200).json(savedProblemUnderstanding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

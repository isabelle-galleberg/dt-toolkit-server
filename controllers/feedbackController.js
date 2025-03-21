const Feedback = require("../models/Feedback");

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({
      userId: req.user.id,
      cardId: req.params.cardId,
    });
    if (!feedback) {
      return res.status(200).json({
        userId: req.user.id,
        cardId: req.params.cardId,
        feedback: [],
      });
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upsertFeedback = async (req, res) => {
  try {
    const { cardId, feedback } = req.body;
    const userId = req.user?.id;

    const savedFeedback = await Feedback.findOneAndUpdate(
      { userId, cardId },
      { feedback },
      { new: true, upsert: true }
    );

    res.status(200).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

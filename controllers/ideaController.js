const Idea = require("../models/Idea");

exports.getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.user.id });
    res.status(200).json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addIdea = async (req, res) => {
  try {
    const newIdea = new Idea({ ...req.body, userId: req.user.id });
    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    if (idea.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this idea" });
    }
    await idea.deleteOne();
    res.json({ message: "Idea deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Checklist = require("../models/Checklist");
const { getAIFeedback } = require("../services/feedbackService");

exports.getChecklist = async (req, res) => {
	try {
		const checklists = await Checklist.find({ userId: req.user.id });
		res.status(200).json(checklists);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addChecklistItem = async (req, res) => {
	try {
		const { text } = req.body;

		if (!text) {
			return res.status(400).json({ message: "Task description is required" });
		}

		const newChecklistItem = new Checklist({
			userId: req.user.id,
			text: text,
		});

		await newChecklistItem.save();

		res.status(201).json(newChecklistItem);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
};

exports.deleteChecklistItem = async (req, res) => {
	try {
		const { id } = req.params;

		const deletedChecklistItem = await Checklist.findOneAndDelete({
			_id: id,
			userId: req.user.id,
		});

		if (!deletedChecklistItem) {
			return res.status(404).json({ message: "Checklist item not found" });
		}

		res.status(200).json({ message: "Checklist item deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
};

exports.handleChecklistFeedback = async (req, res) => {
	const { checklist } = req.body;
	try {
		const { strengths, improvements } = await getAIFeedback(checklist);
		res.json({ strengths, improvements });
	} catch (error) {
		console.error("Error generating feedback:", error);
		res.status(500).send("Error generating feedback");
	}
};

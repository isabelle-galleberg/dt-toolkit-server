const Feedback = require("../models/Feedback");

exports.getFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.find({ userId: req.user.id });
		res.status(200).json(feedback);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addPositiveFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.findOneAndUpdate(
			{ userId: req.user.id },
			{ $push: { positive: { $each: req.body.positive } } },
			{ new: true, upsert: true }
		);
		res.status(200).json(feedback);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.addImprovementFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.findOneAndUpdate(
			{ userId: req.user.id },
			{ $push: { improvements: { $each: req.body.improvements } } },
			{ new: true, upsert: true }
		);
		res.status(200).json(feedback);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deletePositiveFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.findOneAndUpdate(
			{ userId: req.user.id },
			{ $pull: { positive: { $in: req.body.positive } } },
			{ new: true }
		);
		res.status(200).json(feedback);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deleteImprovementFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.findOneAndUpdate(
			{ userId: req.user.id },
			{ $pull: { improvements: { $in: req.body.improvements } } },
			{ new: true }
		);
		res.status(200).json(feedback);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const AiFeedback = require("../models/AiFeedback");

exports.getAiFeedback = async (req, res) => {
	try {
		const aiFeedback = await AiFeedback.findOne({
			userId: req.user.id,
		});
		if (!aiFeedback) {
			return res.status(200).json({
				userId: req.user.id,
			});
		}
		res.status(200).json(aiFeedback);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateAiFeedback = async (req, res) => {
	try {
		const { strengths, improvements } = req.body;
		const userId = req.user?.id;

		const savedAiFeedback = await AiFeedback.findOneAndUpdate(
			{ userId },
			{ strengths, improvements },
			{ new: true, upsert: true }
		);

		res.status(200).json(savedAiFeedback);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

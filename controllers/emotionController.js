const Emotions = require("../models/Emotions");

exports.getEmotions = async (req, res) => {
	try {
		const emotionsData = await Emotions.findOne({ userId: req.user.id });
		if (!emotionsData) {
			return res.status(404).json({ message: "Emotions not found" });
		}

		res.status(200).json(emotionsData.emotions);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.updateEmotions = async (req, res) => {
	try {
		const { index, emotion } = req.body;

		if (index === undefined || !emotion) {
			return res
				.status(400)
				.json({ message: "Index and emotion are required" });
		}

		let userEmotions = await Emotions.findOne({ userId: req.user.id });

		if (!userEmotions) {
			userEmotions = new Emotions({
				userId: req.user.id,
				emotions: new Map(),
			});
		}

		userEmotions.emotions.set(index, emotion);
		await userEmotions.save();

		res.status(200).json(userEmotions);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

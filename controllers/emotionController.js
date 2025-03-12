const Emotions = require("../models/Emotions");

exports.getEmotions = async (req, res) => {
	try {
		let emotionsData = await Emotions.findOne({
			userId: req.user.id,
			personaId: req.params.personaId,
		});
		if (!emotionsData) {
			emotionsData = new Emotions({
				userId: req.user.id,
				personaId: req.params.personaId,
				emotions: [],
			});
			await emotionsData.save();
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

		let userEmotions = await Emotions.findOne({
			userId: req.user.id,
			personaId: req.params.personaId,
		});

		if (!userEmotions) {
			userEmotions = new Emotions({
				userId: req.user.id,
				personaId: req.params.personaId,
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

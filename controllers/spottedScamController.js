const SpottedScam = require("../models/SpottedScam");
const { getAIHints } = require("../services/hintService");

exports.getSpottedScam = async (req, res) => {
	try {
		if (!req.user || !req.user.id) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		if (!req.params.cardId) {
			return res.status(400).json({ message: "cardId is required" });
		}
		const spottedScams = await SpottedScam.find({
			userId: req.user.id,
			cardId: req.params.cardId,
		});
		res.status(200).json(spottedScams);
	} catch (error) {
		console.error("Error fetching spotted scams:", error);
		res.status(500).json({ message: error.message });
	}
};

exports.addSpottedScam = async (req, res) => {
	try {
		const { cardId, numeration, inputText, pin_x, pin_y } = req.body;
		if (
			!cardId ||
			numeration === undefined ||
			!inputText ||
			pin_x === undefined ||
			pin_y === undefined
		) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const newSpottedScam = new SpottedScam({
			userId: req.user.id,
			cardId,
			numeration,
			inputText,
			pin_x,
			pin_y,
		});
		const savedSpottedScam = await newSpottedScam.save();
		res.status(201).json(savedSpottedScam);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deleteSpottedScam = async (req, res) => {
	try {
		const spottedScam = await SpottedScam.findById(req.params.id);
		if (!spottedScam) {
			return res.status(404).json({ message: "Spotted scam not found" });
		}

		if (spottedScam.userId.toString() !== req.user.id) {
			return res
				.status(403)
				.json({ message: "Not authorized to delete this scam" });
		}

		await spottedScam.deleteOne();
		res.json({ message: "Spotted scam deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getHint = async (req, res) => {
	const { scamsDetected } = req.body;
	try {
		const { hint } = await getAIHints(scamsDetected);
		res.json({ hint });
	} catch (error) {
		console.error("Error generating feedback:", error);
		res.status(500).send("Error generating feedback");
	}
};

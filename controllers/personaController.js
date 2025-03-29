const Persona = require("../models/Persona");

exports.getPersona = async (req, res) => {
	try {
		const persona = await Persona.findOne({
			userId: req.user.id,
			cardId: req.params.cardId,
		});
		if (!persona) {
			return res.status(200).json({
				userId: req.user.id,
				cardId: req.params.cardId,
				name: "",
				age: null,
				occupationAndHobbies: "",
				hopes: "",
				challenges: "",
				quote: "",
				sliders: [50, 50, 50, 50, 50, 50],
				traits: [],
			});
		}
		res.status(200).json(persona);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.upsertPersona = async (req, res) => {
	try {
		const persona = await Persona.findOneAndUpdate(
			{ userId: req.user.id, cardId: req.body.cardId },
			{ ...req.body, userId: req.user.id },
			{ new: true, upsert: true }
		);
		res.status(200).json(persona);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

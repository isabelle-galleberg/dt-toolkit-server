const PersonaCard = require("../models/PersonaCard");

exports.getCard = async (req, res) => {
	try {
		const personas = await PersonaCard.find();
		res.status(200).json(personas);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addCard = async (req, res) => {
	const persona = new PersonaCard({
		alias: req.body.alias,
		cardImageUrl: req.body.cardImageUrl,
		personaImageUrl: req.body.personaImageUrl,
		traits: req.body.traits,
	});

	console.log(persona);

	try {
		const newPersona = await persona.save();
		res.status(201).json(newPersona);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

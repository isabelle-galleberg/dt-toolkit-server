const Story = require("../models/Story");

exports.getStory = async (req, res) => {
	try {
		const { personaId } = req.params;
		const stories = await Story.findOne({ personaId });
		res.status(200).json(stories);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.createStory = async (req, res) => {
	try {
		const newStory = new Story(req.body);
		const savedStory = await newStory.save();
		res.status(201).json(savedStory);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

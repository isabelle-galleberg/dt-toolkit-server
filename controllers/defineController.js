const Define = require("../models/Define");

exports.getStatement = async (req, res) => {
  try {
    const define = await Define.findOne({
      userId: req.user.id,
      personaId: req.params.personaId,
    });

    if (!define) {
      return res.status(200).json({
        userId: req.user.id,
        personaId: req.params.personaId,
        problems: [],
        causes: [],
        consequences: [],
        problemStatement: "",
      });
    }

    res.status(200).json(define);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProblemExploration = async (req, res) => {
  try {
    const { text, listType } = req.body;
    const userId = req.user.id;
    const personaId = req.params.personaId;
    if (!["problems", "causes", "consequences"].includes(listType)) {
      return res.status(400).json({ message: "Invalid list type" });
    }

    let define = await Define.findOne({ userId, personaId });
    if (!define) {
      define = new Define({
        userId,
        personaId,
        problems: [],
        causes: [],
        consequences: [],
        problemStatement: "",
      });
    }

    const newProblem = {
      text,
    };

    // Add to the correct list based on listType
    define[listType].push(newProblem);
    await define.save();

    res.status(200).json(define);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProblems = async (req, res) => {
  try {
    const define = await Define.findOne({
      userId: req.user.id,
      personaId: req.params.personaId,
    });

    if (!define) {
      return res.status(200).json([]);
    }

    res.status(200).json(define.problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCauses = async (req, res) => {
  try {
    const define = await Define.findOne({
      userId: req.user.id,
      personaId: req.params.personaId,
    });

    if (!define) {
      return res.status(200).json([]);
    }

    res.status(200).json(define.causes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConsequences = async (req, res) => {
  try {
    const define = await Define.findOne({
      userId: req.user.id,
      personaId: req.params.personaId,
    });

    if (!define) {
      return res.status(200).json([]);
    }

    res.status(200).json(define.consequences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProblemExploration = async (req, res) => {
  try {
    const { personaId, listType, itemId } = req.params;
    if (!["problems", "causes", "consequences"].includes(listType)) {
      return res.status(400).json({ message: "Invalid list type" });
    }

    const define = await Define.findOne({ userId: req.user.id, personaId });
    if (!define) {
      return res.status(404).json({ message: "Define document not found" });
    }

    define[listType] = define[listType].filter(
      (item) => item._id.toString() !== itemId
    );
    await define.save();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleSelected = async (req, res) => {
  try {
    const { personaId, listType, itemId } = req.params;
    if (!["problems", "causes", "consequences"].includes(listType)) {
      return res.status(400).json({ message: "Invalid list type" });
    }

    const define = await Define.findOne({ userId: req.user.id, personaId });
    if (!define) {
      return res.status(404).json({ message: "Define document not found" });
    }

    const itemIndex = define[listType].findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    define[listType][itemIndex].selected =
      !define[listType][itemIndex].selected;
    await define.save();

    res.status(200).json(define[listType][itemIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

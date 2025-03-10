const express = require("express");
const { getStory, createStory } = require("../controllers/storyController");
const router = express.Router();

router.get("/:personaId", getStory);
router.post("/", createStory);

module.exports = router;

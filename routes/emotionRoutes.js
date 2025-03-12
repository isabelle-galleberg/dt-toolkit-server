const express = require("express");
const {
	getEmotions,
	updateEmotions,
} = require("../controllers/emotionController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/:personaId", protect, getEmotions);
router.post("/:personaId", protect, updateEmotions);

module.exports = router;

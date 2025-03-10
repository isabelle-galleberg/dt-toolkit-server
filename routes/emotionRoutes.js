const express = require("express");
const {
	getEmotions,
	updateEmotions,
} = require("../controllers/emotionController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getEmotions);
router.post("/", protect, updateEmotions);

module.exports = router;

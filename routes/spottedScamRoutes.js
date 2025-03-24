const express = require("express");
const {
	getSpottedScam,
	addSpottedScam,
	deleteSpottedScam,
	getHint,
} = require("../controllers/spottedScamController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/:cardId", protect, getSpottedScam);
router.post("/", protect, addSpottedScam);
router.delete("/:id", protect, deleteSpottedScam);
router.post("/hint", protect, getHint);

module.exports = router;

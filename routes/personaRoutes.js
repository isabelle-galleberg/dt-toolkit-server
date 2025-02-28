const express = require("express");
const {
	getPersona,
	upsertPersona,
} = require("../controllers/personaController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, upsertPersona);
router.get("/:cardId", protect, getPersona);

module.exports = router;

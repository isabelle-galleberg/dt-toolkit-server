const express = require("express");
const {
	getIdeas,
	addIdea,
	deleteIdea,
} = require("../controllers/ideaController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getIdeas);
router.post("/", protect, addIdea);
router.delete("/:id", protect, deleteIdea);

module.exports = router;

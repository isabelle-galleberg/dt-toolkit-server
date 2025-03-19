const express = require("express");
const {
	getChecklist,
	addChecklistItem,
	deleteChecklistItem,
	handleChecklistFeedback,
} = require("../controllers/checklistController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getChecklist);
router.post("/", protect, addChecklistItem);
router.delete("/:id", protect, deleteChecklistItem);
router.post("/feedback", handleChecklistFeedback);

module.exports = router;

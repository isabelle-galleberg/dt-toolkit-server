const express = require("express");
const {
	getFeedback,
	addPositiveFeedback,
	addImprovementFeedback,
	deletePositiveFeedback,
	deleteImprovementFeedback,
} = require("../controllers/feedbackController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getFeedback);
router.post("/positive", protect, addPositiveFeedback);
router.post("/improvement", protect, addImprovementFeedback);
router.delete("/positive", protect, deletePositiveFeedback);
router.delete("/improvement", protect, deleteImprovementFeedback);

module.exports = router;

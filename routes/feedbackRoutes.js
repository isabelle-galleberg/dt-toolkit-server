const express = require("express");
const {
  getFeedback,
  upsertFeedback,
  updateTestResults,
  resetTest,
} = require("../controllers/feedbackController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/:cardId", protect, getFeedback);
router.put("/", protect, upsertFeedback);
router.put("/test-results", protect, updateTestResults);
router.post("/reset", protect, resetTest);

module.exports = router;

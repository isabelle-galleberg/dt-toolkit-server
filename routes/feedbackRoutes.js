const express = require("express");
const {
  getFeedback,
  upsertFeedback,
} = require("../controllers/feedbackController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.put("/", protect, upsertFeedback);
router.get("/:cardId", protect, getFeedback);

module.exports = router;

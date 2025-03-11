const express = require("express");
const {
  getProblemUnderstanding,
  upsertProblemUnderstanding,
} = require("../controllers/problemUnderstandingController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.put("/", protect, upsertProblemUnderstanding);
router.get("/:cardId", protect, getProblemUnderstanding);

module.exports = router;

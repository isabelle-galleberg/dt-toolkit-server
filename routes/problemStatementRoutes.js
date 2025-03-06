const express = require("express");
const {
  getProblemStatement,
  upsertProblemStatement,
} = require("../controllers/problemStatementController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, upsertProblemStatement);
router.get("/:cardId", protect, getProblemStatement);

module.exports = router;

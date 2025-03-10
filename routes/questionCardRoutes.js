const express = require("express");
const {
  getQuestionCards,
  addQuestionCard,
  deleteQuestionCard,
} = require("../controllers/questionCardController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getQuestionCards);
router.post("/", protect, addQuestionCard);
router.delete("/:id", protect, deleteQuestionCard);

module.exports = router;

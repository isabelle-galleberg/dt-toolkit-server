const express = require("express");
const {
  getSpottedScam,
  addSpottedScam,
  deleteSpottedScam,
} = require("../controllers/spottedScamController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/:cardId", protect, getSpottedScam);
router.post("/", protect, addSpottedScam);
router.delete("/:id", protect, deleteSpottedScam);

module.exports = router;

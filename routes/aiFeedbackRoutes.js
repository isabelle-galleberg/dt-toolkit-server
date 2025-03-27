const express = require("express");
const {
	getAiFeedback,
	updateAiFeedback,
} = require("../controllers/aiFeedbackController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAiFeedback);
router.put("/", protect, updateAiFeedback);

module.exports = router;

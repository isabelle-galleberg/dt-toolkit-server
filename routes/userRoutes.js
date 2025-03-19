const express = require("express");
const {
	registerUser,
	loginUser,
	getMe,
	updatePage,
} = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/page", protect, updatePage);

module.exports = router;

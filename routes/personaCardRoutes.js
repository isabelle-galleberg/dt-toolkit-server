const express = require("express");
const { getCard, addCard } = require("../controllers/personaCardController");
const router = express.Router();

router.get("/", getCard);
router.post("/", addCard);

module.exports = router;

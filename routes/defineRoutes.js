const express = require("express");
const {
  getStatement,
  addProblemExploration,
  getProblems,
  getCauses,
  getConsequences,
  deleteProblemExploration,
  toggleSelected,
} = require("../controllers/defineController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getStatement); // Update this with personaID
router.post("/:personaId/", protect, addProblemExploration);
router.get("/:personaId/problems", protect, getProblems);
router.get("/:personaId/causes", protect, getCauses);
router.get("/:personaId/consequences", protect, getConsequences);
router.delete(
  "/:personaId/:listType/:itemId",
  protect,
  deleteProblemExploration
);
router.patch("/:personaId/:listType/:itemId/toggle", protect, toggleSelected);

module.exports = router;

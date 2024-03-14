const {
  getNotes,
  addNote,
  editNote,
  deleteNote,
} = require("../controllers/noteController");

const router = require("express").Router();

router.get("/", getNotes);
router.put("/", addNote);
router.post("/", editNote);
router.delete("/", deleteNote);

module.exports = router;

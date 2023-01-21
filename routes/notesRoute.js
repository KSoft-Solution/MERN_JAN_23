const router = require("express").Router();
const notesController = require("../controllers/notesControllers");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

module.exports = router;

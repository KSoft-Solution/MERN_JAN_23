const router = require("express").Router();
const usersController = require("../controllers/userControllers");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;

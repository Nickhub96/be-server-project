const usersRouter = require("express").Router();
const { getUsersById } = require("../controllers/users-controller");
const { send405Error } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(getUsersById)
  .all(send405Error);

module.exports = usersRouter;

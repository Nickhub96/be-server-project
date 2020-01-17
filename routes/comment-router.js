const commentsRouter = require("express").Router();
const { patchCommentsById } = require("../controllers/comments-controller");

commentsRouter.use("/:comments_id").patch(patchCommentsById);

module.exports = commentsRouter;

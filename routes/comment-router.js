const commentsRouter = require("express").Router();
const {
  patchCommentsById,
  delCommentById
} = require("../controllers/comments-controller");
const { send405Error } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentsById)
  .delete(delCommentById)
  .all(send405Error);

module.exports = commentsRouter;

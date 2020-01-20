const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  patchArticlesById,
  postCommentsByArtId,
  getCommentsByArtId
} = require("../controllers/articles-controller");
const { send405Error } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(send405Error);

articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticlesById)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArtId)
  .post(postCommentsByArtId)
  .all(send405Error);

module.exports = articlesRouter;

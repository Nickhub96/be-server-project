const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  patchArticlesById,
  postCommentsByArtId,
  getCommentsByArtId
} = require("../controllers/articles-controller");

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticlesById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArtId)
  .post(postCommentsByArtId);

module.exports = articlesRouter;

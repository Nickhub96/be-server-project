const articlesRouter = require("express").Router();
const {
  getArticlesById,
  patchArticlesById,
  postCommentsByArtId
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticlesById);

articlesRouter.route("/:article_id/comments").post(postCommentsByArtId);

module.exports = articlesRouter;

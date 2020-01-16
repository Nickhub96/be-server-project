const {
  selectArticlesById,
  updateArticlesById,
  insertCommentsByArtId
} = require("../models/articles-model");

const getArticlesById = (req, res, next) => {
  //{articles.article_id: 1}

  selectArticlesById(req.params)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      console.log(err, "error in getArticleById");
      next(err);
    });
};

const patchArticlesById = (req, res, next) => {
  updateArticlesById(req.body, req.params)
    .then(articles => {
      console.log(articles);
      res.status(200).send({ articles });
    })
    .catch(err => {
      console.log(err, "error in patchArticlesById");
      next(err);
    });
};

const postCommentsByArtId = (req, res, next) => {
  // console.log(req.body, "Hello controller");
  insertCommentsByArtId(req.body, req.params)
    .then(comments => {
      res.status(201).send({ comments });
    })
    .catch(err => {
      console.log(err, "error in postComments");
      next(err);
    });
};
module.exports = { getArticlesById, patchArticlesById, postCommentsByArtId };

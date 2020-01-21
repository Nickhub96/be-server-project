const {
  selectArticles,
  selectArticlesById,
  updateArticlesById,
  insertCommentsByArtId,
  SelectCommentsByArtId
} = require("../models/articles-model");

const getArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      //   console.log(err, "error in getArticles");
      next(err);
    });
};

const getArticlesById = (req, res, next) => {
  selectArticlesById(req.params)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(err => {
      // console.log(err, "error in getArticleById");
      next(err);
    });
};

const patchArticlesById = (req, res, next) => {
  updateArticlesById(req.body, req.params)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(err => {
      // console.log(err, "error in patchArticlesById");
      next(err);
    });
};

const postCommentsByArtId = (req, res, next) => {
  // console.log(req.body, "Hello controller");
  insertCommentsByArtId(req.body, req.params)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => {
      // console.log(err, "error in postComments");
      next(err);
    });
};

const getCommentsByArtId = (req, res, next) => {
  SelectCommentsByArtId(req.params, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      // console.log(err, "error in getCommentsByArtId");
      next(err);
    });
};

module.exports = {
  getArticles,
  getArticlesById,
  patchArticlesById,
  postCommentsByArtId,
  getCommentsByArtId
};

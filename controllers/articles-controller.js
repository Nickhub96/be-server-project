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
      console.log(err, "error in getArticles");
      next(err);
    });
};

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
      // console.log(err, "error in postComments");
      next(err);
    });
};

const getCommentsByArtId = (req, res, next) => {
  console.log(req.query);
  SelectCommentsByArtId(req.params, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      console.log(err, "error in getCommentsByArtId");
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

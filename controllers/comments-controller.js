const {
  updateCommentsById,
  removeCommentById
} = require("../models/comments-model");

const patchCommentsById = (req, res, next) => {
  updateCommentsById(req.body, req.params)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(err => {
      // console.log(err, "error in patchCommentsById");
      next(err);
    });
};

const delCommentById = (req, res, next) => {
  // console.log(req.params);
  removeCommentById(req.params)
    .then(() => {
      res.status(204).send({});
    })
    .catch(err => {
      // console.log(err, "error in deleteCommentsById");
      next(err);
    });
};

module.exports = { patchCommentsById, delCommentById };

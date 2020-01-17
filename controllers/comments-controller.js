const { updateCommentsById } = require("../models/comments-model");

const patchCommentsById = (req, res, next) => {
  updateCommentsById(req.body, req.params)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      console.log(err, "error in patchCommentsById");
      next(err);
    });
};

module.exports = { patchCommentsById };

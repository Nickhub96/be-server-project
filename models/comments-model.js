const connection = require("../db/connection");

const updateCommentsById = (body, params) => {
  const { comment_id } = params;
  const { inc_votes } = body;
  // console.log(comment_id, inc_votes);
  return connection("comments")
    .where("comments.comment_id", comment_id)
    .increment("votes", inc_votes || 0)
    .returning("*")
    .then(res => {
      // console.log(res);
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

const removeCommentById = params => {
  const { comment_id } = params;
  return connection("comments")
    .where("comments.comment_id", comment_id)
    .del()
    .then(res => {
      if (res === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return true;
      }
    });
};

module.exports = { updateCommentsById, removeCommentById };

const connection = require("../db/connection");

const updateCommentsById = (body, params) => {
  const { comment_id } = params;
  const { inc_votes } = body;
  console.log(comment_id, inc_votes);
  return connection("comments")
    .where("comments.comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(res => {
      console.log(res);
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

module.exports = { updateCommentsById };

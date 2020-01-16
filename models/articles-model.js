const connection = require("../db/connection");

const selectArticlesById = params => {
  const { article_id } = params;
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", article_id)
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

const updateArticlesById = (body, params) => {
  const { article_id } = params;
  const { inc_votes } = body;
  return connection("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

const insertCommentsByArtId = (body, params) => {
  const time = Date.now();
  const { article_id } = params;
  const { author, comment } = body;
  return connection("comments")
    .where("comments.article_id", article_id)
    .insert({
      article_id,
      author,
      body: comment,
      created_at: new Date(time)
    })
    .returning("*")
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

module.exports = {
  selectArticlesById,
  updateArticlesById,
  insertCommentsByArtId
};

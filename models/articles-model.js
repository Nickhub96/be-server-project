const connection = require("../db/connection");

const selectArticles = ({ sort_by, order_by, author, topic }) => {
  return connection("articles")
    .select("articles.*")
    .orderBy(sort_by || "created_at", order_by || "desc")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ topic });
    })
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

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
      console.log(res);
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

const SelectCommentsByArtId = (params, query) => {
  const { article_id } = params;
  const { sort_by, order_by } = query;
  return connection("comments")
    .select("*")
    .where("comments.article_id", article_id)
    .orderBy(sort_by || "created_at", order_by || "desc")
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

module.exports = {
  selectArticles,
  selectArticlesById,
  updateArticlesById,
  insertCommentsByArtId,
  SelectCommentsByArtId
};

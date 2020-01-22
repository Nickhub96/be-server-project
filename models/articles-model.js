const connection = require("../db/connection");
const { emptyArrayIfAuthorExists } = require("../models/users-model");
const { emptyArrayIfTopicExists } = require("../models/topics-model");

const selectArticles = ({ sort_by, order, author, topic }) => {
  return connection("articles")
    .select("articles.*")
    .orderBy(sort_by || "created_at", order || "desc")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ topic });
    })
    .then(res => {
      if (res.length === 0 && author) {
        return emptyArrayIfAuthorExists(author);
      }
      if (res.length === 0 && !topic) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    })
    .then(res => {
      if (res.length === 0 && topic) {
        // console.log(topic);
        return emptyArrayIfTopicExists(topic);
      }
      if (res.length === 0 && !author) {
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

// const incVotesZero = object => {
//   return (object = { inc_votes: 0 });
// };

const updateArticlesById = (body, params) => {
  const { article_id } = params;
  const { inc_votes } = body;
  // if (articled_id.hasOwnProperty() === false) {
  //   console.log(article_id);
  //   return article_id;
  // }
  return connection("articles")
    .where("articles.article_id", article_id)
    .increment("votes", inc_votes || 0)
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
  const { article_id } = params;
  const { username, comment } = body;
  return connection("comments")
    .where("comments.article_id", article_id)
    .insert({
      article_id,
      author: username,
      body: comment
    })
    .returning("*")
    .then(res => {
      // console.log(res, "res response");
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res[0];
      }
      return res[0];
    });
};

const emptyArrayIfArticleExists = article_id => {
  return connection("articles")
    .select("*")
    .where("article_id", article_id)
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return [];
      }
    });
};

const SelectCommentsByArtId = (params, query) => {
  const { article_id } = params;
  const { sort_by, order } = query;
  return connection("comments")
    .select("*")
    .where("comments.article_id", article_id)
    .orderBy(sort_by || "created_at", order || "desc")
    .then(res => {
      if (res.length === 0 && article_id) {
        return emptyArrayIfArticleExists(article_id);
      }
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

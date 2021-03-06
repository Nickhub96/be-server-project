const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

console.log(process.env.NODE_ENV);

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);
      const usersInsertions = knex("users").insert(userData);
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const formattedArticles = formatDates(articleData);
      return knex("articles")
        .insert(formattedArticles)
        .returning("*");
    })
    .then(articleRows => {
      // console.log(articleRows);
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      // console.log(formattedComments);
      return knex("comments").insert(formattedComments);
    });
};

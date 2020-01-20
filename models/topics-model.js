const connection = require("../db/connection");

const selectTopics = () => {
  return connection("topics")
    .select("*")
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

const emptyArrayIfTopicExists = topic => {
  return connection("topics")
    .select("*")
    .where("slug", topic)
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return [];
      }
    });
};

module.exports = { selectTopics, emptyArrayIfTopicExists };

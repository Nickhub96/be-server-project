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

module.exports = { selectTopics };

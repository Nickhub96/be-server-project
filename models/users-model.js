const connection = require("../db/connection");

const selectUsersById = id => {
  return connection("users")
    .select("*")
    .where(id)
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return res;
      }
    });
};

module.exports = { selectUsersById };

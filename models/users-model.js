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

const emptyArrayIfAuthorExists = id => {
  return connection("users")
    .select("*")
    .where("username", id)
    .then(res => {
      if (res.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        return [];
      }
    });
};

module.exports = { selectUsersById, emptyArrayIfAuthorExists };

const { selectUsersById } = require("../models/users-model");

const getUsersById = (req, res, next) => {
  selectUsersById(req.params)
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(err => {
      // console.log(err, "error in getUsersById");
      next(err);
    });
};

module.exports = { getUsersById };

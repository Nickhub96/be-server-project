const { selectTopics } = require("../models/topics-model");

const getTopics = (req, res, next) => {
  selectTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(function(err) {
      // console.log(err, "error in getTopics");
      next(err);
    });
};

module.exports = { getTopics };

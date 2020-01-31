const getApi = (req, res, next) => {
  const options = {
    root: "./"
  };

  res.sendFile("endpoints.json", options, err => {
    next(err);
  });
};

module.exports = getApi;

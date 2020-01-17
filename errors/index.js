const routeErrors = (req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
};

const customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const psqlErrorHandler = (err, req, res, next) => {
  if (err.code) {
    const psqlCode = {
      "22P02": "Bad Request",
      "42703": "Undefined Column",
      "23503": "Bad Request"
    };
    res.status(400).send({
      msg: psqlCode[err.code]
    });
  } else {
    next(err);
  }
};

const fiveHundredErrorHandler = (err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
};

module.exports = {
  routeErrors,
  customErrorHandler,
  psqlErrorHandler,
  fiveHundredErrorHandler
};

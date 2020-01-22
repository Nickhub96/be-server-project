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
      "22P02": 400,
      "42703": 400,
      "23502": 400,
      "23503": 404
    };
    // console.log(err.message, "error here");
    res.status(psqlCode[err.code]).send({
      msg: err.message.split(" - ")[1] || "Bad Request"
    });
  } else {
    next(err);
  }
};

const fiveHundredErrorHandler = (err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
};

const send405Error = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Found" });
};

module.exports = {
  routeErrors,
  customErrorHandler,
  psqlErrorHandler,
  fiveHundredErrorHandler,
  send405Error
};

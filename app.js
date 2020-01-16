const express = require("express");
const apiRouter = require("./routes/api-router");
const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
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
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
});

module.exports = app;

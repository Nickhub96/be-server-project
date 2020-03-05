const express = require("express");
const apiRouter = require("./routes/api-router");
const cors = require("cors");
const app = express();
const {
  routeErrors,
  customErrorHandler,
  psqlErrorHandler,
  fiveHundredErrorHandler
} = require("./errors/index");

app.use(cors());

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", apiRouter);
app.use("/*", routeErrors);
app.use(customErrorHandler);
app.use(psqlErrorHandler);

app.use(fiveHundredErrorHandler);

module.exports = app;

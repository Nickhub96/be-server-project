const express = require("express");
const apiRouter = require("./routes/api-router");
const app = express();
const {
  routeErrors,
  customErrorHandler,
  psqlErrorHandler,
  fiveHundredErrorHandler
} = require("./errors/index");

app.use(express.json());

app.use("/api", apiRouter);
app.use("/*", routeErrors);
app.use(customErrorHandler);
app.use(psqlErrorHandler);

app.use(fiveHundredErrorHandler);

module.exports = app;

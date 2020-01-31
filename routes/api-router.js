const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topic-router");
const usersRouter = require("../routes/user-router");
const articlesRouter = require("../routes/article-router");
const commentsRouter = require("../routes/comment-router");
const { send405Error } = require("../errors/index");
const getApi = require("../controllers/api-controller");

apiRouter
  .route("/")
  .get(getApi)
  .all(send405Error);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;

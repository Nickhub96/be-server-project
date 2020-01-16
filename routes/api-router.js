const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topic-router");
const usersRouter = require("../routes/user-router");
const articlesRouter = require("../routes/article-router");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
// apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;

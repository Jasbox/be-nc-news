const express = require("express");
const cors = require('cors');
const { getTopics } = require("./controller/topic-controller");
const { getUsers } = require("./controller/users-controller");
const {
  getArticleByArticleId,
  patchArticle,
  getArticlesByDate,
  getArticleComments,
  postComment,
  deleteComment
} = require("./controller/articles-controller");
const {
  handle500s,
  handlePsqlErrors,
  handle404,
} = require("./controller/error-controller");
const { getEndPoint} = require ('./controller/api-controller')

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", getEndPoint)
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticlesByDate);
app.get("/api/articles/:article_id", getArticleByArticleId);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.get("/api/users", getUsers);

app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", patchArticle);
app.delete("/api/comments/:comment_id", deleteComment);

// 404
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use(handlePsqlErrors); //400
app.use(handle404); //404
app.use(handle500s); //500

module.exports = app;

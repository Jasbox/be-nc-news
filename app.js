const express = require("express");
const { getTopics } = require("./controller/topic-controller");
const{getArticleByArticleId, patchArticle, getArticlesByDate, getArticleComments, postComment} = require("./controller/articles-controller")
const{handle500s, handlePsqlErrors, handle404} = require("./controller/error-controller")
const {getUsers} = require("./controller/users-controller")

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleByArticleId);
app.get("/api/articles/:article_id/comments", getArticleComments);
app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchArticle)

app.get("/api/users", getUsers)
app.get("/api/articles", getArticlesByDate)

// 404
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use(handlePsqlErrors); //400
app.use(handle404);        //404
app.use(handle500s);       //500

module.exports = app;
        
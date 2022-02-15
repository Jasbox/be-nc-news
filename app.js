const express = require("express");
const { getTopics } = require("./controller/topic-controller");
const{getArticleByArticleId} = require("./controller/articles-controller")
const{handle500s, handlePsqlErrors, handle404} = require("./controller/error-controller")

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleByArticleId)

// 404
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use(handlePsqlErrors); //404
app.use(handle404);        //400
app.use(handle500s);       //500

module.exports = app;

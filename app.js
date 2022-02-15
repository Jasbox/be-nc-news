const express = require("express");
const { getTopics } = require("./controller/controller");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

// 404
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;

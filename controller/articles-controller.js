const { fetchArticles, updateArticle } = require("../model/articles-model");

exports.getArticleByArticleId = (request, response, next) => {
  const { article_id: articleId } = request.params;
  fetchArticles(articleId)
    .then((article) => response.status(200).send({ article }))
    .catch(next);
};

exports.patchArticle = (request, response, next) => {
  const articleId = request.params.article_id;
  
  if (typeof request.body.votes === "undefined") {
    response.status(400).send();
  } else if (typeof request.body.votes === "number") {
    updateArticle(articleId, request.body.votes).then((article) =>
      response.status(200).send({ article })
    );
  } else {
    response.status(400).send({ msg: "bad request" });
  }
};

// console.log("From articles-controller");

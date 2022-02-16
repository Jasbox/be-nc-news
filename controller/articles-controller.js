const { fetchArticles } = require("../model/articles-model");

exports.getArticleByArticleId = (request, response, next) => {
  const { article_id: articleId } = request.params;
  fetchArticles(articleId)
    .then((article) => response.status(200).send({ article }))
    .catch(next);
};

//console.log("From articles-controller");

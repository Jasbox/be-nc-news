// const articles = require("../db/data/test-data/articles");
// const comments = require("../db/data/test-data/comments");
const { fetchArticleById, updateArticle, fetchArticlesByDate, fetchArticles, fetchArticleComments, checkArticleExists, insertComment} = require("../model/articles-model");

exports.getArticleByArticleId = (request, response, next) => {
 
  const { article_id: articleId } = request.params;
  fetchArticleById(articleId)
    .then((article) => response.status(200).send({ article }))
    .catch(next);
};

exports.patchArticle = (request, response, next) => {
  const articleId = request.params.article_id;
  //console.log(typeof request.body.votes)
  if (typeof request.body.votes === "undefined") {
    response.status(400).send({ msg : "content missing"});
  } 
  else if (typeof request.body.votes === "number") {
    updateArticle(articleId, request.body.votes).then((article) =>
      response.status(200).send({ article })
    );
  } 
  else {
    response.status(400).send({ msg: "bad request" });
  }
};

exports.getArticlesByDate = (request, response, next) => {
   return fetchArticles()
   .then((articles) => {
     response.status(200).send({articles})
   })
   .then(next)
  }

exports.getArticleComments = (request,response, next) => {
  const {article_id} = request.params
  Promise.all([
    fetchArticleComments(article_id),
    checkArticleExists(article_id)
  ])
  .then((comments) => {
    response.status(200).send({comments: comments[0]})
  })
  .catch(next)
}

exports.postComment = (request,response, next) => {
  const { article_id } = request.params
  Promise.all([
    insertComment(article_id, request.body),
    checkArticleExists(article_id)
  ])
  .then((newComment)=> {
    response.status(201).send({comment: newComment[0]})
  })
  .catch(next)
}



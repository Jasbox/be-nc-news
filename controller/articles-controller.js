// const articles = require("../db/data/test-data/articles");
// const comments = require("../db/data/test-data/comments");
const { response } = require("express");
const { request } = require("express");
const {
  fetchArticleById,
  updateArticle,
  fetchArticles,
  fetchArticleComments,
  checkArticleExists,
  insertComment,
  removeComment
  
} = require("../model/articles-model");

const { checkTopicExists} = require("../model/topic-model")

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
    response.status(400).send({ msg: "content missing" });
  } else if (typeof request.body.votes === "number") {
    updateArticle(articleId, request.body.votes).then((article) =>
      response.status(200).send({ article })
    );
  } else {
    response.status(400).send({ msg: "bad request" });
  }
};

exports.getArticlesByDate = (request, response, next) => {
  
  const { sort_by, order_by, topic } = request.query;
  
  Promise.all([
    fetchArticles(sort_by, order_by, topic),
    checkTopicExists(topic),

  ])
    .then((articles) => {
      
      response.status(200).send({ articles: articles[0] });
    })
    .catch(next);
};

exports.getArticleComments = (request, response, next) => {
  const { article_id } = request.params;
  Promise.all([
    fetchArticleComments(article_id),
    checkArticleExists(article_id),
  ])
    .then((comments) => {
      response.status(200).send({ comments: comments[0] });
    })
    .catch(next);
};

exports.postComment = (request, response, next) => {
  const { article_id } = request.params;
  Promise.all([
    insertComment(article_id, request.body),
    checkArticleExists(article_id),
  ])
    .then((newComment) => {
      response.status(201).send({ comment: newComment[0] });
    })
    .catch(next);
};

exports.deleteComment = (request, response, next) => {
  const {comment_id} = request.params
  removeComment(comment_id)
  .then(() => {
    response.status(204).send()
  })
  .catch(next)
}
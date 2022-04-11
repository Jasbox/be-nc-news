const db = require("../db/connection");
//

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) AS comment_count 
            FROM articles
            LEFT JOIN comments ON articles.article_id = comments.article_id
            WHERE articles.article_id = $1
            Group BY articles.article_id;
    `,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "article not found" });
      return rows[0];
    });
};

exports.updateArticle = (articleId, votes) => {
  return db   
    .query(`UPDATE articles SET votes = votes + $2 
           WHERE article_id = $1
           RETURNING *;`,
      [articleId, votes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchArticles = () => {
  return db
    .query(`SELECT articles.*, COUNT(comments.article_id) AS comment_count
            FROM articles
            LEFT JOIN comments ON articles.article_id = comments.article_id
            GROUP BY articles.article_id
            ORDER BY articles.created_at DESC;`)
    .then(({ rows: articles }) => {
      return articles;
    });
};

exports.fetchArticleComments = (articleId) => {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1;", [articleId])
    .then(({ rows: comments }) => {
      return comments;
    });
};

exports.checkArticleExists = (articleId) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [articleId])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "no article found!" });
      }
    });
};

exports.insertComment = (articleId, newComment) => {
  const {username, body} = newComment
  return db
    .query(`
       INSERT INTO comments
       (article_id, author, body)
       VALUES
       ($1,$2,$3)
       RETURNING *;
    `, [articleId, username, body])
    .then(({rows}) => {
      return rows[0]
    })
}
const db = require("../db/connection");


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
    .query(
      `UPDATE articles SET votes = votes + $2 
           WHERE article_id = $1
           RETURNING *;`,
      [articleId, votes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchArticles = (sort_by = 'created_at', order_by = 'DESC', topic) => {
  const validSortBys = [
    'article_id',
    'title',
    'body',
    'author',
    'topic',
    'created_at',
    'votes',
    'comment_count',
  ];
  const validOrderBys = ['ASC', 'DESC'];

  if (!validSortBys.includes(sort_by) || !validOrderBys.includes(order_by)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  let queryStr = `
   SELECT articles.*, COUNT(comments.article_id) AS comment_count
   FROM articles
   LEFT JOIN comments ON articles.article_id = comments.article_id `

  const queryValues = [];
  if (topic) {
    queryStr += `WHERE topic = $1 `;
    queryValues.push(topic);
  }



  queryStr += `GROUP BY articles.article_id `;
  queryStr += `ORDER BY ${sort_by} `;
  queryStr += `${order_by}`;
 
  

  return db.query(queryStr, queryValues).then(({ rows: articles }) => {
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
  const { username, body } = newComment;
  return db
    .query(
      `
       INSERT INTO comments
       (article_id, author, body)
       VALUES
       ($1,$2,$3)
       RETURNING *;
    `,
      [articleId, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeComment = (comment_id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [comment_id])
    .then((result) => {
      if(result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "not found"
        })
      }
    })
}



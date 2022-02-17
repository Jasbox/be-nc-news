const db = require("../db/connection");

exports.fetchArticles = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [id])
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "article not found" });
      return rows[0];
    });
};

exports.updateArticle = ( articleId, votes) => {
   return db
   .query(`UPDATE articles SET votes = votes + $2 
           WHERE article_id = $1
           RETURNING *;`,
           [articleId, votes])
           .then(({rows}) => {
             return rows[0]
           })
}

// console.log('From articles model')

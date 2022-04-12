const db = require("../db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

exports.checkTopicExists = (topic) => {
  if (topic !== undefined) {
    return db
      .query("SELECT * FROM topics WHERE slug = $1;", [topic])
      .then((result) => {
       
        if (result.rows.length === 0) {
          return Promise.reject({ status: 400, msg: "bad request" });
        }
      });
  } else return db.query("SELECT * FROM topics WHERE slug = $1;", [topic]);
};

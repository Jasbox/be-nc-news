const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("GET", () => {
  describe("404 path not found", () => {
    test("status 404: respond when path not found", () => {
      return request(app)
        .get("/api/not-a-route")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("path not found");
        });
    });
  });

  describe("/api", () => {
    test("status 200:, responds with JSON describing all the available endpoints on the API", () => {
      return request(app).get("/api").expect(200);
    });
  });

  describe("GET/api/topics", () => {
    test('status:200 should respond with an array of object should have the properties of "slug" and "description', () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body.topics).toBeInstanceOf(Array);
          expect(response.body.topics).toHaveLength(3);

          response.body.topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });

  describe("GET/api/articles/:article_id", () => {
    test("status: 200 when pass a valid article id should respond with return an objects with relevant the properties", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then((response) => {
          expect(response.body.article).toBeInstanceOf(Object);
          expect(response.body.article).toEqual(
            expect.objectContaining({
              author: "icellusedkars",
              title: "Sony Vaio; or, The Laptop",
              article_id: 2,
              body: "Call me Mitchell. Some years ago???never mind how long precisely???having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people???s hats off???then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
              topic: "mitch",
              created_at: "2020-10-16T05:03:00.000Z",
              votes: 0,
            })
          );
        });
    });
    test("status: 200, an article will respond with a new comment_count property ", () => {
      return request(app)
        .get("/api/articles/9")
        .expect(200)
        .then((response) => {
          expect(response.body.article.comment_count).toBe("2");
        });
    });

    test("status: 400 for invalid article_id  ", () => {
      return request(app)
        .get("/api/articles/banana")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
    test("status: 404 for valid but non-existent article_id", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("article not found");
        });
    });
  });
});

describe("GET/api/users", () => {
  test("status:200 should respond with an array of object should have the properties of username", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body.users).toBeInstanceOf(Array);
        expect(response.body.users).toHaveLength(4);

        response.body.users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET/api/articles", () => {
  test("status 200: should respond with an array of object should have the relevant properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeInstanceOf(Array);

        response.body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
      });
  });
  test("status 200: should return array with default sort by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("status 200: each article should responds with a comment_count column", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });

  //Queries

  test("status 200: when requested return articles sorted by title", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("title", {
          descending: true,
        });
      });
  });

  test("status 200: when requested return articles sorted by author", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("author", {
          descending: true,
        });
      });
  });
  test("status 200: when requested return articles sorted by article_id", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("article_id", {
          descending: true,
        });
      });
  });
  test("status 200: when requested return articles sorted by topic", () => {
    return request(app)
      .get("/api/articles?sort_by=topic")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("topic", {
          descending: true,
        });
      });
  });
  test("status 200: when requested return articles sorted by created_at", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("status 200: when requested return articles sorted by votes", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("votes", {
          descending: true,
        });
      });
  });
  test("status 200: when requested return articles sorted by comment_count", () => {
    return request(app)
      .get("/api/articles?sort_by=comment_count")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("comment_count", {
          descending: true,
        });
      });
  });
  test("status 400: when requested by invalid sort_by query return error message", () => {
    return request(app)
      .get("/api/articles?sort_by=something")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("status 200: when requested return articles by date and by ascending order", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("created_at", {
          ascending: true,
        });
      });
  });
  test("status 200: when requested return articles by article_id and by ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=asc")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("article_id", {
          ascending: true,
        });
      });
  });
  test("status 400: when requested by invalid order query return error message", () => {
    return request(app)
      .get("/api/articles?order=what_order")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("status 200: when requested return articles of a topic specified by a query", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toHaveLength(11);
        response.body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              topic: "mitch",
            })
          );
        });
      });
  });
  test("status 200: when requested return articles by topic and order by and by a particular column", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=desc&topic=mitch")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toHaveLength(11);
        expect(response.body.articles).toBeSortedBy("article_id", {
          descending: true,
        });
        response.body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              topic: "mitch",
            })
          );
        });
      });
  });
});

describe("GET/api/articles/:article_id/comments", () => {
  test("status 200: when selected by article_id should return with an array of comments", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        response.body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
  test("status 200: when select an article without comment return with an empty array", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments).toEqual([]);
      });
  });
  test("status 404: when select an article_id not in the database return with message no article found", () => {
    return request(app)
      .get("/api/articles/12345/comments")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "no article found!" });
      });
  });
});

describe("PATCH", () => {
  describe("PATCH/api/articles/:article_id", () => {
    test("status 200: responds with the updated article after the votes property has been amended", () => {
      const articleUpdates = {
        inc_votes: 10,
      };

      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(200)
        .then((response) => {
          expect(response.body.article).toEqual(
            expect.objectContaining({
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              created_at: expect.any(String),
              votes: 110,
            })
          );
        });
    });

    test("status 404: responds with error message when article_id doesn't exist", () => {
      const articleUpdates = {
        inc_votes: 10,
      };
      return request(app)
        .patch("/api/articles/100")
        .send(articleUpdates)
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("no article found!");
        });
    });

    test("status 400: responds with a bad Request error message when the request body key is incorrect", () => {
      const articleUpdates = {
        incorrect_key: 10,
      };
      return request(app)
        .patch("/api/articles/4")
        .send(articleUpdates)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
    test("status 400: responds with a bad request error message when the request body value is the wrong type", () => {
      const articleUpdates = {
        inc_votes: "Incorrect Data",
      };
      return request(app)
        .patch("/api/articles/4")
        .send(articleUpdates)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
  });
});

describe("POST", () => {
  describe("POST /api/articles/:article_id/comments", () => {
    test("status 201: should add a new comment object with properties of username and body", () => {
      const newComment = {
        username: "butter_bridge",
        body: "pineapple on pizza, and I love it!!!",
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(201)
        .then((response) => {
          expect(response.body.comment).toEqual(
            expect.objectContaining({
              author: "butter_bridge",
              body: "pineapple on pizza, and I love it!!!",
              article_id: 1,
              created_at: expect.any(String),
              votes: 0,
              comment_id: 19,
            })
          );
        });
    });
    test("status 400: bad request, unable to add comment without username", () => {
      const newComment = {
        username: null,
        body: "pineapple on pizza, and I love it!!!",
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "bad request" });
        });
    });
    test("status 400: bad request, missing required field must include body", () => {
      const newComment = {
        username: "butter_bridge",
        body: null,
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(newComment)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "bad request" });
        });
    });
    test("status 404, unable to comment on article not exist", () => {
      const newComment = {
        username: "butter_bridge",
        body: "pineapple on pizza, and I love it!!!",
      };
      return request(app)
        .post("/api/articles/12345/comments")
        .send(newComment)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ msg: "not found" });
        });
    });
  });
});

describe("DELETE", () => {
  describe("/api/comments/:comment_id", () => {
    test("status 204 : comment deleted by comment_id", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then((response) => {
          expect(response.body).toEqual({});
        });
    });
    test("status 404: return 404 when comment no found", () => {
      return request(app)
        .delete("/api/comments/12345")
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({
            msg: "not found",
          });
        });
    });
    test("status 400: return 400 when comment_id invalid", () => {
      return request(app)
        .delete("/api/comments/banana")
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            msg: "bad request",
          });
        });
    });
  });
});

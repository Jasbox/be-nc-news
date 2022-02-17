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

  describe("GET/api/topics", () => {
    test('status:200 should respond with an array of object should have the properties of "slug" and "description', () => {
      return request(app)
        .get(`/api/topics`)
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
    test("status:200 when pass a valid article id should respond with return an objects with relevant the properties", () => {
      return request(app)
        .get(`/api/articles/2`)
        .expect(200)
        .then((response) => {
          expect(response.body.article).toBeInstanceOf(Object);
          expect(response.body.article).toEqual({
            author: "icellusedkars",
            title: "Sony Vaio; or, The Laptop",
            article_id: 2,
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            topic: "mitch",
            created_at: "2020-10-16T05:03:00.000Z",
            votes: 0,
          });
        });
    });
    test("status:400 for invalid article_id  ", () => {
      return request(app)
        .get(`/api/articles/banana`)
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
    test("status:404 for valid but non-existent article_id", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("article not found");
        });
    });
  });
});

describe('PATCH', () => {
  describe('/api/articles/:article_id', () => {
      test('status: 200, responds with updated object', () => {
          const updateArticle = { votes: 100 }
          const expected = {
              article: {
                  article_id: 2,
                  title: 'Sony Vaio; or, The Laptop',
                  topic: 'mitch',
                  author: 'icellusedkars',
                  body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                  created_at: "2020-10-16T05:03:00.000Z",
                  votes: 100
              }
          }
          return request (app)
              .patch("/api/articles/2")
              .send(updateArticle)
              .expect(200)
              .then((response) => {
                  expect(response.body).toEqual(expected)
          })
      })
    });
    describe('patchArticle', () => {
      test('status: 400, returns with error message when missing required filed', () => {
          return request(app)
          .patch("/api/articles/2")
          .send({})
          .expect(400)
          .then((response) => {
              expect(response.body).toEqual({msg: "content missing"})
          })
      });
      test('status: 400, returns with error message for invalid request', () => {
          const updateArticle = {votes: 'banana'}
          return request(app)
          .patch("/api/articles/2")
          .send(updateArticle)
          .expect(400)
          .then((response) => {
              expect(response.body).toEqual( {msg: 'bad request'})
          })
      });
  })
});
  
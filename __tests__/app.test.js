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
          //   console.log(response.body, "body");
          //   console.log(response.body.topics);

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
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
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

const app = require("../app");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("/api/topics", () => {
  describe("GET", () => {
    test('should respond with status 200 and return an array of object should have the properties of "slug" and "description', () => {
      return request(app)
        .get(`/api/topics`)
        .expect(200)
        .then((response) => {
          expect(response.body.topics).toBeInstanceOf(Array);
          expect(response.body.topics).toHaveLength(3);
          console.log(response.body, "body");
          console.log(response.body.topics);

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
    test("should respond with status 404 when path not found", () => {
      return request(app)
        .get("/api/not-a-route")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("path not found");
        });
    });
  });
});

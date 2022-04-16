exports.getEndPoint = (request, response, next) => {
  response.status(200).send({
    "GET /api": {
      description:
        "Serves up a JSON representation of all the available endpoints of the API",
    },
    "GET /api/topics": {
      description: "Serves up an array of all topics",
      queries: [],
      exampleResponse: {
        topic: [
          {
            slug: "football",
            description: "Footie",
          },
        ],
      },
    },
    "GET /api/articles": {
      description: "Serves an array of all articles",
      queries: ["author", "topic", "sort_by", "order"],
      exampleResponse: {
        articles: [
          {
            title: "Seafood substitutions are increasing",
            topic: "cooking",
            author: "weegembump",
            body: "Text from the article..",
            created_at: 1527695953341,
          },
        ],
      },
    },
    "GET /api/articles/:article_id": {
      description: "Serves an object of the article by article id",
      queries: [],
      exampleResponse: {
        article_id: 2,
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: "2020-10-16T05:03:00.000Z",
        votes: 0,
        comment_count: "0",
      },
    },
    "GET /api/users": {
      description: "Serves an array of all users",
      queries: [],
      exampleResponse: {
        users: [
          {
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          },
        ],
      },
    },
    "GET /api/articles/:article_id/comments": {
      description: "Serves an array of comments by article id",
      queries: [],
      exampleResponse: {
        comment: [
          {
            comment_id: 16,
            body: "This is a bad article name",
            article_id: 6,
            author: "butter_bridge",
            votes: 1,
            created_at: "2020-10-11T15:23:00.00Z",
          },
        ],
      },
    },
    "PATCH /api/articles/:article_id": {
      description:
        "Take an article id and a votes property and return the article with updated votes",
      queries: [],
      exampleResponse: {
        article: {
          article_id: 2,
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
          created_at: "2020-10-16T05:03:00.000Z",
          votes: 100,
        },
      },
    },
    "POST /api/articles/:article_id/comments": {
      description:
        "Adds a new comment to the comments in the article by article id",
      queries: [],
      exampleResponse: {
        comment_id: 19,
        author: "butter_bridge",
        body: "pineapple on pizza, and I love it!!!",
        article_id: 1,
        created_at: "2022-02-18T10:56:45.650Z",
        votes: 0,
      },
    },
    "DELETE /api/comment/:comment_id": {
      description: "Will delete comment by comment id",
      queries: [],
      exampleResponse: {},
    },
  });
};

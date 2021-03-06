exports.getEndPoint = (request, response, next) => {
  response.status(200).send({
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
    },
    "GET /api/topics": {
      description: "serves an array of all topics",
      queries: [],
      exampleResponse: {
        topics: [{ slug: "football", description: "Footie!" }],
      },
    },

    "GET /api/articles": {
      description: "serves an array of all articles",
      queries: ["topic", "sort_by", "order"],
      exampleResponse: {
        articles: [
          {
            article_id: 34,
            title: "The Notorious MSG's Unlikely Formula For Success",
            topic: "cooking",
            author: "grumpy19",
            body: "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world's most innovative chefs. But secret ingredient monosodium glutamate's biggest secret may be that there was never anything wrong with it at all.",
            created_at: "2020-11-22T11:13:00.000Z",
            votes: 0,
            comment_count: 11,
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
          },
        ],
      },
    },
    "GET /api/articles/:article_id/comments": {
      description: "Serves an array of comments by article id",
      queries: [],
      exampleResponse: {
        comments: [
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
      exampleInput: {
        inc_votes: 50,
      },
      exampleResponse: {
        article_id: 1,
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: "2020-11-07T06:03:00.000Z",
        votes: 50,
      },
    },

    "POST /api/articles/:article_id/comments": {
      description:
        "Adds a new comment to the comments in the article by article id",
      queries: [],
      exampleInput: {
        username: "cooljmessy",
        body: "i rate this 10/10, excellent work",
      },
      exampleResponse: {
        comment: {
          comment_id: 301,
          body: "i rate this 10/10, excellent work",
          article_id: 1,
          author: "cooljmessy",
          votes: 0,
          created_at: "2022-02-27T16:53:04.821Z",
        },
      },
    },
    "DELETE /api/comment/:comment_id": {
      description: "Will delete comment by comment id",
      queries: [],
      exampleResponse: {},
    },
  });
};

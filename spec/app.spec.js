process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
chai.use(chaiSorted);
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("app", () => {
  beforeEach(function() {
    return connection.seed.run();
  });
  after(function() {
    return connection.destroy();
  });
  describe("/api", () => {
    describe("/topics", () => {
      it("GET:200 - responds with an array of all the topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(res => {
            expect(res.body.topics).to.be.an("array");
            expect(res.body.topics[0]).to.have.key("slug", "description");
          });
      });
    });
    describe("/users", () => {
      it("GET:200 responds with a single user when given a valid username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(res => {
            expect(res.body.users).to.be.an("array");
            expect(res.body.users[0].username).to.equal("butter_bridge");
            expect(res.body.users[0]).to.contain.keys(
              "username",
              "avatar_url",
              "name"
            );
          });
      });
      it("GET:404 responds with the correct error message when given a username that cannot be found", () => {
        return request(app)
          .get("/api/users/99999helloninerniner")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("Not Found");
          });
      });
    });
    describe("/articles", () => {
      it("GET:200 responds with an array of article objects with all the correct properties that has been filtered by author name", () => {
        return request(app)
          .get(
            "/api/articles?sort_by=created_at&order_by=desc&author=rogersop&topic=mitch"
          )
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
            expect(res.body.articles[0]).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "author",
              "topic",
              "created_at",
              "comment_count"
            );
            expect(res.body.articles[0].author).to.equal("rogersop");
            expect(res.body.articles[0].topic).to.equal("mitch");
          });
      });
      describe("/:article_id", () => {
        it("GET:200 responds with a single article when given a correct article_id", () => {
          return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(res => {
              expect(res.body.articles).to.be.an("array");
              expect(res.body.articles[0].article_id).to.equal(2);
              expect(res.body.articles[0]).to.contain.keys(
                "article_id",
                "title",
                "body",
                "votes",
                "author",
                "topic",
                "created_at",
                "comment_count"
              );
            });
        });
        it("PATCH:200 responds with the article we have made a change to", () => {
          return request(app)
            .patch("/api/articles/2")
            .send({ inc_votes: 6 })
            .expect(200)
            .then(res => {
              expect(res.body.articles[0].article_id).to.equal(2);
              expect(res.body.articles[0].votes).to.equal(6);
              expect(res.body.articles[0]).to.contain.keys(
                "article_id",
                "title",
                "body",
                "votes",
                "topic",
                "author"
              );
            });
        });
        it("GET:400 responds with the correct error message when given an invalid article_id", () => {
          return request(app)
            .get("/api/articles/number_two")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("Bad Request");
            });
        });
        it("GET:404 responds with correct error message when a matching article_id cannot be found", () => {
          return request(app)
            .get("/api/articles/115")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Not Found");
            });
        });
        describe("/comments", () => {
          it("POST:201 responds with the article that has had another comment added into it", () => {
            return request(app)
              .post("/api/articles/5/comments")
              .send({
                author: "rogersop",
                comment:
                  "This is just a short comment that I want to add to check my test works, and im able to post comments when I use an article id to do so. Hope this works."
              })
              .expect(201)
              .then(res => {
                expect(res.body.comments[0]).to.have.keys(
                  "comment_id",
                  "author",
                  "article_id",
                  "votes",
                  "created_at",
                  "body"
                );
                expect(res.body.comments).to.be.an("array");
                expect(res.body.comments[0].body).to.contain(
                  "This is just a short comment that I want to add to check my test works, and im able to post comments when I use an article id to do so. Hope this works."
                );
              });
          });
          it("POST:400 responds with an error message when an incomplete post request is provided", () => {
            return request(app)
              .post("/api/articles/2/comments")
              .send({ author: "gazza", comment: "please dont work" })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("Bad Request");
              });
          });
          it("POST:404 responds with the correct error message when an invalid url", () => {
            return request(app)
              .post("/api/articles/3/commentzzzz")
              .send({ author: "rogersop", comment: "please dont work" })
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal("Route Not Found");
              });
          });
          it("GET:200 responds with an array of comments from the given article_id", () => {
            return request(app)
              .get("/api/articles/5/comments?sort_by=created_at&order_by=desc")
              .expect(200)
              .then(res => {
                expect(res.body.comments).to.be.an("array");
                expect(res.body.comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
        });
      });
    });
    describe("/comments", () => {
      describe("/:comment_id", () => {
        it("PATCH:200 responds with the updated comment that has been patched", () => {
          return request(app)
            .patch("/api/comments/4")
            .send({ inc_votes: 6 })
            .expect(200)
            .then(res => {
              expect(res.body.comments[0].comment_id).to.equal(4);
              expect(res.body.comments[0].votes).to.equal(-94);
            });
        });
      });
    });
  });
});

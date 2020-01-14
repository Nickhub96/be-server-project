process.env.NODE.ENV = "test";
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
chai.use(chaiSorted);
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("app", () => {
  beforeEach(function() {
    return connection.seed.run;
  });
  after(function() {
    return connection.destroy();
  });
  describe("/api", () => {
    describe("", () => {});
  });
});

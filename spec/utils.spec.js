const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatDates([])).to.eql([]);
  });
  it("return an object that has the correct timestamp attached", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];

    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1471522072389)
      }
    ];
    expect(formatDates(input)).to.eql(expected);
  });
  it("return an array of objects that have had their timestamp changed into the correct format", () => {
    const input = [
      { created_at: 1471522072389 },
      { created_at: 1500584273256 },
      { created_at: 1500659650346 },
      { created_at: 1514093931240 }
    ];
    const expected = [
      { created_at: new Date(1471522072389) },
      { created_at: new Date(1500584273256) },
      { created_at: new Date(1500659650346) },
      { created_at: new Date(1514093931240) }
    ];
    expect(formatDates(input)).to.eql(expected);
  });
  it("the original array has not been mutated", () => {
    const input = [{ created_at: 1471522072389 }];
    const inputCopy = [{ created_at: 1471522072389 }];
    const output = formatDates(input);
    expect(input).to.eql(inputCopy);
    expect(input[0]).to.not.equal(output[0]);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("returns an object which has been formatted in the correct way", () => {
    const input = [{ article_id: 1, title: "A" }];
    const expected = { A: 1 };
    expect(makeRefObj(input)).to.eql(expected);
  });
  it("return a list objects formatted in the correct way when passed an array of objects", () => {
    const input = [
      { article_id: 1, title: "A" },
      //   { "A": 1 },

      //   article_id: articleRef[input.belongs_to]

      // {"They're not exactly dogs, are they?": 1},

      { article_id: 99, title: "CD" },
      { article_id: 3, title: "Hello" },
      { article_id: 7, title: "Test" }
    ];
    const expected = { A: 1, CD: 99, Hello: 3, Test: 7 };
    expect(makeRefObj(input)).to.eql(expected);
  });
});

describe("formatComments", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatComments([])).to.eql([]);
  });
  it("returns a single comment back that has been formatted", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];

    const articleRef = { "They're not exactly dogs, are they?": 1 };
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389)
      }
    ];
    expect(formatComments(input, articleRef)).to.eql(expected);
  });
  it("returns multiple comments that have the correct keys, date and id", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      }
    ];
    const articleRef = { "They're not exactly dogs, are they?": 1, A: 2 };
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 1,
        author: "butter_bridge",
        votes: 16,
        created_at: new Date(1511354163389)
      },
      {
        body: "This is a bad article name",
        article_id: 2,
        author: "butter_bridge",
        votes: 1,
        created_at: new Date(1038314163389)
      }
    ];

    expect(formatComments(input, articleRef)).to.eql(expected);
  });
  it("does ot mutate the original array", () => {
    const input = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      }
    ];
    const inputCopy = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      }
    ];
    const articleRef = { A: 1 };

    const output = formatComments(input, articleRef);
    expect(input).to.eql(inputCopy);
    expect(input[0]).to.not.equal(output[0]);
  });
});

const testData = require("./test-data");
const devData = require("./development-data");

const ENV = process.env.NODE_ENV || "development";

const data = {
  test: testData,
  development: devData
};

module.exports = data[ENV];

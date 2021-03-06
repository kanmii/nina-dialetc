const path = require("path");

const jestBabelTransform = path.resolve(
  __dirname,
  "../../js-commons/jestBabelTransform.js"
);

module.exports = {
  displayName: "@ta/commons",
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.(ts|js)", "!src/__tests__/**"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node",
  testRegex: "src/__tests__/.+?\\.test\\.[tj]s$",
  transform: {
    "^.+\\.ts$": jestBabelTransform,
  },
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules*",
    "<rootDir>/package\\.json",
    "<rootDir>/package-scripts\\.js",
    "<rootDir>/jest\\.config\\.js",
    "<rootDir>/coverage/",
    "<rootDir>/tsconfig\\.json/",
  ],
};

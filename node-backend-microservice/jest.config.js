module.exports = {
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.(ts|js)"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

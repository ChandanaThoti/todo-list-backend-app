const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testPathIgnorePatterns: ["\\.js$"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/dist/**",
  ],

  collectCoverage: true,
};

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Package :: ts-jest (npx ts-jest config:init)
  preset: "ts-jest",
  testEnvironment: "node",

  // Package :: jest (npm init jest@latest)
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "^@/sanity-core/(.*)$": "<rootDir>/sanity-core/$1",
    "^@/sanity-adapters/(.*)$": "<rootDir>/sanity-adapters/$1",
    "^@/sanity-ui-kit/(.*)$": "<rootDir>/sanity-ui-kit/$1",
    "^@/sanity-components/(.*)$": "<rootDir>/sanity-components/$1",
    "^@/sanity-skills/(.*)$": "<rootDir>/sanity-skills/$1",
  },
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
};

export default config;

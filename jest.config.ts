/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    testTimeout: 30000,
};
console.log("🚀 🚀 🚀 Running tests");
export default config;

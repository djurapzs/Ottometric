// cypress.config.js
const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

// 1. Load .env into process.env
dotenv.config();

module.exports = defineConfig({
  env: {
    user: process.env.CYPRESS_USER,
    pass: process.env.CYPRESS_PASS,
  },

  e2e: {
    baseUrl: process.env.BASE_URL,

    specPattern: "cypress/e2e/**/*.spec.{js,ts}",
    supportFile: "cypress/support/commands.ts",
    defaultCommandTimeout: 10000,
    video: false,

    setupNodeEvents(on, config) {},
  },
});

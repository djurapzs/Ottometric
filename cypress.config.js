const { defineConfig } = require("cypress");
import dotenv from 'dotenv';
dotenv.config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: process.env.BASE_URL,
    specPattern: 'cypress/e2e/**/*.spec.js',
    supportFile: 'cypress/support/e2e.js',
    defaultCommandTimeout: 10000,
    video: false,
  },
});

/**
 * Pre-login intercepts for Cypress E2E testing
 *
 * This module contains HTTP intercepts that should be set up before user login
 * to ensure tests run in a controlled environment without external dependencies.
 *
 * Main purposes:
 * - Block third-party tracking and monitoring services
 * - Provide predictable API responses for testing
 * - Prevent network requests that could cause test flakiness
 */

/**
 * Intercepts POST requests to the redirection_data API endpoint
 *
 * This intercept allows tests to:
 * - Monitor when redirection requests are made during login flow
 * - Wait for redirection API calls to complete
 * - Track navigation behavior in pre-login scenarios
 *
 * Usage: Use cy.wait('@redirectRequest') to wait for this API call in tests
 */
export function redirectRequest() {
  cy.intercept("POST", "**/api/web/redirection_data").as("redirectRequest");
}

/**
 * Intercepts GET requests to the json_config API endpoint
 * 
 * This intercept allows tests to:
 * - Monitor when configuration requests are made during app initialization
 * - Wait for configuration data to load before proceeding with tests
 * - Ensure app is properly configured before running test scenarios
 * 
 * Usage: Use cy.wait('@jsonConfigRequest') to wait for this API call in tests
 */
export function jsonConfigRequest() {
  cy.intercept("GET", "**/api/web/json_config").as("jsonConfigRequest");
}

/**
 * Blocks PostHog analytics tracking requests
 * PostHog is used for product analytics and user behavior tracking
 * Returns 204 (No Content) to prevent actual tracking during tests
 */
function stubPosthogArray() {
  cy.intercept(
    { method: "GET", url: "**/static/array.js" },
    { statusCode: 204, body: "" }
  ).as("posthogArray");
}

/**
 * Blocks Sentry error reporting and monitoring requests
 * Sentry is used for error tracking and performance monitoring
 * Returns 204 (No Content) to prevent error reports during tests
 */
function stubSentryRequests() {
  cy.intercept("POST", /.*sentry\.io\/api\/.*/i, {
    statusCode: 204,
    body: {},
  }).as("sentryBlocked");
}

/**
 * Intercepts and mocks tags_new API endpoint
 * Returns an empty array to simulate no tags being available
 * Used for drive trial tag-related functionality testing
 */
function stubTagsNewIntercept() {
  cy.intercept("GET", "/api/web/drive_trials/*/tags_new**", {
    statusCode: 200,
    body: {
      items: [], // Empty array simulates no tags available
    },
  }).as("tagsNewIntercept");
}

/**
 * Intercepts and mocks notations API endpoint
 * Returns an empty array to simulate no notations being available
 * Used for drive trial notation-related functionality testing
 */
function stubNotationsIntercept() {
  cy.intercept("GET", "/api/web/drive_trials/*/notations**", {
    statusCode: 200,
    body: {
      items: [], // Empty array simulates no notations available
    },
  }).as("notationsIntercept");
}

/**
 * Sets up all necessary intercepts for pre-login testing
 * This function should be called before login to ensure:
 * - External tracking services are blocked (PostHog, Sentry)
 * - API endpoints return predictable empty responses
 * - Tests run in isolation without external dependencies
 */
export function preLoginIntercepts() {
  stubPosthogArray();
  stubSentryRequests();
  stubTagsNewIntercept();
  stubNotationsIntercept();
  redirectRequest();
  jsonConfigRequest();
}

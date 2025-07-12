/**
 * Stub your PostHog “array.js” loader.
 */
export function stubPosthogArray() {
  cy.intercept(
    { method: "GET", url: "**/static/array.js" },
    { statusCode: 204, body: "" }
  ).as("posthogArray");
}

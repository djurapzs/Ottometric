export function redirectRequest() {
  cy.intercept("POST", "**/api/web/redirection_data").as("redirectRequest");
}

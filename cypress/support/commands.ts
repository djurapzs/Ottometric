import "./pages/login-page";

declare global {
  // Extend Cypress' Chainable interface to include custom commands
  // This allows us to use these commands in our tests without TypeScript errors
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      selectProgram(name: string): Chainable<void>;
      goToKpiLanes(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", () => {
  const user = Cypress.env("user");
  const pass = Cypress.env("pass");
  cy.visit("/");
  cy.get('input[type="email"]').type(user);
  cy.get('input[type="password"]').type(pass);
  cy.get('button[type="submit"]').click();
});

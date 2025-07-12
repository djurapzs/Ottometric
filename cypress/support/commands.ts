import "./pages/login-page";
import LoginPage from "./pages/login-page";

declare global {
  // Extend Cypress' Chainable interface to include custom commands
  // This allows us to use these commands in our tests without TypeScript errors
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      selectProgram(programName: string): Chainable<Element>;
      goToKpiLanes(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", () => {
  const user = Cypress.env("user");
  const pass = Cypress.env("pass");
  LoginPage.fillEmail(user);
  LoginPage.fillPassword(pass);
  LoginPage.submit();
});

Cypress.Commands.add(
  "selectProgram",
  (programName: string = Cypress.env("programName")) => {
    // open the dropdown
    cy.get('[data-testid="program-picker-menu-select"]').click();
    // pick the entry
    cy.get('[data-testid="program-options-list"]')
      .contains("li", programName)
      .click();
  }
);

export {};

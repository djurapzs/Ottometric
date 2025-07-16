import headerPage from "./pages/header-page";
import "./pages/login-page";
import LoginPage from "./pages/login-page";
import sidePanelPage from "./pages/side-panel-page";
import tablePage from "./pages/table-page";

declare global {
  // Extend Cypress' Chainable interface to include custom commands
  // This allows us to use these commands in our tests without TypeScript errors
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      selectProgram(programName: string): Chainable<Element>;
      goToKpiSensor(): Chainable<void>;
      goToFCM(): Chainable<void>;
      goToLanes(): Chainable<void>;
      goToKpiLanes(): Chainable<void>;
      goToKpiFeature(): Chainable<void>;
      goToZone1(): Chainable<void>;
      goToISA(): Chainable<void>;
      goToKpiZone1(): Chainable<void>;
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
    headerPage.programSelectDropdown.should("be.visible").click();
    headerPage.programOptionsList
      .should("be.visible")
      .contains("li", programName)
      .click();
  }
);

// Navigate through the left nav
Cypress.Commands.add("goToKpiSensor", () => {
  sidePanelPage.goToKpiSensor();
});

Cypress.Commands.add("goToKpiFeature", () => {
  sidePanelPage.goToKpiFeature();
});
Cypress.Commands.add("goToZone1", () => {
  sidePanelPage.clickZone1Item();
});
Cypress.Commands.add("goToISA", () => {
  sidePanelPage.clickIsaToggle();
});

Cypress.Commands.add("goToKpiLanes", () => {
  cy.goToKpiSensor();
  cy.goToFCM();
  cy.goToLanes();
  tablePage.centerTable.should("exist");
});

Cypress.Commands.add("goToKpiZone1", () => {
  // Wait for app configuration to load before starting navigation
  cy.wait("@jsonConfigRequest");

  // Ensure navigation elements are ready before proceeding
  sidePanelPage.kpiFeatureTab.should("be.visible");

  cy.goToKpiFeature();
  cy.goToISA();
  cy.goToZone1();

  // Wait for table to load after navigation
  tablePage.centerTable.should("exist");
  tablePage.centerTable.should("be.visible");
});

export {};

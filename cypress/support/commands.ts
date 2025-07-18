import headerPage from "./pages/header-page";
import "./pages/login-page";
import LoginPage from "./pages/login-page";
import sidePanelPage from "./pages/side-panel-page";

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
  sidePanelPage.kpiSensorTab.should("be.visible").click();
});

Cypress.Commands.add("goToFCM", () => {
  sidePanelPage.fcmToggle.click();
});

Cypress.Commands.add("goToLanes", () => {
  sidePanelPage.lanesItem.click();
});

Cypress.Commands.add("goToKpiFeature", () => {
  sidePanelPage.kpiFeatureTab.click();
});
Cypress.Commands.add("goToZone1", () => {
  sidePanelPage.zone1Item.click();
});
Cypress.Commands.add("goToISA", () => {
  sidePanelPage.isaToggle.click();
});

Cypress.Commands.add("goToKpiLanes", () => {
  cy.goToKpiSensor();
  cy.goToFCM();
  cy.goToLanes();
});

Cypress.Commands.add("goToKpiZone1", () => {
  cy.goToKpiFeature();
  cy.goToISA();
  cy.goToZone1();
});

export {};

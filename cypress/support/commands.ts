import "./pages/login-page";
import LoginPage from "./pages/login-page";
import homePage from "./pages/home-page";

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
    homePage.programSelectDropdown.should("be.visible").click();
    // pick the entry
    homePage.programOptionsList
      .should("be.visible")
      .contains("li", programName)
      .click();
  }
);

// Navigate through the left nav
Cypress.Commands.add("goToKpiSensor", () => {
  homePage.kpiSensorTab.should("be.visible").click();
});

Cypress.Commands.add("goToFCM", () => {
  homePage.fcmToggle.click();
});

Cypress.Commands.add("goToLanes", () => {
  homePage.lanesItem.click();
});

// Composite command: KPI Sensor → Lanes
Cypress.Commands.add("goToKpiLanes", () => {
  cy.goToKpiSensor();
  cy.goToFCM();
  cy.goToLanes();
});

export {};

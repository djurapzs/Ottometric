// cypress/e2e/count-fn-events.spec.ts
import { Zone1 } from "../support/enums/zone1.enum";
import { CameraPrograms } from "../support/enums/camera-programs.enum";
import { followRedirectionAndVisit } from "../support/helpers/handle-redirection";
import {
  preLoginIntercepts,
  redirectRequest,
} from "../support/intercepts/pre-login";
import kpiDetailsPage from "../support/pages/kpi-details-page";
import tablePage from "../support/pages/table-page";

// Test data constants for better maintainability
const TEST_DATA = {
  program: CameraPrograms.VI1,
  zone: Zone1.FN,
  dtidCount: 7,
} as const;

describe("Count the FN events in the timeline.", () => {
  beforeEach(() => {
    cy.log("Setting up test environment for FN event counting");
    // Prevents unnecessary requests before login.
    preLoginIntercepts();
    cy.visit("/");
    cy.login();
  });
  it("should count the FN events for the selected DTIDs in the timeline.", () => {
    cy.log(`Starting FN event count test with ${TEST_DATA.dtidCount} DTIDs`);
    redirectRequest();

    cy.log(`Selecting program: ${TEST_DATA.program}`);
    cy.selectProgram(TEST_DATA.program);

    cy.log("Navigating to KPI Zone1");
    cy.goToKpiZone1();
    tablePage.waitForTableToLoad();

    cy.log(`Selecting ${TEST_DATA.dtidCount} DTIDs from table`);
    // Select the DTIDs for which we want to count the FN events (from 1 to N).
    tablePage.DTIDmultiSelect(TEST_DATA.dtidCount);
    tablePage.clickSeeDetailsButton();

    cy.log("Handling redirection to details page");
    // Keeps cypress from failing due to a redirection (keeps him in same tab).
    followRedirectionAndVisit("VI1", "zone1");

    cy.log("Accessing timeline view");
    kpiDetailsPage.clickTimelineMenuItemIfNotVisible();

    cy.log(`Selecting zone: ${TEST_DATA.zone}`);
    kpiDetailsPage.selectZone1Value(TEST_DATA.zone);

    cy.log("Retrieving and validating FN event count");
    // Result is displayed in dev tools console within the runner.
    kpiDetailsPage.getTotalEventCount().then((count) => {
      cy.log(`Total FN events count: ${count}`);
      console.log("Total FN events count:", count);
    });
  });
});

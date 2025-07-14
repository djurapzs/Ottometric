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
    // Prevents unnecessary requests before login.
    preLoginIntercepts();
    cy.visit("/");
    cy.login();
  });
  it("should count the FN events for the selected DTIDs in the timeline.", () => {
    redirectRequest();

    cy.selectProgram(TEST_DATA.program);
    cy.goToKpiZone1();
    tablePage.waitForTableToLoad();
    // Select the DTIDs for which we want to count the FN events (from 1 to N).
    tablePage.DTIDmultiSelect(TEST_DATA.dtidCount);
    tablePage.clickSeeDetailsButton();
    // Keeps cypress from failing due to a redirection (keeps him in same tab).
    followRedirectionAndVisit("VI1", "zone1");

    kpiDetailsPage.clickTimelineMenuItemIfNotVisible();

    kpiDetailsPage.selectZone1Value(TEST_DATA.zone);
    // Result is displayed in dev tools console within the runner.
    kpiDetailsPage.getTotalEventCount().then((count) => {
      console.log("Total FN events count:", count);
    });
  });
});

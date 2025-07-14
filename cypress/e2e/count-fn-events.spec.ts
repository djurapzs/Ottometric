// cypress/e2e/lanes-sum.spec.ts
import { Zone1 } from "../support/enums/zone1.enum";
import { CameraPrograms } from "../support/enums/camera-programs.enum";
import { followRedirectionAndVisit } from "../support/helpers/handle-redirection";
import {
  preLoginIntercepts,
  redirectRequest,
} from "../support/intercepts/pre-login";
import kpiDetailsPage from "../support/pages/kpi-details-page";
import tablePage from "../support/pages/table-page";
import { table } from "console";

describe("Count the FN events in the timeline.", () => {
  beforeEach(() => {
    // Prevents unnecessary requests before login.
    preLoginIntercepts();
    cy.visit("/");
    cy.login();
  });
  it("should count the FN events for the selected DTIDs in the timeline.", () => {
    redirectRequest();

    cy.selectProgram(CameraPrograms.VI1);
    tablePage.waitUntilTableIsVisible();
    cy.goToKpiZone1();
    // Select the DTIDs for which we want to count the FN events (from 1 to N).
    tablePage.DTIDmultiSelect(7);
    tablePage.seeDetailsButton.should("be.enabled").click();
    // Keeps cypress from failing due to a redirection (keeps him in same tab).
    followRedirectionAndVisit("VI1", "zone1");

    kpiDetailsPage.waitForCameraLoaderToDisappear();

    kpiDetailsPage.selectZone1Value(Zone1.FN);
    // Result is displayed in dev tools console within the runner.
    kpiDetailsPage.getTotalEventCount().then((count) => {
      console.log("Total FN events count:", count);
    });
  });
});

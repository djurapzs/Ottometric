// cypress/e2e/lanes-sum.spec.ts
import { Zone1 } from "../support/enums/zone1.enum";
import { CameraPrograms } from "../support/enums/camera-programs.enum";
import { followRedirectionAndVisit } from "../support/helpers/handle-redirection";
import { stubPosthogArray } from "../support/intercepts/pre-login";
import { redirectRequest } from "../support/intercepts/redirect-request";
import kpiDetailsPage from "../support/pages/kpi-details-page";
import tablePage from "../support/pages/table-page";

describe("Count the FN events in the timeline.", () => {
  beforeEach(() => {
    stubPosthogArray();
    cy.visit("/");
    cy.login();
  });
  it("should count the FN events for the selected DTIDs in the timeline.", () => {
    redirectRequest();

    cy.selectProgram(CameraPrograms.VI1);
    cy.goToKpiZone1();

    tablePage.DTIDmultiSelect(7);
    tablePage.seeDetailsButton.should("be.enabled").click();

    followRedirectionAndVisit("VI1", "zone1");

    kpiDetailsPage.selectZone1Value(Zone1.FN);

    kpiDetailsPage.getTotalEventCount().then((count) => {
      console.log("Total FN events count:", count);
    });
  });
});

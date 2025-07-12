// cypress/e2e/lanes-sum.spec.ts

import { CameraPrograms } from "../support/enums/camera-programs.enum";
import { followRedirectionAndVisit } from "../support/helpers/handle-redirection";
import { stubPosthogArray } from "../support/intercepts/pre-login";
import { redirectRequest } from "../support/intercepts/redirect-request";
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

    tablePage.DTIDmultiSelect(2);
    tablePage.seeDetailsButton.should("be.enabled").click();

    followRedirectionAndVisit("VI1", "zone1");
  });
});

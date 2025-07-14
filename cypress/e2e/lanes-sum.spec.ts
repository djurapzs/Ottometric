// cypress/e2e/lanes-sum.spec.ts

import { assertTotalIsValid } from "../support/assertations/assert-total-is-valid";
import { CameraPrograms } from "../support/enums/camera-programs.enum";
import {
  calculateColumnAverages,
  getFooterValues,
} from "../support/helpers/calculate-column-average";
import { preLoginIntercepts } from "../support/intercepts/pre-login";
import tablePage from "../support/pages/table-page";

describe("Check if the sum of values from each row corresponds with the value from the total row", () => {
  beforeEach(() => {
    // Prevents unnecessary requests before login.
    preLoginIntercepts();
    cy.visit("/");
    cy.login();
  });
  it("should validate if total value corresponds with row sums", () => {
    cy.selectProgram(CameraPrograms.VT1);

    cy.goToKpiLanes();
    tablePage.waitForTableToLoad();

    getFooterValues(tablePage.centerTable).then((footerValues) => {
      calculateColumnAverages(
        tablePage.centerTable,
        cy.wrap(footerValues)
      ).then((averages) => {
        assertTotalIsValid(footerValues, averages);
      });
    });
  });
});

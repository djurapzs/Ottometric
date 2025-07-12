// cypress/e2e/lanes-sum.spec.ts

import { assertTotalIsValid } from "../support/assertations/assert-total-is-valid";
import { CameraPrograms } from "../support/enums/camera-programs.enum";
import {
  calculateColumnAverages,
  getFooterValues,
} from "../support/helpers/calculate-column-average";
import { stubPosthogArray } from "../support/intercepts/pre-login";
import tablePage from "../support/pages/table-page";

describe("Check if the sum of values from each row corresponds with the value from the total row", () => {
  beforeEach(() => {
    stubPosthogArray();
  });
  it("should validate if total value corresponds with row sums", () => {
    cy.visit("/");
    cy.login();
    cy.selectProgram(CameraPrograms.VT1);
    cy.goToKpiLanes();

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

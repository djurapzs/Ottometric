// cypress/e2e/lanes-sum.spec.ts

import { assertTotalIsValid } from "../support/assertations/assert-total-is-valid";
import { CameraPrograms } from "../support/enums/camera-programs.enum";
import {
  calculateColumnAverages,
  getFooterValues,
} from "../support/helpers/calculate-column-average";
import { preLoginIntercepts } from "../support/intercepts/pre-login";
import tablePage from "../support/pages/table-page";

// Test data constants for better maintainability
const TEST_DATA = {
  program: CameraPrograms.VT1,
  tolerance: 0.1,
} as const;

describe("Check if the sum of values from each row corresponds with the value from the total row", () => {
  beforeEach(() => {
    cy.log("Setting up test environment for lane sum validation");
    // Prevents unnecessary requests before login.
    preLoginIntercepts();
    cy.visit("/");
    cy.login();
  });
  it("should validate if total value corresponds with row sums", () => {
    cy.log(
      `Starting lane sum validation test for program: ${TEST_DATA.program}`
    );

    cy.log(`Selecting program: ${TEST_DATA.program}`);
    cy.selectProgram(TEST_DATA.program);

    cy.log("Navigating to KPI Lanes");
    cy.goToKpiLanes();
    tablePage.waitForTableToLoad();

    cy.log("Extracting footer values from table");
    getFooterValues(tablePage.centerTable).then((footerValues) => {
      cy.log(`Found ${footerValues.length} columns in footer`);

      cy.log("Calculating column averages");
      calculateColumnAverages(
        tablePage.centerTable,
        cy.wrap(footerValues)
      ).then((averages) => {
        cy.log(`Calculated averages for ${averages.length} columns`);
        cy.log("Validating that totals match row sums");

        assertTotalIsValid(footerValues, averages);
        cy.log("Lane sum validation completed successfully");
      });
    });
  });
});

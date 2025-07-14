// cypress/e2e/lanes-sum.spec.ts

import { CameraPrograms } from "../support/enums/camera-programs.enum";
import { preLoginIntercepts } from "../support/intercepts/pre-login";
import { LanesSumHelper } from "../support/helpers/lanes-sum-helper";

// Test data constants for better maintainability
const TEST_DATA = {
  program: CameraPrograms.VT1,
  tolerance: 0.1,
} as const;

describe("Check if the sum of values from each row corresponds with the value from the total row", () => {
  let helper: LanesSumHelper;

  beforeEach(() => {
    cy.log("Setting up test environment for lane sum validation");
    // Prevents unnecessary requests before login.
    preLoginIntercepts();
    cy.visit("/");
    cy.login();

    // Initialize helper with test data
    helper = new LanesSumHelper(TEST_DATA);
  });

  it("should validate if total value corresponds with row sums", () => {
    cy.log(
      `Starting lane sum validation test for program: ${TEST_DATA.program}`
    );

    // Arrange - Navigate to the test environment
    helper.navigateToKpiLanes();

    // Act & Assert - Validate row sum calculations
    helper.validateRowSumCalculation();
  });
});

// cypress/e2e/lanes-sum.spec.ts

import { CameraPrograms } from "../support/enums/camera-programs.enum";
import { preLoginIntercepts } from "../support/intercepts/pre-login";
import { LanesSumHelper } from "../support/helpers/lanes-sum-helper";
import { ILanesSumTestData } from "../support/interfaces";

// Test data constants for better maintainability
const TEST_DATA: ILanesSumTestData = {
  program: CameraPrograms.VT1,
  tolerance: 0.1,
  description: "Test lane sum validation with 0.1% tolerance",
} as const;

describe("Lane Sum Validation", () => {
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

  describe("Row vs Total Validation", () => {
    it("should validate that total values match row sums", () => {
      cy.log(
        `Starting lane sum validation test for program: ${TEST_DATA.program}`
      );

      // Arrange - Navigate to the test environment
      helper.navigateToKpiLanes();

      // Act & Assert - Validate row sum calculations
      helper.validateRowSumCalculation();
    });
  });
});

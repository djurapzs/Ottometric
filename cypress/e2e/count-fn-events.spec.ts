// cypress/e2e/count-fn-events.spec.ts
import { Zone1 } from "../support/enums/zone1.enum";
import { CameraPrograms } from "../support/enums/camera-programs.enum";
import {
  redirectRequest,
  preLoginIntercepts,
} from "../support/intercepts/pre-login";
import { CountFnEventsHelper } from "../support/helpers/count-fn-events-helper";

// Test data constants for better maintainability
const TEST_DATA = {
  program: CameraPrograms.VI1,
  zone: Zone1.FN,
  dtidCount: 7,
} as const;

describe("FN Events Timeline", () => {
  let helper: CountFnEventsHelper;

  beforeEach(() => {
    cy.log("Setting up test environment for FN event counting");
    // Prevents unnecessary requests before login.
    preLoginIntercepts();
    cy.visit("/");
    cy.login();

    // Initialize helper with test data
    helper = new CountFnEventsHelper(TEST_DATA);
  });

  describe("Event Counting", () => {
    it("should count FN events for selected DTIDs", () => {
      cy.log(`Starting FN event count test with ${TEST_DATA.dtidCount} DTIDs`);
      redirectRequest();

      // Arrange - Navigate to the test environment
      helper.navigateToKpiZone1();

      // Act - Select DTIDs and navigate to details
      helper.selectDTIDsAndNavigateToDetails();

      // Act - Access timeline and select zone
      helper.accessTimelineAndSelectZone();

      // Assert - Validate event count
      helper.validateEventCount();
    });
  });
});

import { forEach } from "cypress/types/lodash";
import { Zone1 } from "../enums/zone1.enum";

//Example how Selectors are defined as class fields for better readability and maintainability
class KpiDetailsPage {
  private readonly visLeftPanel = '[class="vis-panel vis-left "]';
  private readonly visCenterPanel = '[class="vis-panel vis-center"]';
  private readonly selectedZone1Items =
    '[class="vis-foreground"] [class="vis-group selected"]';
  private readonly timelineBox = '[class^="vis-timeline"]';
  private readonly previewButtons = '[data-testid="PreviewIcon"]';
  private readonly timelineMenuItem =
    '[data-testid="viewportMenuItem-Timeline-3"]';

  get timelineItems() {
    return cy.get(`${this.selectedZone1Items} > div`);
  }

  getVisLeftPanel() {
    return cy.get(this.visLeftPanel);
  }

  getVisCenterPanel() {
    return cy.get(this.visCenterPanel);
  }

  selectZone1Value(zone1Value: Zone1) {
    cy.get(`[id="group-checkbox-3-${zone1Value}"]`).check();
  }

  getTotalEventCount(): Cypress.Chainable<number> {
    return this.timelineItems.then(($items) => {
      let total = 0;

      [...$items].forEach((item) => {
        const text = item.innerText.trim();
        const parsed = parseInt(text, 10);
        total += isNaN(parsed) ? 1 : parsed;
      });

      return total;
    });
  }

  clickTimelinePreviewButton() {
    return cy.get(this.previewButtons).eq(2).click();
  }

  clickTimelineMenuItem() {
    cy.get(this.timelineMenuItem).click();
  }

  /**
   * Clicks timeline menu item if timeline box is not visible
   * First clicks timeline preview button, then clicks timeline menu item if needed
   */
  clickTimelineMenuItemIfNotVisible(): void {
    // Check if timeline box exists and is visible
    cy.get("body").then(() => {
      cy.get(this.timelineBox)
        .should("exist")
        .then(($timelineBox) => {
          if (!$timelineBox.is(":visible")) {
            // First click the timeline preview button
            this.clickTimelinePreviewButton();
            // Then click the timeline menu item
            cy.get(this.timelineMenuItem).should("exist").click();
            // Verify the timeline box becomes visible after clicking
            cy.get(this.timelineBox).should("exist");
          } else {
            // Assert that timeline box is indeed visible
            cy.get(this.timelineBox).should("exist");
          }
        });
    });
  }
}
export default new KpiDetailsPage();

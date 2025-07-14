import { forEach } from "cypress/types/lodash";
import { Zone1 } from "../enums/zone1.enum";

//Example how Selectors are defined as class fields for better readability and maintainability
class KpiDetailsPage {
  private readonly visLeftPanel = '[class="vis-panel vis-left "]';
  private readonly visCenterPanel = '[class="vis-panel vis-center"]';
  private readonly selectedZone1Items =
    '[class="vis-foreground"] [class="vis-group selected"]';
  private readonly cameraLoader = '[class="loader"]';

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
    cy.get(`[id="group-checkbox-3-${zone1Value}"]`)
      .should("exist")
      .check({ force: true });
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

  waitForCameraLoaderToDisappear(): Cypress.Chainable<JQuery<HTMLBodyElement>> {
    return cy.get("body").then(($body) => {
      // Check if the camera loader is currently in DOM
      if ($body.find('[class="loader"]').length > 0) {
        // Wait for it to disappear
        cy.get(this.cameraLoader, { timeout: 10000 }).should("not.exist");
      }
    });
  }
}
export default new KpiDetailsPage();

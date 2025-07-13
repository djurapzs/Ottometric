import { forEach } from "cypress/types/lodash";
import { Zone1 } from "../enums/zone1.enum";

//Example how Selectors are defined as class fields for better readability and maintainability
class KpiDetailsPage {
  private readonly visLeftPanel = '[class="vis-panel vis-left "]';
  private readonly visCenterPanel = '[class="vis-panel vis-center"]';
  private readonly selectedZone1Items =
    '[class="vis-foreground"] [class="vis-group selected"]';

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
    cy.get(`[id="group-checkbox-3-${zone1Value}"]`).should('be.visible').check({ force: true });
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
}
export default new KpiDetailsPage();

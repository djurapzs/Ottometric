import { CameraPrograms } from "../enums/camera-programs.enum";
import { Zone1 } from "../enums/zone1.enum";
import { followRedirectionAndVisit } from "./handle-redirection-helper";
import kpiDetailsPage from "../pages/kpi-details-page";
import tablePage from "../pages/table-page";
import { ICountFnEventsTestData, IEventCountingHelper } from "../interfaces";

export class CountFnEventsHelper implements IEventCountingHelper {
  constructor(public readonly testData: ICountFnEventsTestData) {}

  navigateToKpiZone(): void {
    cy.log(`Selecting program: ${this.testData.program}`);
    cy.selectProgram(this.testData.program);

    cy.log("Navigating to KPI Zone1");
    cy.goToKpiZone1();
    tablePage.waitForTableToLoad();
  }

  selectItemsAndNavigateToDetails(): void {
    cy.log(`Selecting ${this.testData.dtidCount} DTIDs from table`);
    // Select the DTIDs for which we want to count the FN events (from 1 to N).
    tablePage.DTIDmultiSelect(this.testData.dtidCount);
    tablePage.clickSeeDetailsButton();

    cy.log("Handling redirection to details page");
    // Keeps cypress from failing due to a redirection (keeps him in same tab).
    followRedirectionAndVisit("VI1", "zone1");
  }

  accessTimelineAndSelectZone(): void {
    cy.log("Accessing timeline view");
    kpiDetailsPage.clickTimelineMenuItemIfNotVisible();

    cy.log(`Selecting zone: ${this.testData.zone}`);
    kpiDetailsPage.selectZone1Value(this.testData.zone as Zone1);
  }

  validateEventCount(): void {
    cy.log("Retrieving and validating FN event count");
    // Result is displayed in dev tools console within the runner.
    kpiDetailsPage.getTotalEventCount().then((count) => {
      cy.log(`Total FN events count: ${count}`);
      expect(count).to.be.greaterThan(0);
    });
  }
}

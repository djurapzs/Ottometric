import { assertTotalIsValid } from "../assertations/assert-total-is-valid";
import {
  calculateColumnAverages,
  getFooterValues,
} from "./calculate-column-average";
import tablePage from "../pages/table-page";
import { ILanesSumTestData, ILanesSumHelper } from "../interfaces";

export class LanesSumHelper implements ILanesSumHelper {
  constructor(public readonly testData: ILanesSumTestData) {}

  navigateToKpiLanes(): void {
    cy.log(`Selecting program: ${this.testData.program}`);
    cy.selectProgram(this.testData.program);

    cy.log("Navigating to KPI Lanes");
    cy.goToKpiLanes();
    tablePage.waitForTableToLoad();
  }

  validateRowSumCalculation(): void {
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
  }
}

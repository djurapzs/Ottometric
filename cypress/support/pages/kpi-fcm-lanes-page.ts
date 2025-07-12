// cypress/support/pages/LanesPage.ts

/**
 * Page Object Model for the "Lanes" report page under KPI Sensor → FCM
 * Handles the two-part table layout: left (identifiers) and center (numeric data)
 */
class LanesPage {
  /** Filters toggle button in the header */
  get filtersButton() {
    return cy.get('[data-testid="FilterAltOutlinedIcon"]');
  }

  /** "See details" button (enabled when rows are selected) */
  get seeDetailsButton() {
    return cy.get('[data-testid="sendToDetails"]');
  }

  /** Left-portion table (identifiers) */
  get leftTable() {
    return cy.get('[data-testid="table-left"]');
  }

  /** Center-portion table (numeric data) */
  get centerTable() {
    return cy.get('[data-testid="table-center"]');
  }

  /** All header cells in the numeric (center) table */
  get centerHeaderCells() {
    return this.centerTable.find("thead th");
  }

  /** All data rows in the numeric (center) table */
  get centerBodyRows() {
    return this.centerTable.find("tbody tr");
  }

  /** Footer row (totals) in the numeric (center) table */
  get centerTotalRow() {
    return this.centerTable.find("tfoot tr");
  }
}
export default new LanesPage();

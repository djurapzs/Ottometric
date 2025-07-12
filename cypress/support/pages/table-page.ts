class TablePage {
  /** Top-right: Download dropdown/button */
  get downloadButton() {
    return cy.get('[data-testid="download-pdf-csv"]');
  }

  /** Top-right: Table settings dropdown/button */
  get tableSettingsButton() {
    return cy.get('[data-testid="table-settings"');
  }

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

  /**
   * Get all cells from a given numeric column index (zero-based)
   * @param columnIndex zero-based column index
   */
  getCenterColumnCells(columnIndex: number) {
    return this.centerBodyRows.find(`td:nth-child(${columnIndex + 1})`);
  }

  getCenterTotalCell(
    columnIndex: number
  ): Cypress.Chainable<JQuery<HTMLTableCellElement>> {
    return this.centerTotalRow.find("td").eq(columnIndex);
  }

  rowCount(): Cypress.Chainable<number> {
    return this.centerBodyRows.its("length");
  }

  clickDownload(): void {
    this.downloadButton.click();
  }

  openTableSettings(): void {
    this.tableSettingsButton.click();
  }
}

export default new TablePage();

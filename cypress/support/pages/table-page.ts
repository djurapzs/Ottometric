class TablePage {
  get downloadButton() {
    return cy.get('[data-testid="download-pdf-csv"]');
  }

  get tableSettingsButton() {
    return cy.get('[data-testid="table-settings"');
  }

  get filtersButton() {
    return cy.get('[data-testid="FilterAltOutlinedIcon"]');
  }
  get seeDetailsButton() {
    return cy.get('[data-testid="sendToDetails"]');
  }

  get leftTable() {
    return cy.get('[data-testid="table-left"]');
  }
  get centerTable() {
    return cy.get('[data-testid="table-center"]');
  }

  get centerHeaderCells() {
    return this.centerTable.find("thead th");
  }

  get centerBodyRows() {
    return this.centerTable.find("tbody tr");
  }

  get centerTotalRow() {
    return this.centerTable.find("tfoot tr");
  }

  DTIDmultiSelect(checksNumber: number) {
    this.centerTable.get('input[type="checkbox"]').each(($el, index) => {
      if (index < checksNumber) {
        cy.wrap($el).check();
      }
    });
  }

  /**
   * Get all cells from a given numeric column index (zero-based)
   * @param columnIndex zero-based column index
   */
  getCenterColumnCells(columnIndex: number) {
    return this.centerBodyRows
      .should("be.visible")
      .find(`td:nth-child(${columnIndex + 1})`);
  }

  getCenterTotalCell(
    columnIndex: number
  ): Cypress.Chainable<JQuery<HTMLTableCellElement>> {
    return this.centerTotalRow.should("be.visible").find("td").eq(columnIndex);
  }

  rowCount(): Cypress.Chainable<number> {
    return this.centerBodyRows.should("be.visible").its("length");
  }

  clickDownload(): void {
    this.downloadButton.click();
  }

  openTableSettings(): void {
    this.tableSettingsButton.click();
  }
}

export default new TablePage();

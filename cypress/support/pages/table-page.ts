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

  /**
   * Selects multiple checkboxes in the table
   * @param checksNumber Number of checkboxes to select
   */
  DTIDmultiSelect(checksNumber: number) {
    cy.log(`Selecting ${checksNumber} checkboxes`);

    // Ensure table is ready before interaction
    this.ensureTableReady();

    this.centerTable.get('input[type="checkbox"]').each(($el, index) => {
      if (index < checksNumber) {
        cy.wait(500);
        cy.wrap($el).check();
      }
    });

    cy.log(`Successfully selected ${checksNumber} checkboxes`);
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

  clickSeeDetailsButton(): void {
    this.seeDetailsButton.should("be.enabled").click();
  }

  /**
   * Waits for the table to load and become interactive
   * Uses a flexible approach that handles various loading states
   */
  waitForTableToLoad(): void {
    // First, wait for the table element to exist in DOM
    this.centerTable.should("exist");

    // Then wait for it to have content (rows)
    this.centerBodyRows.should("have.length.greaterThan", 0);

    // Optionally check visibility, but don't fail if it's not immediately visible
    // This handles cases where table might be rendered but not in viewport
    cy.get('[data-testid="table-center"]').then(($table) => {
      if (!$table.is(":visible")) {
        cy.log("Table not visible, scrolling into view...");
        cy.wrap($table).scrollIntoView();
      }
    });

    // Wait for any potential dynamic content to settle
    cy.wait(500);
  }

  /**
   * Ensures table is ready for interaction
   * More robust than hard visibility assertion
   */
  ensureTableReady(): void {
    this.centerTable.should("exist");
    this.centerBodyRows.should("have.length.greaterThan", 0);

    // Check if table has checkboxes before proceeding
    this.centerTable
      .get('[type="checkbox"]')
      .should("have.length.greaterThan", 0);
  }
}

export default new TablePage();

class TablePage {
  private readonly downloadButtonSelector = '[data-testid="download-pdf-csv"]';
  private readonly tableSettingsButtonSelector = '[data-testid="table-settings"';
  private readonly filtersButtonSelector = '[data-testid="FilterAltOutlinedIcon"]';
  private readonly seeDetailsButtonSelector = '[data-testid="sendToDetails"]';
  private readonly leftTableSelector = '[data-testid="table-left"]';
  private readonly centerTableSelector = '[data-testid="table-center"]';

  get downloadButton() {
    return cy.get(this.downloadButtonSelector);
  }

  get tableSettingsButton() {
    return cy.get(this.tableSettingsButtonSelector);
  }

  get filtersButton() {
    return cy.get(this.filtersButtonSelector);
  }
  
  get seeDetailsButton() {
    return cy.get(this.seeDetailsButtonSelector);
  }

  get leftTable() {
    return cy.get(this.leftTableSelector);
  }
  
  get centerTable() {
    return cy.get(this.centerTableSelector);
  }

  get centerHeaderCells() {
    return cy.get(this.centerTableSelector).find("thead th");
  }

  get centerBodyRows() {
    return cy.get(this.centerTableSelector).find("tbody tr");
  }

  get centerTotalRow() {
    return cy.get(this.centerTableSelector).find("tfoot tr");
  }

  /**
   * Selects multiple checkboxes in the table
   * @param checksNumber Number of checkboxes to select
   */
  DTIDmultiSelect(checksNumber: number) {
    cy.log(`Selecting ${checksNumber} checkboxes`);

    // Ensure table is ready before interaction
    this.ensureTableReady();

    cy.get(this.centerTableSelector).get('input[type="checkbox"]').each(($el, index) => {
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
    return cy.get(this.centerTableSelector).find("tbody tr").find(`td:nth-child(${columnIndex + 1})`);
  }

  getCenterTotalCell(
    columnIndex: number
  ): Cypress.Chainable<JQuery<HTMLTableCellElement>> {
    return cy.get(this.centerTableSelector).find("tfoot tr").find("td").eq(columnIndex);
  }

  rowCount(): Cypress.Chainable<number> {
    return cy.get(this.centerTableSelector).find("tbody tr").its("length");
  }

  clickDownload(): void {
    cy.get(this.downloadButtonSelector).click();
  }

  openTableSettings(): void {
    cy.get(this.tableSettingsButtonSelector).click();
  }

  clickSeeDetailsButton(): void {
    cy.get(this.seeDetailsButtonSelector).should("be.enabled").click();
  }

  /**
   * Waits for the table to load and become interactive
   * Uses a flexible approach that handles various loading states
   */
  waitForTableToLoad(): void {
    // First, wait for the table element to exist in DOM
    cy.get(this.centerTableSelector).should("exist");

    // Then wait for it to have content (rows)
    cy.get(this.centerTableSelector).find("tbody tr").should("have.length.greaterThan", 0);

    // Optionally check visibility, but don't fail if it's not immediately visible
    // This handles cases where table might be rendered but not in viewport
    cy.get(this.centerTableSelector).then(($table) => {
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
    cy.get(this.centerTableSelector).should("exist");
    cy.get(this.centerTableSelector).find("tbody tr").should("have.length.greaterThan", 0);

    // Check if table has checkboxes before proceeding
    cy.get(this.centerTableSelector)
      .get('[type="checkbox"]')
      .should("have.length.greaterThan", 0);
  }
}

export default new TablePage();

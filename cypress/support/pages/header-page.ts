class HeaderPage {
  get programSelectDropdown() {
    return cy.get('[data-testid="program-picker-menu-select"]');
  }

  get programOptionsList() {
    return cy.get('[role="listbox"]');
  }

  get hilSelect() {
    return cy.get('[data-testid="hil-version-menu-select"]');
  }

  selectProgram(programName: string): void {
    cy.wrap(null).then(() => {
      this.programSelectDropdown.click();
    }).then(() => {
      cy.wait(1000); // Wait for dropdown to open
      this.programOptionsList.should("be.visible");
      this.programOptionsList
        .get(`[data-testid=${programName}]`)
        .click({ force: true })
        .wait(10000);
    });
  }
}

export default new HeaderPage();

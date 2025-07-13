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
    this.programSelectDropdown.click();
    this.programOptionsList.should("be.visible");
    this.programOptionsList
      .get(`[data-testid=${programName}]`)
      .click({ force: true });
  }
}

export default new HeaderPage();

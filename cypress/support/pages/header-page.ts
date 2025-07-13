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
    this.programOptionsList.contains("li", programName).click();
  }
}

export default new HeaderPage();

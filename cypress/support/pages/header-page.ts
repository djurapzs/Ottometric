class HeaderPage {
  /** Top: Program selector dropdown */
  get programSelectDropdown() {
    return cy.get('[data-testid="program-picker-menu-select"]');
  }

  /** The list that appears once you open the dropdown */
  get programOptionsList() {
    // MUI renders the menu as a <ul role="listbox"> appended to <body>
    return cy.get('[role="listbox"]');
  }

  /** Top: HIL selector dropdown */
  get hilSelect() {
    return cy.get('[data-testid="hil-version-menu-select"]');
  }

  /** Select a program by visible text */
  selectProgram(programName: string): void {
    this.programSelectDropdown.click();
    this.programOptionsList.contains("li", programName).click();
  }
}

export default new HeaderPage();

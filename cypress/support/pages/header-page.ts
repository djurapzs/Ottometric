class HeaderPage {
  private readonly programSelectDropdownSelector = '[data-testid="program-picker-menu-select"]';
  private readonly programOptionsListSelector = '[role="listbox"]';
  private readonly hilSelectSelector = '[data-testid="hil-version-menu-select"]';

  get programSelectDropdown() {
    return cy.get(this.programSelectDropdownSelector);
  }

  get programOptionsList() {
    return cy.get(this.programOptionsListSelector);
  }

  get hilSelect() {
    return cy.get(this.hilSelectSelector);
  }

  selectProgram(programName: string): void {
    cy.get(this.programSelectDropdownSelector).click();
    cy.get(this.programOptionsListSelector).contains("li", programName).click();
  }
}

export default new HeaderPage();

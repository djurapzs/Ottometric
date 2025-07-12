/**
 * Page Object Model for the OTTOMETRIC home/dashboard page
 * (displayed immediately after login)
 */
class HomePage {
  /** Top: Program selector dropdown */
  get programSelect() {
    return cy.get('[data-testid="program-picker-menu-select"]');
  }

  /** The list that appears once you open the dropdown */
  get programOptionsList() {
    // MUI renders the menu as a <ul role="listbox"> appended to <body>
    return cy.get('ul[role="listbox"]');
  }

  /** Top: HIL selector dropdown */
  get hilSelect() {
    return cy.get('[data-testid="hil-version-menu-select"]');
  }

  /** Top-left: Back arrow button, minimize side panel */
  get minimizeSidePanel() {
    return cy.get('[data-testid="ChevronRightOutlinedIcon"]');
  }

  /** Top-right: Download dropdown/button */
  get downloadButton() {
    return cy.get('[data-testid="download-pdf-csv"]');
  }

  /** Top-right: Table settings dropdown/button */
  get tableSettingsButton() {
    return cy.get('[data-testid="table-settings"');
  }

  /** Left nav: Dashboards menu item */
  get dashboardsTab() {
    return cy.get('[data-testid="Dashboards-drawer"]');
  }

  /** Left nav: Ingestion Report menu item */
  get ingestionReportTab() {
    return cy.get('[data-testid="Ingestion Report-drawer"]');
  }

  /** Left nav: KPI Sensor menu item */
  get kpiSensorTab() {
    return cy.get('[data-testid="KPI Sensor-drawer"]');
  }

  /** Left-nav: FCM sub-section under KPI Sensor */
  get fcmToggle() {
    return cy.get('[data-testid="FCM-drawer"]');
  }
  /** Left nav: Lanes sub-section under FCM */
  get lanesItem() {
    return cy.get('[data-testid="Lanes-drawer"]');
  }

  /** Left nav: SPR Gallery menu item */
  get sprGalleryTab() {
    return cy.get('[data-testid="SPR Gallery-drawer"]');
  }

  /** Left nav: NL Query menu item */
  get nlQueryTab() {
    return cy.get('[data-testid="NL Query-drawer"]');
  }

  /** Select a program by visible text */
  selectProgram(programName: string): void {
    this.programSelect.click();
    this.programOptionsList.contains("li", programName).click();
  }

  /** Navigate via left menu */
  goToDashboards(): void {
    this.dashboardsTab.click();
  }

  goToIngestionReport(): void {
    this.ingestionReportTab.click();
  }

  goToKpiSensor(): void {
    this.kpiSensorTab.click();
  }

  goToSprGallery(): void {
    this.sprGalleryTab.click();
  }

  goToNlQuery(): void {
    this.nlQueryTab.click();
  }

  /** Click general buttons */
  clickBack(): void {
    this.minimizeSidePanel.click();
  }

  clickDownload(): void {
    this.downloadButton.click();
  }

  openTableSettings(): void {
    this.tableSettingsButton.click();
  }
}

export default new HomePage();

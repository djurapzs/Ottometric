class SidePanelPage {
  private readonly minimizeSidePanelSelector = '[data-testid="ChevronRightOutlinedIcon"]';
  private readonly dashboardsTabSelector = '[data-testid="Dashboards-drawer"]';
  private readonly ingestionReportTabSelector = '[data-testid="Ingestion Report-drawer"]';
  private readonly kpiSensorTabSelector = '[data-testid="KPI Sensor-drawer"]';
  private readonly kpiFeatureTabSelector = '[data-testid="KPI Feature-drawer"]';
  private readonly fcmToggleSelector = '[data-testid="FCM-drawer"]';
  private readonly lanesItemSelector = '[data-testid="Lanes-drawer"]';
  private readonly nlQueryTabSelector = '[data-testid="NL Query-drawer"]';
  private readonly isaToggleSelector = '[data-testid="ISA-drawer"]';
  private readonly zone1ItemSelector = '[data-testid="Zone1-drawer"]';

  get minimizeSidePanel() {
    return cy.get(this.minimizeSidePanelSelector);
  }

  get dashboardsTab() {
    return cy.get(this.dashboardsTabSelector);
  }

  get ingestionReportTab() {
    return cy.get(this.ingestionReportTabSelector);
  }

  get kpiSensorTab() {
    return cy.get(this.kpiSensorTabSelector);
  }

  get kpiFeatureTab() {
    return cy.get(this.kpiFeatureTabSelector);
  }

  get fcmToggle() {
    return cy.get(this.fcmToggleSelector);
  }

  get lanesItem() {
    return cy.get(this.lanesItemSelector);
  }

  get nlQueryTab() {
    return cy.get(this.nlQueryTabSelector);
  }

  get isaToggle() {
    return cy.get(this.isaToggleSelector);
  }

  get zone1Item() {
    return cy.get(this.zone1ItemSelector);
  }

  /** Navigate via sidepanel */
  goToDashboards(): void {
    cy.get(this.dashboardsTabSelector).click();
  }

  goToIngestionReport(): void {
    cy.get(this.ingestionReportTabSelector).click();
  }

  goToKpiSensor(): void {
    cy.get(this.kpiSensorTabSelector).click();
  }

  goToKpiFeature(): void {
    cy.get(this.kpiFeatureTabSelector).click();
  }

  goToNlQuery(): void {
    cy.get(this.nlQueryTabSelector).click();
  }

  /** Click general buttons */
  clickBack(): void {
    cy.get(this.minimizeSidePanelSelector).click();
  }

  clickIsaToggle(): void {
    cy.get(this.isaToggleSelector).click();
  }

  clickZone1Item(): void {
    cy.get(this.zone1ItemSelector).click();
  }
}

export default new SidePanelPage();

class SidePanelPage {
  get minimizeSidePanel() {
    return cy.get('[data-testid="ChevronRightOutlinedIcon"]');
  }

  get dashboardsTab() {
    return cy.get('[data-testid="Dashboards-drawer"]');
  }

  get ingestionReportTab() {
    return cy.get('[data-testid="Ingestion Report-drawer"]');
  }

  get kpiSensorTab() {
    return cy.get('[data-testid="KPI Sensor-drawer"]');
  }

  get kpiFeatureTab() {
    return cy.get('[data-testid="KPI Feature-drawer"]');
  }

  get fcmToggle() {
    return cy.get('[data-testid="FCM-drawer"]');
  }

  get lanesItem() {
    return cy.get('[data-testid="Lanes-drawer"]');
  }

  get nlQueryTab() {
    return cy.get('[data-testid="NL Query-drawer"]');
  }

  get isaToggle() {
    return cy.get('[data-testid="ISA-drawer"]');
  }

  get zone1Item() {
    return cy.get('[data-testid="Zone1-drawer"]');
  }

  /** Navigate via sidepanel */
  goToDashboards(): void {
    this.dashboardsTab.click();
  }

  goToIngestionReport(): void {
    this.ingestionReportTab.click();
  }

  goToKpiSensor(): void {
    this.kpiSensorTab.click();
  }

  goToKpiFeature(): void {
    this.kpiFeatureTab.click();
  }

  goToNlQuery(): void {
    this.nlQueryTab.click();
  }

  /** Click general buttons */
  clickBack(): void {
    this.minimizeSidePanel.click();
  }

  clickIsaToggle(): void {
    this.isaToggle.click();
  }

  clickZone1Item(): void {
    this.zone1Item.click();
  }
}

export default new SidePanelPage();

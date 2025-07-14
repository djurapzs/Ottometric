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
    return cy.get('[data-testid="KPI Feature-drawer"]', { timeout: 10000 });
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
    this.kpiSensorTab.should("exist").click({ force: true });
  }

  goToLanes(): void {
    this.lanesItem.should("exist").click({ force: true });
  }

  goToKpiFeature(): void {
    this.kpiFeatureTab.should("exist").click({ force: true });
  }

  goToNlQuery(): void {
    this.nlQueryTab.click();
  }

  /** Click general buttons */
  clickBack(): void {
    this.minimizeSidePanel.click();
  }

  clickIsaToggle(): void {
    this.isaToggle.should("exist").click({ force: true });
  }

  clickZone1Item(): void {
    this.zone1Item.should("exist").click({ force: true });
  }

  clickFcmToggle(): void {
    this.fcmToggle.should("exist").click({ force: true });
  }
}

export default new SidePanelPage();

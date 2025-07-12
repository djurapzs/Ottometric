class SidePanelPage {
  /** Top-left: Back arrow button, minimize side panel */
  get minimizeSidePanel() {
    return cy.get('[data-testid="ChevronRightOutlinedIcon"]');
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

  get kpiFeatureTab() {
    return cy.get('[data-testid="KPI Feature-drawer"]');
  }

  /** Left-nav: FCM sub-section under KPI Sensor */
  get fcmToggle() {
    return cy.get('[data-testid="FCM-drawer"]');
  }
  /** Left nav: Lanes sub-section under FCM */
  get lanesItem() {
    return cy.get('[data-testid="Lanes-drawer"]');
  }

  /** Left nav: NL Query menu item */
  get nlQueryTab() {
    return cy.get('[data-testid="NL Query-drawer"]');
  }

  get isaToggle() {
    return cy.get('[data-testid="ISA-drawer"]');
  }

  get zone1Item() {
    return cy.get('[data-testid="Zone1-drawer"]');
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

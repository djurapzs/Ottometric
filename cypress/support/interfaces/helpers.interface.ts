/**
 * Helper interfaces for test utilities and calculations
 */

// Interface for calculation helpers
export interface ICalculationHelper {
  calculateColumnAverages(
    table: Cypress.Chainable<JQuery<HTMLElement>>,
    footerValues: Cypress.Chainable<number[]>
  ): Cypress.Chainable<number[]>;

  getFooterValues(
    table: Cypress.Chainable<JQuery<HTMLElement>>
  ): Cypress.Chainable<number[]>;

  parsePercentage(text: string): number;
}

// Interface for event counting helper
export interface IEventCountingHelper {
  testData: ICountFnEventsTestData;
  navigateToKpiZone(): void;
  selectItemsAndNavigateToDetails(): void;
  accessTimelineAndSelectZone(): void;
  validateEventCount(): void;
}

// Interface for lanes sum helper
export interface ILanesSumHelper {
  testData: ILanesSumTestData;
  navigateToKpiLanes(): void;
  validateRowSumCalculation(): void;
}

// Import test data interfaces from test-data.interface.ts
import {
  ICountFnEventsTestData,
  ILanesSumTestData,
} from "./test-data.interface";

// Export specific interfaces needed by helpers
export { ICountFnEventsTestData, ILanesSumTestData };

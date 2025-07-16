/**
 * Core interfaces for test data and configuration
 */

// Specific test data interfaces
export interface ICountFnEventsTestData {
  program: string;
  zone: string;
  dtidCount: number;
  description?: string;
  timeout?: number;
}

export interface ILanesSumTestData {
  program: string;
  tolerance: number;
  description?: string;
  timeout?: number;
}

// Interface for assertion configuration
export interface IAssertionConfig {
  tolerance: number;
  message?: string;
  logDetails?: boolean;
}

// Interface for column calculation results
export interface IColumnCalculationResult {
  columnIndex: number;
  sum: number;
  count: number;
  average: number;
  footerValue: number;
}

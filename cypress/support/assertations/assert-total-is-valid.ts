/**
 * Assertion utility for validating numerical data accuracy in Cypress tests.
 *
 * This function compares arrays of expected vs actual numerical values using
 * configurable tolerance levels, making it ideal for testing calculated totals,
 * sums, and other numerical computations where exact matches aren't feasible
 * due to floating-point precision or rounding differences.
 *
 * @param expected - Array of expected numerical values
 * @param actual - Array of actual values to validate against expected
 * @param config - Configuration object with tolerance, message, and logging options
 */

import { IAssertionConfig } from "../interfaces";

export const assertTotalIsValid = (
  expected: number[],
  actual: number[],
  config: IAssertionConfig = { tolerance: 0.1 }
): void => {
  expect(expected.length).to.equal(
    actual.length,
    "Arrays should have the same length"
  );

  expected.forEach((value, index) => {
    const message =
      config.message ||
      `Expected actual[${index}] to be close to expected[${index}]`;

    expect(actual[index]).to.be.closeTo(value, config.tolerance, message);

    if (config.logDetails) {
      cy.log(
        `Column ${index}: Expected ${value}, Actual ${actual[index]}, Tolerance: ${config.tolerance}`
      );
    }
  });
};

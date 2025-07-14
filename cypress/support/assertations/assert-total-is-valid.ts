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

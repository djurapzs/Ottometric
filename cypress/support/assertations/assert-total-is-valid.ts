export const assertTotalIsValid = (expected: number[], actual: number[]) => {
  expect(expected.length).to.equal(
    actual.length,
    "Arrays should have the same length"
  );

  expected.forEach((value, index) => {
    expect(actual[index]).to.be.closeTo(
      value,
      0.1,
      `Expected actual[${index}] to be close to expected[${index}]`
    );
  });
};

# TypeScript Interfaces - Implementation Guide

This document explains the meaningful implementation of TypeScript interfaces in the Cypress E2E testing suite following professional QA practices.

## 🎯 Why These Interfaces?

The interfaces were implemented to achieve:

1. **Type Safety** - Catch errors at compile time instead of runtime
2. **Code Documentation** - Interfaces serve as living documentation
3. **Maintainability** - Changes to data structures are controlled and consistent
4. **Consistency** - Enforce consistent patterns across the codebase
5. **Scalability** - Easy to extend and add new functionality

## 📋 Interface Categories

### 1. Test Data Interfaces (`test-data.interface.ts`)

**Purpose**: Define the structure of test data objects and validation results.

```typescript
interface ICountFnEventsTestData {
  program: string;
  zone: string;
  dtidCount: number;
  description?: string;
  timeout?: number;
}

interface ILanesSumTestData {
  program: string;
  tolerance: number;
  description?: string;
  timeout?: number;
}

interface IAssertionConfig {
  tolerance: number;
  message?: string;
  logDetails?: boolean;
}

interface IColumnCalculationResult {
  columnIndex: number;
  sum: number;
  count: number;
  average: number;
  footerValue: number;
}
```

**Professional QA Benefits**:

- **Consistent test data structure** across all test cases
- **Type validation** prevents incorrect data types
- **Documentation** - self-documenting test data requirements
- **Refactoring safety** - changes to test data structure are enforced

### 2. Helper Interfaces (`helpers.interface.ts`)

**Purpose**: Define contracts for test helper classes and utility functions.

```typescript
interface ICalculationHelper {
  calculateColumnAverages(
    table: Cypress.Chainable<JQuery<HTMLElement>>,
    footerValues: Cypress.Chainable<number[]>
  ): Cypress.Chainable<number[]>;
  getFooterValues(
    table: Cypress.Chainable<JQuery<HTMLElement>>
  ): Cypress.Chainable<number[]>;
  parsePercentage(text: string): number;
}

interface IEventCountingHelper {
  testData: ICountFnEventsTestData;
  navigateToKpiZone(): void;
  selectItemsAndNavigateToDetails(): void;
  accessTimelineAndSelectZone(): void;
  validateEventCount(): void;
}

interface ILanesSumHelper {
  testData: ILanesSumTestData;
  navigateToKpiLanes(): void;
  validateRowSumCalculation(): void;
}
```

**Professional QA Benefits**:

- **Consistent helper patterns** - all helpers follow clear, specific method names
- **Type safety** - helpers are type-safe for their specific data
- **Method clarity** - each method name clearly describes its purpose
- **Reusability** - helpers can be easily composed and reused

## 🔧 Implementation Examples

### 1. Test Helper with Interface

```typescript
export class CountFnEventsHelper implements IEventCountingHelper {
  constructor(public readonly testData: ICountFnEventsTestData) {}

  navigateToKpiZone(): void {
    cy.log(`Selecting program: ${this.testData.program}`);
    cy.selectProgram(this.testData.program);
    cy.log("Navigating to KPI Zone1");
    cy.goToKpiZone1();
    tablePage.waitForTableToLoad();
  }

  selectItemsAndNavigateToDetails(): void {
    cy.log(`Selecting ${this.testData.dtidCount} DTIDs from table`);
    tablePage.DTIDmultiSelect(this.testData.dtidCount);
    tablePage.clickSeeDetailsButton();
    followRedirectionAndVisit("VI1", "zone1");
  }

  accessTimelineAndSelectZone(): void {
    cy.log("Accessing timeline view");
    kpiDetailsPage.clickTimelineMenuItemIfNotVisible();
    cy.log(`Selecting zone: ${this.testData.zone}`);
    kpiDetailsPage.selectZone1Value(this.testData.zone as Zone1);
  }

  validateEventCount(): void {
    cy.log("Retrieving and validating FN event count");
    kpiDetailsPage.getTotalEventCount().then((count) => {
      cy.log(`Total FN events count: ${count}`);
      expect(count).to.be.greaterThan(0);
    });
  }
}
```

**Benefits**:

- **Contract enforcement** - must implement all required methods
- **Type safety** - testData is strongly typed
- **Clear method names** - each method describes exactly what it does
- **Self-documenting** - interface shows what the helper does

### 2. Enhanced Assertions with Configuration

```typescript
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
```

**Benefits**:

- **Configurable assertions** - flexible tolerance and messaging
- **Type safety** - prevents incorrect parameter types
- **Default values** - sensible defaults while allowing customization
- **Documentation** - clear parameter expectations

### 3. Calculation Helper with Interface

```typescript
export class TableCalculationHelper implements ICalculationHelper {
  parsePercentage(text: string): number {
    return parseFloat(text.trim().replace("%", ""));
  }

  getFooterValues(
    table: Cypress.Chainable<JQuery<HTMLElement>>
  ): Cypress.Chainable<number[]> {
    const footerValues: number[] = [];
    return table
      .find("tr")
      .last()
      .find("td")
      .each(($td, index) => {
        const rawText = Cypress.$($td).text().trim();
        footerValues.push(this.parsePercentage(rawText));
      })
      .then(() => footerValues);
  }

  calculateColumnAverages(
    table: Cypress.Chainable<JQuery<HTMLElement>>,
    footerValues: Cypress.Chainable<number[]>
  ): Cypress.Chainable<number[]> {
    // Implementation with type safety
    const columnSums: number[] = [];
    const columnCounts: number[] = [];
    // ... calculation logic
    return footerValues.then((footerArr) => {
      // ... processing logic
      return columnSums.map((sum, index) => sum / columnCounts[index]);
    });
  }
}
```

**Benefits**:

- **Method signature enforcement** - prevents parameter mismatches
- **Return type safety** - ensures correct return types
- **Interface compliance** - must implement all required methods
- **Composability** - can be easily extended or replaced

## 🏆 Professional QA Best Practices Achieved

### 1. **Type Safety**

- Compile-time error detection
- Prevents runtime type errors
- IDE intellisense support
- Refactoring safety

### 2. **Code Documentation**

- Self-documenting code structure
- Clear parameter expectations
- Return type documentation
- Contract definitions

### 3. **Maintainability**

- Consistent patterns across codebase
- Easy to add new functionality
- Safe refactoring
- Clear separation of concerns

### 4. **Scalability**

- Easy to extend interfaces
- Composable helpers
- Reusable components
- Consistent API patterns

### 5. **Quality Assurance**

- Enforced coding standards
- Consistent test patterns
- Reliable test execution
- Predictable behavior

### 6. **Interface Naming Convention**

- **"I" prefix** for all interfaces following TypeScript best practices
- **Clear distinction** between interfaces and classes
- **Professional standard** widely adopted in the industry
- **Better IDE support** and autocomplete functionality

## 📁 Usage Examples

### In Test Specifications:

```typescript
const TEST_DATA: ICountFnEventsTestData = {
  program: CameraPrograms.VI1,
  zone: Zone1.FN,
  dtidCount: 7,
  description: "Test counting FN events in Zone1 for VI1 program",
};

describe("FN Events Timeline", () => {
  let helper: CountFnEventsHelper;

  beforeEach(() => {
    helper = new CountFnEventsHelper(TEST_DATA);
  });

  it("should count FN events for selected DTIDs", () => {
    cy.log(`Starting FN event count test with ${TEST_DATA.dtidCount} DTIDs`);
    redirectRequest();

    // Arrange - Navigate to the test environment
    helper.navigateToKpiZone();

    // Act - Select DTIDs and navigate to details
    helper.selectItemsAndNavigateToDetails();

    // Act - Access timeline and select zone
    helper.accessTimelineAndSelectZone();

    // Assert - Validate event count
    helper.validateEventCount();
  });
});
```

### In Helper Classes:

```typescript
export class LanesSumHelper implements ILanesSumHelper {
  constructor(public readonly testData: ILanesSumTestData) {}

  navigateToKpiLanes(): void {
    cy.log(`Selecting program: ${this.testData.program}`);
    cy.selectProgram(this.testData.program);
    cy.log("Navigating to KPI Lanes");
    cy.goToKpiLanes();
    tablePage.waitForTableToLoad();
  }

  validateRowSumCalculation(): void {
    cy.log("Extracting footer values from table");
    getFooterValues(tablePage.centerTable).then((footerValues) => {
      cy.log("Calculating column averages");
      calculateColumnAverages(
        tablePage.centerTable,
        cy.wrap(footerValues)
      ).then((averages) => {
        cy.log("Validating that totals match row sums");
        assertTotalIsValid(footerValues, averages);
      });
    });
  }
}
```

### In Assertion Utilities:

```typescript
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
```

## 📊 Summary

The implementation of these interfaces transforms the test suite from a collection of loosely coupled files into a well-structured, type-safe, and maintainable testing framework. This follows enterprise-level QA practices and ensures the test suite can scale and evolve reliably.

The interfaces provide:

- **Clear contracts** for all components
- **Type safety** throughout the codebase
- **Consistent patterns** that are easy to follow
- **Documentation** that stays in sync with code
- **Scalability** for future enhancements
- **Maintainability** for long-term success

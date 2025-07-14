# Ottometric - Cypress E2E Testing Suite

Professional end-to-end testing suite for the Ottometric application using Cypress with TypeScript, following QA best practices and maintainable code structure.

## Prerequisites

- Node.js ≥ 14
- npm package manager
- Running instance of the Ottometric application

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the project root:

   ```env
   BASE_URL=https://your-app-url.com
   CYPRESS_user=your-test-username
   CYPRESS_pass=your-test-password
   ```

## Running Tests

### Interactive Mode (Test Runner)

```bash
npm run cypress:open
```

### Headless Mode (Command Line)

```bash
npm run cypress:run
```

## Test Architecture

The test suite follows professional QA practices with a clean, maintainable architecture:

### Directory Structure

```
cypress/
├── e2e/                          # Test specifications
│   ├── count-fn-events.spec.ts   # Event counting tests
│   └── lanes-sum.spec.ts         # Lane summation tests
├── support/
│   ├── interfaces/               # TypeScript interfaces
│   │   ├── test-data.interface.ts    # Test data types
│   │   ├── helpers.interface.ts      # Helper class interfaces
│   │   ├── config.interface.ts       # Configuration types (future use)
│   │   ├── page-objects.interface.ts # Page object types (future use)
│   │   ├── index.ts                  # Central export point
│   │   └── README.md                 # Interface documentation
│   ├── pages/                    # Page Object Model classes
│   ├── helpers/                  # Test utility classes
│   ├── assertations/             # Custom assertion utilities
│   ├── intercepts/               # Network request mocking
│   └── commands.ts               # Custom Cypress commands
└── fixtures/                     # Test data files
```

### Key Design Principles

- **Page Object Model**: Encapsulates page interactions and selectors
- **Interface-Driven Development**: All interfaces use "I" prefix convention
- **Modular Architecture**: Separated concerns with dedicated helper classes
- **Type Safety**: Full TypeScript support with proper interface definitions
- **Clean Code**: Minimal, focused interfaces with clear naming

## Interface System

The test suite uses a comprehensive TypeScript interface system:

### Core Interfaces

- `ICountFnEventsTestData` - Test data for event counting tests
- `ILanesSumTestData` - Test data for lane summation tests
- `IAssertionConfig` - Configuration for custom assertions
- `IColumnCalculationResult` - Results from column calculations

### Helper Interfaces

- `IEventCountingHelper` - Interface for event counting utilities
- `ILanesSumHelper` - Interface for lane summation utilities
- `ICalculationHelper` - Interface for mathematical calculations

### Import Usage

```typescript
// Import specific interfaces
import { ICountFnEventsTestData, ILanesSumTestData } from '../support/interfaces';

// Or import all interfaces
import * from '../support/interfaces';
```

## Available Tests

- **Event counting tests** (`count-fn-events.spec.ts`) - Validates FN event counting functionality
- **Lane summation tests** (`lanes-sum.spec.ts`) - Validates lane data summation and calculations

## Code Quality Standards

- **TypeScript**: Full type safety with strict compilation
- **Clean Architecture**: Separated concerns and single responsibility
- **Interface Conventions**: "I" prefix for all interface names
- **Documentation**: Comprehensive inline and README documentation
- **Maintainability**: Minimal, focused code with clear naming

## Important Notes

- The `.env` file contains sensitive credentials and should never be committed to version control
- Ensure the target application is running and accessible before running tests
- Tests use network request mocking for better isolation and reliability
- All interfaces follow the "I" prefix naming convention for consistency
- Only actively used interfaces are maintained in the codebase

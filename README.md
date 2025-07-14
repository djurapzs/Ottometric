# Ottometric - Cypress E2E Testing Suite

End-to-end testing suite for the Ottometric application using Cypress with TypeScript.

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

## Test Structure

The test suite is organized using the Page Object Model pattern:

- **Tests**: `cypress/e2e/` - Main test specifications
- **Page Objects**: `cypress/support/pages/` - Page interaction classes
- **Helpers**: `cypress/support/helpers/` - Reusable test utilities
- **Fixtures**: `cypress/fixtures/` - Test data

## Available Tests

- **Event counting tests** (`count-fn-events.spec.ts`) - Tests FN event counting functionality
- **Lane summation tests** (`lanes-sum.spec.ts`) - Tests lane data summation and calculations

## Important Notes

- The `.env` file contains sensitive credentials and should never be committed to version control
- Ensure the target application is running and accessible before running tests
- Tests use network request mocking for better isolation and reliability

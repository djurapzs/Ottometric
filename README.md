# Ottometric - Cypress E2E Testing Suite

A comprehensive end-to-end testing suite for the Ottometric application using Cypress with TypeScript.

## 🏗️ Project Structure

```
cypress/
├── e2e/                    # Test specifications
│   ├── count-fn-events.spec.ts
│   └── lanes-sum.spec.ts
├── fixtures/               # Test data
│   └── pre-login.json
└── support/               # Support files and utilities
    ├── commands.ts        # Custom Cypress commands
    ├── e2e.js            # Global test configuration
    ├── assertations/     # Custom assertion helpers
    ├── enums/           # Test data enums
    ├── helpers/         # Utility functions
    ├── intercepts/      # HTTP intercept configurations
    ├── interfaces/      # TypeScript interfaces
    └── pages/          # Page Object Model classes
```

## 🚀 Prerequisites

- **Node.js** ≥ 14
- **npm** package manager
- A running instance of the Ottometric application

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Ottometric
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:

   ```env
   BASE_URL=https://your-app-url.com
   CYPRESS_user=your-test-username
   CYPRESS_pass=your-test-password
   ```

## 🧪 Running Tests

### Interactive Mode (Cypress Test Runner)

```bash
npm run cypress:open
# or
npx cypress open
```

### Headless Mode (CI/CD)

```bash
npm run cypress:run
# or
npx cypress run
```

## 🔧 Key Features

### 📡 HTTP Intercepts

- **Pre-login intercepts**: Block external services (PostHog, Sentry) and mock API responses
- **Redirect handling**: Monitor and control navigation flows
- **Network isolation**: Ensure tests run without external dependencies

### 📄 Page Object Model

Organized page classes for maintainable test code:

- `LoginPage` - Authentication flows
- `HeaderPage` - Navigation and header interactions
- `TablePage` - Data table operations
- `KpiDetailsPage` - KPI-specific functionality
- `SidePanelPage` - Side panel interactions

### 🎯 Custom Assertions

- Total validation helpers
- Data consistency checks
- Custom assertion utilities

### 📊 Test Categories

- **Event counting tests** (`count-fn-events.spec.ts`)
- **Lane summation tests** (`lanes-sum.spec.ts`)

## 🔒 Security & Best Practices

- ✅ Environment variables for sensitive data
- ✅ Git-ignored credentials and outputs
- ✅ TypeScript for type safety
- ✅ Organized test structure with Page Object Model
- ✅ Network request mocking for test isolation

## 📝 Configuration

### Cypress Configuration (`cypress.config.js`)

- Base URL from environment variables
- Custom command timeout: 10 seconds
- Video recording disabled for faster execution
- TypeScript support enabled

### TypeScript Configuration (`tsconfig.json`)

- ES2020 target with CommonJS modules
- Strict mode enabled
- Cypress and Node.js types included

## 🚨 Important Notes

> **Security**: The `.env` file contains sensitive credentials and should never be committed to version control. It's already included in `.gitignore`.

> **Dependencies**: Ensure the target application is running and accessible via the configured `BASE_URL` before running tests.

## 🤝 Contributing

1. Follow the existing project structure
2. Add new page objects for new application areas
3. Use the established intercept patterns for API mocking
4. Write descriptive test names and comments
5. Maintain TypeScript strict mode compliance

## 📚 Documentation

- **Intercepts**: See `cypress/support/intercepts/` for HTTP request handling
- **Page Objects**: Check `cypress/support/pages/` for page interaction patterns
- **Helpers**: Utility functions in `cypress/support/helpers/`
- **Custom Commands**: Extended Cypress functionality in `cypress/support/commands.ts`

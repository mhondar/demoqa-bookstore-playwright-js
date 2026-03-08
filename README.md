# DemoQA Book Store – Playwright Automation Framework

## Overview

This repository contains a **test automation framework built with Playwright and JavaScript** to automate the **DemoQA Book Store application**.

The project is designed as a **learning and portfolio framework** focused on practicing automation architecture, test design, maintainability, and modern testing best practices.

The framework demonstrates how to design and implement scalable end-to-end tests using **Playwright Test Runner**, **Page Object Model**, reusable utilities, and organized test suites.

Application under test:
https://demoqa.com/books

---

## Project Goals

The main objectives of this project are:

- Practice building a **test automation framework from scratch**
- Apply **Page Object Model (POM)** design
- Design **maintainable and scalable test architecture**
- Implement **UI end-to-end tests**
- Implement **negative and positive test scenarios**
- Manage **test data and environment configuration**
- Generate **reports and debugging artifacts**
- Prepare the project for **CI/CD execution**

---

## Technology Stack

- **Playwright**
- **JavaScript (Node.js)**
- **Playwright Test Runner**
- **HTML Reporter**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Faker.js** - Test data generation
- **dotenv** - Environment variables
- **GitHub**

Optional additions planned:

- GitHub Actions CI

---

## Code Quality

This project uses both **ESLint** and **Prettier**.

### ESLint

ESLint is used to catch common JavaScript issues and enforce a small practical ruleset.

Current baseline:

- `prefer-const`
- `no-var`
- `eqeqeq`
- `no-unused-vars` as warning

Run:

```bash
npm run lint
npm run lint:fix
```

### Prettier

Prettier is used to standardize formatting across the project.

Run:

```bash
npm run format
npm run format:check
```

### Recommended workflow

Before pushing changes:

```bash
npm run quality
npm test
```

---

## Application Under Test

**DemoQA Book Store**

Main modules used in this project:

- Book Store
- Login
- User Profile
- Book Collection
- Book Details
- Search functionality

Website:
https://demoqa.com/books

---

## Framework Architecture

The framework follows a **modular structure** to keep tests maintainable and scalable.

Example structure:

```
demoqa-bookstore-playwright-js
│
├── config
│   ├── urls.js
│
├── tests
│   ├── auth
│   ├── bookstore
│   ├── profile
│   ├── security
│   └── regression
│
├── pages
│   ├── BasePage.js
│   ├── BookStorePage.js
│   ├── BookDetailPage.js
│   ├── LoginPage.js
│   ├── ProfilePage.js
│   └── SidebarNavigation.js
│
├── fixtures
│
├── test-data
│
├── utils
│
├── config
│
├── auth
│
├── playwright.config.js
└── package.json
```

Key architecture principles:

- Page Object Model for UI abstraction
- Separation between tests, pages, and utilities
- Reusable helpers
- Centralized configuration management
- Independent test cases
- Clear test suite organization

---

## Configuration

The framework uses centralized configuration files for better maintainability.

### URLs Configuration

All application URLs are centralized in `config/urls.js`:

```javascript
const { URLS } = require('../config/urls');

// Usage in tests
await page.goto(URLS.books);
await page.goto(URLS.login);
await page.goto(URLS.profile);
```

**Benefits:**

- Single source of truth for URLs
- Easy environment switching
- Consistent URL usage across tests
- Better maintainability

See `config/README.md` for detailed usage examples.

### Global Configuration

The global configuration is centralized in `config/global.js` and provides access to all test settings:

```javascript
const { config } = require('../config/global');

// Access URLs
await page.goto(config.urls.books);

// Access timeouts
await page.waitForTimeout(config.timeouts.action);

// Access browser settings
const { headless, viewport } = config.browser;

// Access test data
const user = config.testData.generateUser();

// Access environment settings
if (config.environment.isCI) {
  // CI-specific logic
}
```

**Configuration Categories:**

- **Timeouts**: Action, navigation, expect, and test timeouts
- **Browser**: Default browser, headless mode, viewport settings
- **Test Data**: Centralized test data generation utilities
- **Environment**: Environment name, CI detection, base URL
- **Execution**: Workers, retries, parallel execution settings
- **Media**: Screenshot, video, and trace collection settings

**Benefits:**

- Centralized configuration management
- Environment-aware settings
- Easy customization via environment variables
- Consistent settings across all tests

---

## Test Strategy

Tests are grouped by **functional areas** and **execution purpose**.

### Smoke Tests

Quick checks to verify that critical flows work:

- Application loads
- Book store page loads
- Basic search works
- Login works

### Functional Tests

#### Authentication

- Valid login
- Invalid login
- Empty credentials
- Logout

#### Book Store

- Book list loads
- Search books
- Navigate to book detail

#### User Profile

- Access authenticated profile
- Add book to collection
- Remove book from collection

### Negative Scenarios

- Invalid login attempts
- Empty fields
- Restricted actions without authentication

---

## Conventions

To maintain consistency and code quality across the project, a comprehensive set of conventions has been established.

This project follows strict standards for:

- **File naming** (PascalCase for pages, kebab-case for tests and files)
- **Test naming** (descriptive, readable test titles)
- **Branching strategy** (feature, fix, chore, docs branches)
- **Commit messages** (Conventional Commits format)
- **Language** (English across the entire project)

**See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed conventions and examples.**

These conventions ensure that the framework remains clean, professional, and maintainable as it grows.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/mhondar/demoqa-bookstore-playwright-js.git
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Development Tools

The project includes several development tools to maintain code quality and consistency.

### Code Quality

**Linting with ESLint:**

```bash
npm run lint          # Check code quality
npm run lint:fix      # Fix auto-fixable issues
```

**Formatting with Prettier:**

```bash
npm run format        # Format all code
npm run format:check  # Check if code is formatted
```

**Quality Check (combined):**

```bash
npm run quality       # Run linting and formatting checks
```

### Test Data Generation

The project uses **Faker.js** for generating test data. See `utils/testDataBuilder.js` for available methods:

```javascript
const TestDataBuilder = require('./utils/testDataBuilder');

// Generate user data
const user = TestDataBuilder.generateUser();

// Generate books
const books = TestDataBuilder.generateBooks(5);

// Get valid/invalid credentials
const validCreds = TestDataBuilder.getValidCredentials();
```

### Environment Configuration

Create a `.env` file based on `.env.example` to configure environment variables:

```bash
cp .env.example .env
```

Available environment variables:

- `BASE_URL` - Application base URL
- `TEST_ENV` - Test environment (local, staging, prod)
- `BROWSER` - Default browser (chromium, firefox, webkit)
- Test timeouts and other configurations

---

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

Run a specific test file:

```bash
npx playwright test tests/bookstore/book-search.spec.js
```

---

## Reports

After running tests, Playwright generates an **HTML report**.

Open the report with:

```bash
npx playwright show-report
```

The report includes:

- Test results
- Execution time
- Screenshots
- Traces (when enabled)

---

## Debugging

Playwright provides powerful debugging tools:

- Playwright UI mode
- Trace Viewer
- Screenshots on failure
- Video recordings
- Interactive debugging

Example:

```bash
npx playwright test --ui
```

---

## CI/CD (Planned)

The project will later include **GitHub Actions integration** to:

- Run tests automatically
- Generate reports
- Upload artifacts

---

## Future Improvements

Planned enhancements include:

- Cross-browser testing
- Data-driven testing
- Custom fixtures
- Service layer abstraction
- API testing
- Allure reporting integration

---

## Author

Automation framework created as a **learning and practice project for Playwright automation testing** by **Marisleydi Hondar Martinez**.

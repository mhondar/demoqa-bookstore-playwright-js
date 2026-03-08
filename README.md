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

* Practice building a **test automation framework from scratch**
* Apply **Page Object Model (POM)** design
* Design **maintainable and scalable test architecture**
* Implement **UI end-to-end tests**
* Implement **negative and positive test scenarios**
* Manage **test data and environment configuration**
* Generate **reports and debugging artifacts**
* Prepare the project for **CI/CD execution**

---

## Technology Stack

* **Playwright**
* **JavaScript (Node.js)**
* **Playwright Test Runner**
* **HTML Reporter**
* **GitHub**

Optional additions planned:

* ESLint
* Prettier
* Faker / test data generators
* GitHub Actions CI

---

## Application Under Test

**DemoQA Book Store**

Main modules used in this project:

* Book Store
* Login
* User Profile
* Book Collection
* Book Details
* Search functionality

Website:
https://demoqa.com/books

---

## Framework Architecture

The framework follows a **modular structure** to keep tests maintainable and scalable.

Example structure:

```
demoqa-bookstore-playwright-js
│
├── tests
│   ├── smoke
│   ├── auth
│   ├── bookstore
│   └── profile
│
├── pages
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── BookStorePage.js
│   ├── BookDetailPage.js
│   └── ProfilePage.js
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

* Page Object Model for UI abstraction
* Separation between tests, pages, and utilities
* Reusable helpers
* Independent test cases
* Clear test suite organization

---

## Test Strategy

Tests are grouped by **functional areas** and **execution purpose**.

### Smoke Tests

Quick checks to verify that critical flows work:

* Application loads
* Book store page loads
* Basic search works
* Login works

### Functional Tests

#### Authentication

* Valid login
* Invalid login
* Empty credentials
* Logout

#### Book Store

* Book list loads
* Search books
* Navigate to book detail

#### User Profile

* Access authenticated profile
* Add book to collection
* Remove book from collection

### Negative Scenarios

* Invalid login attempts
* Empty fields
* Restricted actions without authentication

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

* Test results
* Execution time
* Screenshots
* Traces (when enabled)

---

## Debugging

Playwright provides powerful debugging tools:

* Playwright UI mode
* Trace Viewer
* Screenshots on failure
* Video recordings
* Interactive debugging

Example:

```bash
npx playwright test --ui
```

---

## CI/CD (Planned)

The project will later include **GitHub Actions integration** to:

* Run tests automatically
* Generate reports
* Upload artifacts

---

## Future Improvements

Planned enhancements include:

* Cross-browser testing
* Data-driven testing
* Custom fixtures
* Service layer abstraction
* API testing
* Allure reporting integration

---

## Author

Automation framework created as a **learning and practice project for Playwright automation testing** by **Marisleydi Hondar Martinez**.

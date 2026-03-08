# Test Data Strategy

This directory contains the project's static test data and documents how user credentials and reference datasets should be handled.

## Define Test Users

Use JSON files for deterministic user references shared by multiple tests.

- `users.json` - Valid reusable users by role or feature.
- `invalid-users.json` - Negative login and validation scenarios.
- `books.json` - Stable book search data and expected book records.
- `test-scenarios.json` - Tags or suites such as smoke, critical, and regression.

Use static JSON when the same data must be reused and assertions depend on known values.

## Create Main Valid User

The primary login reference user is defined in `users.json` as `mainValidUser`.

This user is intended for:

- baseline login scenarios
- authenticated profile access
- logout flows
- any stable happy-path authentication coverage

Reference fields:

- `username`
- `password`
- `firstName`
- `lastName`
- `email`
- `role`

The same user is also preserved under `validUsers.standardUser` for backward compatibility.

## Define Invalid User Scenario

The primary negative login reference is defined in `invalid-users.json` as `mainInvalidUserScenario`.

This scenario represents:

- unknown username
- valid-looking password
- expected authentication failure message

Additional negative scenarios remain available under `invalidLoginScenarios`, including:

- wrong password
- wrong username
- empty username
- empty password
- empty credentials

## Document Required Credentials

The minimum required credential fields for the main valid user are:

- `TEST_USERNAME`
- `TEST_PASSWORD`
- `TEST_USER_FIRST_NAME`
- `TEST_USER_LAST_NAME`
- `TEST_USER_EMAIL`

The minimum required negative credential fields are:

- `INVALID_TEST_USERNAME`
- `INVALID_TEST_PASSWORD`

Only `username` and `password` are strictly required for most executable login tests.
The name and email fields are documented because they help keep profile, registration, and future seeded-user scenarios consistent.

## Define Credential Storage Strategy

Credentials should not be hardcoded in tests.

Use this source-of-truth order:

1. local `.env` for developer execution
2. CI secret variables for pipelines
3. `config/global.js` for centralized runtime access
4. `test-data/*.json` only for non-sensitive demo/reference data

Rules:

- real secrets stay only in local `.env` or CI secrets
- committed JSON files may only contain non-sensitive demo data
- tests should read credentials from config, not inline literals
- JSON should document reference users, not replace secret management

## Dynamic User Data

Use dynamic data for records that must be unique during execution.

Dynamic generation is handled in `utils/data-helpers.js`:

- `buildDynamicUser()` for unique positive users.
- `buildInvalidUser()` for malformed or incomplete user data.
- `uniqueId()` for collision-safe identifiers.

Use dynamic data for:

- registration-like flows
- unique emails/usernames
- temporary entities created during tests

## Search Data

Search data is centralized in `books.json` and is aligned with the current search coverage already designed in the test cases.

Covered datasets:

- `searchData.validSearchTerms` - valid exact-title and author searches
- `searchData.partialSearchTerms` - partial title filtering
- `searchData.invalidSearchTerms` - non-existing terms with no results expected
- `searchData.emptySearchTerms` - empty and whitespace inputs for reset/default-state behavior

Backward-compatible shortcuts remain available in `searchTerms` for current references used by existing documentation and future tests:

- `exactTitle`
- `partialTitle`
- `author`
- `noResults`
- `empty`
- `whitespace`

This structure keeps the dataset aligned with:

- exact search coverage
- partial search coverage
- invalid/no-result search coverage
- empty search and clear-search behavior

## Book Collection Data

Book collection data is also centralized in `books.json` to support controlled profile and collection-management scenarios.

Covered datasets:

- `collectionData.booksToAdd` - books intended for authenticated add-to-collection flows
- `collectionData.booksToRemove` - seeded books and datasets for single-delete and delete-all flows
- `collectionData.expectedInitialProfileState` - controlled authenticated profile states for seeded and empty collections

This structure covers:

- Books to add
- Books to remove
- Expected initial profile state

Recommended usage:

- use `booksToAdd.primaryAddBook` for baseline add-to-collection tests
- use `booksToRemove.singleRemoveBook` for row-level deletion flows
- use `booksToRemove.deleteAllBooks` for bulk deletion flows
- use `expectedInitialProfileState.seededCollection` when profile search or destructive actions need a known seeded state
- use `expectedInitialProfileState.emptyCollection` when validating empty profile behavior and safe delete controls

## Usage examples

```javascript
const users = require('../test-data/users.json');
const invalidUsers = require('../test-data/invalid-users.json');
const books = require('../test-data/books.json');
const { DataHelpers } = require('../utils');
const config = require('../config/global');

const validUser = users.mainValidUser;
const invalidScenario = invalidUsers.mainInvalidUserScenario;
const exactSearch = books.searchData.validSearchTerms.exactTitle;
const emptySearch = books.searchData.emptySearchTerms.emptyString;
const addBook = books.collectionData.booksToAdd.primaryAddBook;
const seededProfileState = books.collectionData.expectedInitialProfileState.seededCollection;
const dynamicUser = DataHelpers.buildDynamicUser();
const credentials = config.credentials.valid;
```

## Decision rule

- Use static JSON for stable, repeatable assertions and documented reference users.
- Use `books.json` search data for Book Store filtering scenarios.
- Use `books.json` collection data for controlled add/remove/profile-state scenarios.
- Use dynamic helpers for unique runtime entities.
- Use environment variables for credentials and sensitive values.

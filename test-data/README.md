# Test Data Strategy

This directory contains the project's static test data and documents how dynamic data should be handled.

## Static JSON test data

Use JSON files for deterministic inputs shared by multiple tests.

- `users.json` - Valid reusable users by role or feature.
- `invalid-users.json` - Negative login and validation scenarios.
- `books.json` - Stable book search terms and expected book records.
- `test-scenarios.json` - Tags or suites such as smoke, critical, and regression.

Use static JSON when the same data must be reused and assertions depend on known values.

## Dynamic user data

Use dynamic data for records that must be unique during execution.

Dynamic generation is handled in `utils/data-helpers.js`:

- `buildDynamicUser()` for unique positive users.
- `buildInvalidUser()` for malformed or incomplete user data.
- `uniqueId()` for collision-safe identifiers.

Use dynamic data for:

- registration-like flows
- unique emails/usernames
- temporary entities created during tests

## Credential management strategy

Credentials should not be hardcoded in tests.

Use environment variables defined in `.env` and documented in `.env.example`:

- `TEST_USERNAME`
- `TEST_PASSWORD`
- `INVALID_TEST_USERNAME`
- `INVALID_TEST_PASSWORD`

Centralized credential access is exposed in `config/global.js`.

Rules:

- real secrets stay only in local `.env` or CI secrets
- committed JSON files may only contain non-sensitive demo data
- tests should read credentials from config, not inline literals

## Invalid data scenarios

Store common negative cases in `invalid-users.json` so tests stay readable.

Covered patterns:

- wrong password
- wrong username
- empty username
- empty password
- empty credentials

Add more invalid datasets here for future validation cases such as:

- invalid email format
- password too short
- unsupported characters

## Usage examples

```javascript
const users = require('../test-data/users.json');
const invalidUsers = require('../test-data/invalid-users.json');
const { DataHelpers } = require('../utils');
const config = require('../config/global');

const validUser = users.validUsers.standardUser;
const invalidScenario = invalidUsers.invalidLoginScenarios.wrongPassword;
const dynamicUser = DataHelpers.buildDynamicUser();
const credentials = config.credentials.valid;
```

## Decision rule

- Use static JSON for stable, repeatable assertions.
- Use dynamic helpers for unique runtime entities.
- Use environment variables for credentials and sensitive values.
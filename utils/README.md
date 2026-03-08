# Utilities Layer

This directory contains reusable helpers that keep tests and page objects clean.

## Modules

- `testDataBuilder.js` - Base fake data factory using Faker.
- `navigation-helpers.js` - Shared navigation actions (`goToLogin`, `goToBooks`, etc.).
- `data-helpers.js` - Dynamic test data helpers (unique users/books, random values).
- `validation-helpers.js` - Common lightweight assertions.
- `logger.js` - Optional structured logging helper.
- `index.js` - Central exports for all utility modules.

## Design Rules

- Keep utilities generic and reusable.
- Avoid business-specific assertions in utility methods.
- Keep test scenario logic inside spec files.
- Keep page-specific logic inside page objects.

## Usage

```javascript
const {
	NavigationHelpers,
	DataHelpers,
	ValidationHelpers,
	Logger,
} = require('../utils');

const user = DataHelpers.buildDynamicUser();
Logger.info('Generated user', { username: user.username });

await NavigationHelpers.goToLogin(page);
await ValidationHelpers.expectUrlContains(page, 'login');
```

# Fixtures Directory

This directory contains reusable Playwright fixtures for the framework.

## Available Fixture

### `fixtures/auth.js`

Provides a real authentication fixture based on the current UI login flow.

Exports:

- `test`: extended Playwright test object
- `expect`: Playwright expect
- `loginAs(page, credentials?)`: reusable login helper

Available injected fixtures:

- `authenticatedPage`: a Playwright `page` already logged in with the configured valid user
- `authenticatedProfilePage`: a ready-to-use `ProfilePage` after successful login
- `authCredentials`: configurable credentials option, defaulting to `config.credentials.valid`

## Usage

```javascript
const { test, expect } = require('../../fixtures/auth');

test('authenticated user can access profile', async ({
  authenticatedPage,
  authenticatedProfilePage,
}) => {
  await expect(authenticatedProfilePage.usernameValue).toBeVisible();
  await expect(authenticatedPage).toHaveURL(/\/profile/);
});
```

## Override credentials

```javascript
const { test } = require('../../fixtures/auth');

test.use({
  authCredentials: {
    username: 'testuser',
    password: 'Test@123',
  },
});
```

## Notes

- The fixture uses the existing `LoginPage` and `ProfilePage` page objects.
- It is useful for tests that should start already authenticated.
- It avoids duplicating the login steps across specs.

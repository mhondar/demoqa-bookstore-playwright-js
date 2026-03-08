# Auth Directory

This directory is reserved for future authentication assets such as persisted session states or auth-specific helpers.

## Current implementation

The active reusable authentication fixture lives in `fixtures/auth.js`.

Use it like this:

```javascript
const { test } = require('../fixtures/auth');

test('authenticated user can open profile', async ({ authenticatedPage }) => {
	await authenticatedPage.goto('/profile');
});
```

## Why the fixture lives in `fixtures/`

- It matches Playwright's fixture extension pattern.
- It keeps reusable test context separate from page objects and raw test specs.
- It avoids misleading placeholder files in `auth/` that were not implemented.

## Security

- Never commit sensitive authentication data.
- Prefer environment variables for credentials.
- Avoid storing real session states in the repository.

# Auth Directory

This directory contains authentication helpers and session state management.

## Purpose

- Store authentication session states
- Manage login/logout workflows
- Handle authentication tokens
- Provide authenticated test fixtures

## Usage

```javascript
// Load saved session state
const authState = require('../auth/user-session.json');

// Use in test
test.use({ storageState: authState });

// Or create authenticated fixture
import { authenticatedPage } from '../auth/authFixtures';
```

## Files

- `user-session.json` - Saved browser session state
- `authHelpers.js` - Authentication utility functions
- `authFixtures.js` - Playwright fixtures for auth

## Security

- Never commit sensitive authentication data
- Use environment variables for credentials
- Store session states securely
- Rotate authentication tokens regularly

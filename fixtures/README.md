# Fixtures Directory

This directory contains test fixtures and setup utilities for Playwright tests.

## Purpose

Fixtures are used to:

- Set up test data and state
- Configure page objects
- Handle authentication
- Prepare test environment

## Usage

```javascript
import { test } from '@playwright/test';
import { authenticatedUser } from '../fixtures/auth';

test.describe('Authenticated Tests', () => {
  test.use({ storageState: authenticatedUser });

  test('should access protected page', async ({ page }) => {
    // Test code here
  });
});
```

## Common Fixtures

- Authentication fixtures
- Page object fixtures
- API client fixtures
- Database fixtures

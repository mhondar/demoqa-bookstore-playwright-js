# Test Data Directory

This directory contains static test data files used across the test suite.

## Structure

- `users.json` - User test data
- `books.json` - Book test data
- `api-responses.json` - Mock API responses
- `test-scenarios.json` - Test scenario configurations

## Usage

```javascript
const testUsers = require('../test-data/users.json');

test('should create user', async ({ page }) => {
  const user = testUsers.validUser;
  // Use user data in test
});
```

## Guidelines

- Store static data that doesn't change
- Use JSON format for structured data
- Keep sensitive data out of version control
- Document data structure and purpose
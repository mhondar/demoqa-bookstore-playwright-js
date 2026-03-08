# Pages Directory

This directory contains Page Object Model (POM) classes for the DemoQA Book Store application.

## Structure

- `BasePage.js` - Base page class with common functionality
- `LoginPage.js` - Login page object
- `BookStorePage.js` - Book store page object
- `BookDetailPage.js` - Book detail page object
- `ProfilePage.js` - User profile page object

## Usage

```javascript
const { LoginPage } = require('../pages/LoginPage');

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('username', 'password');
});
```

## Naming Convention

- Use PascalCase for page class names
- Follow the pattern: `PageName.js`
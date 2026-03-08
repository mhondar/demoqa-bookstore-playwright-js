# Pages Directory

This directory contains Page Object Model (POM) classes for the DemoQA Book Store application.

## POM Design Rules

### 1) Rules for creating Page Objects

- Create one class per screen/component with clear ownership.
- Use `PascalCase` for file/class names: `LoginPage.js`, `BookStorePage.js`.
- Keep constructors minimal: only store `page` and initialize locators.
- Use `BasePage` only for truly shared behavior (navigation, common waits).

### 2) What belongs inside a page class

- Page-specific locators.
- Reusable UI actions (clicks, typing, navigation, selecting).
- Small helper methods that model user behavior (example: `login()`, `searchBook()`).

Do not place test orchestration logic in page classes.

### 3) Separate locators from reusable actions

Use this internal structure in every page:

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.getByLabel('UserName');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('#name');
  }

  // Reusable actions
  async goTo() {
    await this.page.goto('/login');
  }

  async fillCredentials(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.fillCredentials(username, password);
    await this.submit();
  }
}
```

### 4) Avoid complex assertions inside POM

- Allowed in POM: lightweight state checks that return values (example: `getErrorText()`).
- Keep business assertions in `*.spec.js` files with `expect()`.
- Avoid `expect()` chains with multiple business rules inside page classes.

Example:

```javascript
// In page class
async getErrorText() {
  return this.errorMessage.textContent();
}

// In test
await expect(page).toHaveURL(/login/);
await expect(loginPage.errorMessage).toContainText('Invalid username or password!');
```

## Suggested Structure

- `BasePage.js` - Shared UI actions only.
- `LoginPage.js` - Login UI locators and login actions.
- `BookStorePage.js` - Search/filter/list actions.
- `BookDetailPage.js` - Book detail interactions.
- `ProfilePage.js` - Profile and collection interactions.

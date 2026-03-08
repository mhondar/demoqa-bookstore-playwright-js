const BasePage = require('./BasePage');
const { URLS } = require('../config/urls');
const { NavigationHelpers } = require('../utils');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.loginContainer = page.locator('.login-wrapper');
    this.userForm = page.locator('#userForm');
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.errorMessage = page.locator('#name');
  }

  async goTo() {
    await NavigationHelpers.goToLogin(this.page);
  }

  async waitForLoaded() {
    await this.waitForPageReady();
    await this.loginContainer.waitFor({ state: 'visible' });
    await this.userForm.waitFor({ state: 'visible' });
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
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

  async waitForErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
  }

  async getErrorMessageText() {
    return (await this.errorMessage.textContent())?.trim();
  }

  async getUsernameValidationMessage() {
    return this.usernameInput.evaluate(input => input.validationMessage);
  }

  async getPasswordValidationMessage() {
    return this.passwordInput.evaluate(input => input.validationMessage);
  }

  async isUsernameMarkedInvalid() {
    const className = await this.usernameInput.getAttribute('class');
    return className?.includes('is-invalid') || false;
  }

  async isPasswordMarkedInvalid() {
    const className = await this.passwordInput.getAttribute('class');
    return className?.includes('is-invalid') || false;
  }

  get loginPath() {
    return URLS.login;
  }
}

module.exports = LoginPage;

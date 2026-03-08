const BasePage = require('./BasePage');
const { URLS } = require('../config/urls');
const { NavigationHelpers } = require('../utils');

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);

    this.registrationContainer = page.locator('.register-wrapper');
    this.userForm = page.locator('#userForm');
    this.firstNameInput = page.locator('#firstname');
    this.lastNameInput = page.locator('#lastname');
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.registerButton = page.locator('#register');
    this.captchaElements = page.locator(
      'iframe[src*="recaptcha"], .g-recaptcha, #g-recaptcha, [id*="recaptcha"], [class*="recaptcha"]'
    );
    this.backToLoginButton = page.locator('button, a').filter({
      hasText: /^back to login$/i,
    });
  }

  async goTo() {
    await NavigationHelpers.goToRegister(this.page);
  }

  async waitForLoaded() {
    await this.waitForPageReady();
    await this.registrationContainer.waitFor({ state: 'visible' });
    await this.userForm.waitFor({ state: 'visible' });
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.lastNameInput.waitFor({ state: 'visible' });
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.registerButton.waitFor({ state: 'visible' });
  }

  async clickBackToLogin() {
    await this.backToLoginButton.click();
  }

  async fillRegistrationForm({ firstName, lastName, username, password }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submitRegistration() {
    await this.registerButton.click();
  }

  async register(user) {
    await this.fillRegistrationForm(user);
    await this.submitRegistration();
  }

  async isCaptchaPresent() {
    return (await this.captchaElements.count()) > 0;
  }

  get registerPath() {
    return URLS.register;
  }
}

module.exports = RegistrationPage;
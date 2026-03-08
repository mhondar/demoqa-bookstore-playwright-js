const { URLS } = require('../config/urls');

/**
 * Navigation helpers for reusable page routing patterns.
 */
class NavigationHelpers {
  static async goToHome(page) {
    await page.goto(URLS.home);
    await this.waitForPageReady(page);
  }

  static async goToLogin(page) {
    await page.goto(URLS.login);
    await this.waitForPageReady(page);
  }

  static async goToRegister(page) {
    await page.goto(URLS.register);
    await this.waitForPageReady(page);
  }

  static async goToBooks(page) {
    await page.goto(URLS.books);
    await this.waitForPageReady(page);
  }

  static async goToProfile(page) {
    await page.goto(URLS.profile);
    await this.waitForPageReady(page);
  }

  static async navigateTo(page, path) {
    await page.goto(path);
    await this.waitForPageReady(page);
  }

  static async waitForPageReady(page) {
    await page.waitForLoadState('domcontentloaded');
  }
}

module.exports = NavigationHelpers;

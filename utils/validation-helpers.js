const { expect } = require('@playwright/test');

/**
 * Common validation helpers to reduce assertion duplication in tests.
 */
class ValidationHelpers {
  static async expectVisible(locator, message) {
    await expect(locator, message).toBeVisible();
  }

  static async expectHidden(locator, message) {
    await expect(locator, message).toBeHidden();
  }

  static async expectText(locator, text, message) {
    await expect(locator, message).toContainText(text);
  }

  static async expectUrlContains(page, pathSegment, message) {
    await expect(page, message).toHaveURL(new RegExp(pathSegment));
  }

  static async expectTitleContains(page, titlePart, message) {
    await expect(page, message).toHaveTitle(new RegExp(titlePart, 'i'));
  }
}

module.exports = ValidationHelpers;

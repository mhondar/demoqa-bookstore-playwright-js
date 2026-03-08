const { test, expect } = require('@playwright/test');
const { URLS } = require('../config/urls');

test.describe('Book Store', () => {
  test('should load the book store page', async ({ page }) => {
    await page.goto(URLS.books);

    // Verify the books wrapper container is present and visible
    await expect(page.locator('.books-wrapper')).toBeVisible();
  });
});

const { test, expect } = require('@playwright/test');
const config = require('../../config/global');
const LoginPage = require('../../pages/LoginPage');
const ProfilePage = require('../../pages/ProfilePage');
const { ValidationHelpers } = require('../../utils');

test.describe('Login', () => {
  test('TC-CRT-E2E-001 Valid Login @critical @login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const credentials = config.credentials.valid;

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Login URL should contain the login path before authentication'
      );
    });

    await test.step('Enter valid credentials and submit the form', async () => {
      await loginPage.login(credentials.username, credentials.password);
    });

    await test.step('Verify authentication succeeds and the user reaches the authenticated area', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        profilePage.profilePath,
        'Successful login should redirect the user to the profile area'
      );
      await profilePage.waitForLoaded();
      await ValidationHelpers.expectVisible(
        profilePage.usernameValue,
        'Authenticated profile should display the logged-in username'
      );
      await ValidationHelpers.expectVisible(
        profilePage.logoutButton,
        'Authenticated profile should display the logout action'
      );

      const displayedUsername = await profilePage.getDisplayedUsername();

      expect(
        displayedUsername,
        'The authenticated profile should show the same username used for login'
      ).toBe(credentials.username);
    });
  });
});

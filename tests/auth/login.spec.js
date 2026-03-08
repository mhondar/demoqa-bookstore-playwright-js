const { test, expect } = require('@playwright/test');
const config = require('../../config/global');
const LoginPage = require('../../pages/LoginPage');
const ProfilePage = require('../../pages/ProfilePage');
const { ValidationHelpers } = require('../../utils');
const invalidUsersData = require('../../test-data/invalid-users.json');

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

  test('TC-CRT-E2E-002 Invalid Login @critical @login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const invalidLoginScenario = invalidUsersData.mainInvalidUserScenario;

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Login URL should contain the login path before invalid authentication'
      );
    });

    await test.step('Enter invalid credentials and submit the form', async () => {
      await loginPage.login(
        invalidLoginScenario.username,
        invalidLoginScenario.password
      );
    });

    await test.step('Verify the user stays on the login page and sees invalid credential feedback', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Invalid login should keep the user on the login page'
      );
      await loginPage.waitForLoaded();
      await loginPage.waitForErrorMessage();
      await ValidationHelpers.expectVisible(
        loginPage.errorMessage,
        'Invalid login should show an authentication error message'
      );
      await ValidationHelpers.expectText(
        loginPage.errorMessage,
        invalidLoginScenario.expectedMessage,
        'The login error feedback should match the invalid credential message'
      );
      await ValidationHelpers.expectVisible(
        loginPage.loginButton,
        'The login button should remain available after a rejected login attempt'
      );

      const errorMessageText = await loginPage.getErrorMessageText();

      expect(
        errorMessageText,
        'The invalid login message should match the expected dataset value'
      ).toContain(invalidLoginScenario.expectedMessage);
      await expect(
        page,
        'Invalid login should not redirect to the authenticated profile path'
      ).not.toHaveURL(new RegExp('\\/profile'));
    });
  });

  test('TC-REG-E2E-003 Login with Empty Fields @regression @login', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const emptyCredentialsScenario =
      invalidUsersData.invalidLoginScenarios.emptyCredentials;

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Login URL should contain the login path before empty-field validation'
      );
    });

    await test.step('Leave required fields empty and submit the form', async () => {
      await loginPage.login(
        emptyCredentialsScenario.username,
        emptyCredentialsScenario.password
      );
    });

    await test.step('Verify submission is blocked and validation is shown on the login page', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Empty-field login should keep the user on the login page'
      );
      await expect(
        page,
        'Empty-field login should not redirect to the authenticated profile path'
      ).not.toHaveURL(new RegExp('\\/profile'));

      const usernameValidationMessage =
        await loginPage.getUsernameValidationMessage();
      const passwordValidationMessage =
        await loginPage.getPasswordValidationMessage();
      const usernameMarkedInvalid = await loginPage.isUsernameMarkedInvalid();
      const passwordMarkedInvalid = await loginPage.isPasswordMarkedInvalid();

      expect(
        usernameMarkedInvalid,
        'Username input should be marked invalid after submitting empty credentials'
      ).toBeTruthy();
      expect(
        passwordMarkedInvalid,
        'Password input should be marked invalid after submitting empty credentials'
      ).toBeTruthy();
      expect(
        usernameValidationMessage,
        'Username input should expose the native required-field validation message'
      ).toBe('Please fill out this field.');
      expect(
        passwordValidationMessage,
        'Password input should expose the native required-field validation message'
      ).toBe('Please fill out this field.');

      await ValidationHelpers.expectVisible(
        loginPage.loginButton,
        'The login button should remain available after blocked empty-field submission'
      );
    });
  });

   test('TC-SMK-LG-004 Validate login page loads @smoke @login', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();
    });

    await test.step('Verify the main login section is visible', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Login page should load using the login path'
      );
      await ValidationHelpers.expectVisible(
        loginPage.loginContainer,
        'The main login section should be visible after the page loads'
      );
      await ValidationHelpers.expectVisible(
        loginPage.userForm,
        'The login form should be visible after the page loads'
      );
    });
  });

  test('TC-SMK-LG-005 Validate login form controls are visible @smoke @login', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();
    });

    await test.step('Verify username, password, and login controls are visible', async () => {
      await ValidationHelpers.expectVisible(
        loginPage.usernameInput,
        'The username input should be visible on the login page'
      );
      await ValidationHelpers.expectVisible(
        loginPage.passwordInput,
        'The password input should be visible on the login page'
      );
      await ValidationHelpers.expectVisible(
        loginPage.loginButton,
        'The login button should be visible on the login page'
      );

      await expect(
        loginPage.loginButton,
        'The login button should be enabled on the login page'
      ).toBeEnabled();
    });
  });

});

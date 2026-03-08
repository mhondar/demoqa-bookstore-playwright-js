const { test, expect } = require('@playwright/test');
const config = require('../../config/global');
const BookStorePage = require('../../pages/BookStorePage');
const LoginPage = require('../../pages/LoginPage');
const ProfilePage = require('../../pages/ProfilePage');
const SidebarNavigation = require('../../pages/SidebarNavigation');
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


  test('TC-CRT-LG-006 Validate login with invalid password @critical @login', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const invalidPasswordScenario = invalidUsersData.invalidLoginScenarios.wrongPassword;

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Login URL should contain the login path before invalid-password authentication'
      );
    });

    await test.step('Enter a valid username with an invalid password and submit the form', async () => {
      await loginPage.login(
        config.credentials.valid.username,
        invalidPasswordScenario.password
      );
    });

    await test.step('Verify invalid-password feedback is shown and the user stays on the login page', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Invalid-password login should keep the user on the login page'
      );
      await loginPage.waitForLoaded();
      await loginPage.waitForErrorMessage();
      await ValidationHelpers.expectVisible(
        loginPage.errorMessage,
        'Invalid-password login should show an authentication error message'
      );
      await ValidationHelpers.expectText(
        loginPage.errorMessage,
        invalidPasswordScenario.expectedMessage,
        'The login error feedback should match the invalid-password message'
      );
      await ValidationHelpers.expectVisible(
        loginPage.loginButton,
        'The login button should remain available after an invalid-password attempt'
      );

      const errorMessageText = await loginPage.getErrorMessageText();

      expect(
        errorMessageText,
        'The invalid-password message should match the expected dataset value'
      ).toContain(invalidPasswordScenario.expectedMessage);
      await expect(
        page,
        'Invalid-password login should not redirect to the authenticated profile path'
      ).not.toHaveURL(new RegExp('\\/profile'));
    });
  });

  test('TC-CRT-LG-007 Validate navigation from login to registration @critical @login', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const registrationForm = page.locator('#userForm');
    const firstNameInput = page.locator('#firstname');

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Login URL should contain the login path before navigating to registration'
      );
      await ValidationHelpers.expectVisible(
        loginPage.newUserButton,
        'The New User action should be visible on the login page'
      );
    });

    await test.step('Click the New User action', async () => {
      await loginPage.clickNewUser();
    });

    await test.step('Verify the user reaches the registration page and the form is visible', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        '/register',
        'New User navigation should redirect to the registration path'
      );
      await ValidationHelpers.expectVisible(
        registrationForm,
        'The registration form should be visible after navigating from login'
      );
      await ValidationHelpers.expectVisible(
        firstNameInput,
        'The registration page should expose the first name input'
      );
    });
  });

  test('TC-REG-LG-008 Validate login with empty username @regression @login', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const emptyUsernameScenario =
      invalidUsersData.invalidLoginScenarios.emptyUsername;
    const validPassword = config.credentials.valid.password;

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Login URL should contain the login path before empty-username validation'
      );
    });

    await test.step('Leave username empty, enter password, and submit the form', async () => {
      await loginPage.login(emptyUsernameScenario.username, validPassword);
    });

    await test.step('Verify submission is blocked and the username field is marked invalid', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Empty-username login should keep the user on the login page'
      );
      await expect(
        page,
        'Empty-username login should not redirect to the authenticated profile path'
      ).not.toHaveURL(new RegExp('\\/profile'));

      const passwordMarkedInvalid = await loginPage.isPasswordMarkedInvalid();
      const passwordValue = await loginPage.passwordInput.inputValue();

      await expect(
        loginPage.usernameInput,
        'Username input should keep the expected id after the blocked submission'
      ).toHaveAttribute('id', 'userName');
      await expect(
        loginPage.usernameInput,
        'Username input should be marked invalid after submitting with an empty username'
      ).toHaveClass(/is-invalid/);
      await expect(
        loginPage.usernameInput,
        'Username input should remain empty after the blocked submission'
      ).toHaveValue('');
      expect(
        passwordMarkedInvalid,
        'Password input should remain valid when only username is empty'
      ).toBeFalsy();
      expect(
        passwordValue,
        'Password input should keep the valid password value when only username is empty'
      ).toBe(validPassword);

      await ValidationHelpers.expectVisible(
        loginPage.loginButton,
        'The login button should remain available after blocked empty-username submission'
      );
    });
  });

  test('TC-REG-LG-009 Validate login with empty password @regression @login', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const emptyPasswordScenario =
      invalidUsersData.invalidLoginScenarios.emptyPassword;
    const validUsername = config.credentials.valid.username;

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Login URL should contain the login path before empty-password validation'
      );
    });

    await test.step('Enter username, leave password empty, and submit the form', async () => {
      await loginPage.login(validUsername, emptyPasswordScenario.password);
    });

    await test.step('Verify submission is blocked and the password field is marked invalid', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Empty-password login should keep the user on the login page'
      );
      await expect(
        page,
        'Empty-password login should not redirect to the authenticated profile path'
      ).not.toHaveURL(new RegExp('\\/profile'));

      const usernameMarkedInvalid = await loginPage.isUsernameMarkedInvalid();
      const usernameValue = await loginPage.usernameInput.inputValue();

      await expect(
        loginPage.passwordInput,
        'Password input should keep the expected id after the blocked submission'
      ).toHaveAttribute('id', 'password');
      await expect(
        loginPage.passwordInput,
        'Password input should be marked invalid after submitting with an empty password'
      ).toHaveClass(/is-invalid/);
      await expect(
        loginPage.passwordInput,
        'Password input should remain empty after the blocked submission'
      ).toHaveValue('');
      expect(
        usernameMarkedInvalid,
        'Username input should remain valid when only password is empty'
      ).toBeFalsy();
      expect(
        usernameValue,
        'Username input should keep the valid username value when only password is empty'
      ).toBe(validUsername);

      await ValidationHelpers.expectVisible(
        loginPage.loginButton,
        'The login button should remain available after blocked empty-password submission'
      );
    });
  });

  test('TC-CRT-LG-011 Validate logout @critical @login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const credentials = config.credentials.valid;

    await test.step('Authenticate with valid credentials', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();
      await loginPage.login(credentials.username, credentials.password);

      await ValidationHelpers.expectUrlContains(
        page,
        profilePage.profilePath,
        'Successful login should redirect the user to the profile area before logout'
      );
      await profilePage.waitForLoaded();
      await ValidationHelpers.expectVisible(
        profilePage.logoutButton,
        'Logout action should be visible for an authenticated user'
      );
    });

    await test.step('Trigger logout from the authenticated profile', async () => {
      await profilePage.logoutButton.click();
    });

    await test.step('Verify the session is cleared and the user returns to an unauthenticated state', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Logout should return the user to the login path'
      );
      await loginPage.waitForLoaded();
      await ValidationHelpers.expectVisible(
        loginPage.loginButton,
        'Login button should be visible after logout returns the user to login'
      );
      await expect(
        profilePage.logoutButton,
        'Logout action should no longer be visible after the session is cleared'
      ).toBeHidden();
      await expect(
        page,
        'Logged-out user should no longer remain on the authenticated profile path'
      ).not.toHaveURL(new RegExp(`${profilePage.profilePath}$`));
    });
  });

  test('TC-REG-LG-012 Validate navigation from login back to Book Store @regression @login', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const bookStorePage = new BookStorePage(page);
    const sidebarNavigation = new SidebarNavigation(page);

    await test.step('Open Login page', async () => {
      await loginPage.goTo();
      await loginPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Login URL should contain the login path before navigating back to Book Store'
      );
      await ValidationHelpers.expectVisible(
        sidebarNavigation.bookStoreButton,
        'Book Store action should be visible on the login page'
      );
    });

    await test.step('Click the Book Store action', async () => {
      await sidebarNavigation.clickBookStore();
    });

    await test.step('Verify the user reaches the Book Store catalog', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        bookStorePage.booksPath,
        'Book Store navigation should redirect the user to the catalog path'
      );
      await bookStorePage.waitForCatalogLoaded();
      await ValidationHelpers.expectVisible(
        bookStorePage.catalogContainer,
        'The Book Store catalog container should be visible after navigating from login'
      );
      await ValidationHelpers.expectVisible(
        bookStorePage.catalogTable,
        'The Book Store catalog table should be visible after navigating from login'
      );
    });
  });

});

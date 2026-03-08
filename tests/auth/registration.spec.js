const { test, expect } = require('../../fixtures/auth');
const LoginPage = require('../../pages/LoginPage');
const RegistrationPage = require('../../pages/RegistrationPage');
const { ValidationHelpers } = require('../../utils');
const usersData = require('../../test-data/users.json');

test.describe('Registration', () => {
  test('TC-SMK-RG-013 Validate registration page loads @smoke @registration', async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);

    await test.step('Open Registration page', async () => {
      await registrationPage.goTo();
      await registrationPage.waitForLoaded();
    });

    await test.step('Verify the main registration section is visible', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration page should load using the register path'
      );
      await ValidationHelpers.expectVisible(
        registrationPage.registrationContainer,
        'The main registration section should be visible after the page loads'
      );
      await ValidationHelpers.expectVisible(
        registrationPage.userForm,
        'The registration form should be visible after the page loads'
      );
    });
  });

  test('TC-SMK-RG-014 Validate registration form controls are visible @smoke @registration', async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);

    await test.step('Open Registration page', async () => {
      await registrationPage.goTo();
      await registrationPage.waitForLoaded();
    });

    await test.step('Verify registration form controls are visible', async () => {
      await ValidationHelpers.expectVisible(
        registrationPage.firstNameInput,
        'The first name input should be visible on the registration page'
      );
      await ValidationHelpers.expectVisible(
        registrationPage.lastNameInput,
        'The last name input should be visible on the registration page'
      );
      await ValidationHelpers.expectVisible(
        registrationPage.usernameInput,
        'The username input should be visible on the registration page'
      );
      await ValidationHelpers.expectVisible(
        registrationPage.passwordInput,
        'The password input should be visible on the registration page'
      );
      await ValidationHelpers.expectVisible(
        registrationPage.registerButton,
        'The register button should be visible on the registration page'
      );
    });
  });

  test('TC-CRT-RG-015 Validate navigation from registration back to login @critical @registration', async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    const loginPage = new LoginPage(page);

    await test.step('Open Registration page', async () => {
      await registrationPage.goTo();
      await registrationPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration URL should contain the register path before navigating back to login'
      );
      await ValidationHelpers.expectVisible(
        registrationPage.backToLoginButton,
        'Back to Login action should be visible on the registration page'
      );
    });

    await test.step('Click the Back to Login action', async () => {
      await registrationPage.clickBackToLogin();
    });

    await test.step('Verify the user reaches the Login page and the form is visible', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Back to Login navigation should redirect the user to the login path'
      );
      await loginPage.waitForLoaded();
      await ValidationHelpers.expectVisible(
        loginPage.userForm,
        'The login form should be visible after navigating from registration'
      );
      await ValidationHelpers.expectVisible(
        loginPage.loginButton,
        'The login action should be visible after navigating from registration'
      );
    });
  });

  test('TC-CRT-RG-016 Validate registration with valid unique data @critical @registration @error', async ({
    page,
  }) => {
    test.slow();
    test.skip(
      true,
      'Known runtime issue: public registration is unstable and this controlled success flow is intentionally skipped until the environment becomes reliable.'
    );

    const registrationPage = new RegistrationPage(page);
    const loginPage = new LoginPage(page);
    const referenceUser = usersData.mainValidUser;
    const uniqueUser = {
      firstName: referenceUser.firstName,
      lastName: referenceUser.lastName,
      username: `${referenceUser.username}${Date.now()}`,
      password: referenceUser.password,
    };

    await test.step('Open Registration page and complete the form with valid unique data', async () => {
      await registrationPage.goTo();
      await registrationPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration URL should contain the register path before submitting valid unique data'
      );

      await registrationPage.fillRegistrationForm(uniqueUser);
    });

    await test.step('Submit the registration form and validate the success flow when the environment allows it', async () => {
      let successDialogMessage = null;

      const dialogPromise = page
        .waitForEvent('dialog', { timeout: 5000 })
        .then(async dialog => {
          successDialogMessage = dialog.message();
          await dialog.accept();
          return dialog;
        })
        .catch(() => null);

      await registrationPage.submitRegistration();

      const dialog = await dialogPromise;
      const redirectedToLogin = await page
        .waitForURL(new RegExp(loginPage.loginPath), { timeout: 5000 })
        .then(() => true)
        .catch(() => false);

      if (!dialog && !redirectedToLogin && (await registrationPage.isCaptchaPresent())) {
        test.skip(
          true,
          'Public registration is intermittently gated by reCAPTCHA, so this controlled success flow cannot complete in every run.'
        );
      }

      if (successDialogMessage) {
        expect(
          successDialogMessage,
          'Successful registration should show a success confirmation dialog'
        ).toMatch(/user register successfully|registered successfully|success/i);
      }

      await ValidationHelpers.expectUrlContains(
        page,
        loginPage.loginPath,
        'Successful registration should return the user to the login path'
      );
      await loginPage.waitForLoaded();
      await ValidationHelpers.expectVisible(
        loginPage.userForm,
        'The login form should be visible after successful registration'
      );
      await ValidationHelpers.expectVisible(
        loginPage.loginButton,
        'The login button should be visible after successful registration'
      );
    });
  });

  test('TC-REG-RG-017 Validate registration with empty first name @regression @registration', async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    const referenceUser = usersData.mainValidUser;
    const userWithEmptyFirstName = {
      firstName: '',
      lastName: referenceUser.lastName,
      username: `${referenceUser.username}${Date.now()}`,
      password: referenceUser.password,
    };

    await test.step('Open Registration page', async () => {
      await registrationPage.goTo();
      await registrationPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration URL should contain the register path before empty-first-name validation'
      );
    });

    await test.step('Leave first name empty, complete remaining fields, and submit the form', async () => {
      await registrationPage.fillRegistrationForm(userWithEmptyFirstName);
      await registrationPage.submitRegistration();
    });

    await test.step('Verify registration is blocked and the first name field shows required validation', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration with empty first name should keep the user on the registration page'
      );

      const firstNameValidationMessage = await registrationPage.firstNameInput.evaluate(
        input => input.validationMessage
      );

      expect(
        firstNameValidationMessage,
        'First name input should expose the native required-field validation message'
      ).toBe('Please fill out this field.');

      await expect(
        registrationPage.firstNameInput,
        'First name input should remain empty after the blocked submission'
      ).toHaveValue('');
      await ValidationHelpers.expectVisible(
        registrationPage.registerButton,
        'Register button should remain available after blocked empty-first-name submission'
      );
    });
  });

  test('TC-REG-RG-018 Validate registration with empty last name @regression @registration', async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    const referenceUser = usersData.mainValidUser;
    const userWithEmptyLastName = {
      firstName: referenceUser.firstName,
      lastName: '',
      username: `${referenceUser.username}${Date.now()}`,
      password: referenceUser.password,
    };

    await test.step('Open Registration page', async () => {
      await registrationPage.goTo();
      await registrationPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration URL should contain the register path before empty-last-name validation'
      );
    });

    await test.step('Enter first name, leave last name empty, complete remaining fields, and submit the form', async () => {
      await registrationPage.fillRegistrationForm(userWithEmptyLastName);
      await registrationPage.submitRegistration();
    });

    await test.step('Verify registration is blocked and the last name field shows required validation', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration with empty last name should keep the user on the registration page'
      );

      const lastNameValidationMessage = await registrationPage.lastNameInput.evaluate(
        input => input.validationMessage
      );

      expect(
        lastNameValidationMessage,
        'Last name input should expose the native required-field validation message'
      ).toBe('Please fill out this field.');

      await expect(
        registrationPage.lastNameInput,
        'Last name input should remain empty after the blocked submission'
      ).toHaveValue('');
      await ValidationHelpers.expectVisible(
        registrationPage.registerButton,
        'Register button should remain available after blocked empty-last-name submission'
      );
    });
  });

  test('TC-REG-RG-019 Validate registration with empty username @regression @registration', async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    const referenceUser = usersData.mainValidUser;
    const userWithEmptyUsername = {
      firstName: referenceUser.firstName,
      lastName: referenceUser.lastName,
      username: '',
      password: referenceUser.password,
    };

    await test.step('Open Registration page', async () => {
      await registrationPage.goTo();
      await registrationPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration URL should contain the register path before empty-username validation'
      );
    });

    await test.step('Complete first name and last name, leave username empty, enter password, and submit the form', async () => {
      await registrationPage.fillRegistrationForm(userWithEmptyUsername);
      await registrationPage.submitRegistration();
    });

    await test.step('Verify registration is blocked and the username field shows required validation', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration with empty username should keep the user on the registration page'
      );

      const usernameValidationMessage = await registrationPage.usernameInput.evaluate(
        input => input.validationMessage
      );

      expect(
        usernameValidationMessage,
        'Username input should expose the native required-field validation message'
      ).toBe('Please fill out this field.');

      await expect(
        registrationPage.usernameInput,
        'Username input should remain empty after the blocked submission'
      ).toHaveValue('');
      await ValidationHelpers.expectVisible(
        registrationPage.registerButton,
        'Register button should remain available after blocked empty-username submission'
      );
    });
  });

  test('TC-REG-RG-020 Validate registration with empty password @regression @registration', async ({
    page,
  }) => {
    const registrationPage = new RegistrationPage(page);
    const referenceUser = usersData.mainValidUser;
    const userWithEmptyPassword = {
      firstName: referenceUser.firstName,
      lastName: referenceUser.lastName,
      username: `${referenceUser.username}${Date.now()}`,
      password: '',
    };

    await test.step('Open Registration page', async () => {
      await registrationPage.goTo();
      await registrationPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration URL should contain the register path before empty-password validation'
      );
    });

    await test.step('Complete name and username, leave password empty, and submit the form', async () => {
      await registrationPage.fillRegistrationForm(userWithEmptyPassword);
      await registrationPage.submitRegistration();
    });

    await test.step('Verify registration is blocked and the password field shows required validation', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration with empty password should keep the user on the registration page'
      );

      const passwordValidationMessage = await registrationPage.passwordInput.evaluate(
        input => input.validationMessage
      );

      expect(
        passwordValidationMessage,
        'Password input should expose the native required-field validation message'
      ).toBe('Please fill out this field.');

      await expect(
        registrationPage.passwordInput,
        'Password input should remain empty after the blocked submission'
      ).toHaveValue('');
      await ValidationHelpers.expectVisible(
        registrationPage.registerButton,
        'Register button should remain available after blocked empty-password submission'
      );
    });
  });

  test('TC-REG-RG-021 Validate registration with invalid password format @regression @registration', async ({
    page,
  }) => {
    test.skip(true, 'Temporarily skipped by request.');

    const registrationPage = new RegistrationPage(page);
    const referenceUser = usersData.mainValidUser;
    const userWithInvalidPassword = {
      firstName: referenceUser.firstName,
      lastName: referenceUser.lastName,
      username: `${referenceUser.username}${Date.now()}`,
      password: 'Test1234',
    };

    await test.step('Open Registration page', async () => {
      await registrationPage.goTo();
      await registrationPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration URL should contain the register path before invalid-password-format validation'
      );
    });

    await test.step('Complete the form with valid names, unique username, invalid password format, and submit', async () => {
      await registrationPage.fillRegistrationForm(userWithInvalidPassword);
      await registrationPage.submitRegistration();
    });

    await test.step('Verify registration is blocked and the password field shows format validation', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        registrationPage.registerPath,
        'Registration with an invalid password format should keep the user on the registration page'
      );

      const passwordValidationMessage = await registrationPage.passwordInput.evaluate(
        input => input.validationMessage
      );

      expect(
        passwordValidationMessage,
        'Password input should expose the native invalid-format validation message'
      ).toBe('Please match the requested format.');

      await expect(
        registrationPage.passwordInput,
        'Password input should keep the invalid-format value after the blocked submission'
      ).toHaveValue(userWithInvalidPassword.password);
      await ValidationHelpers.expectVisible(
        registrationPage.registerButton,
        'Register button should remain available after blocked invalid-password-format submission'
      );
    });
  });

  test('TC-REG-RG-022 Validate registration with duplicate username @regression @registration', async ({
    page,
  }) => {
    test.slow();

    const registrationPage = new RegistrationPage(page);
    const referenceUser = usersData.mainValidUser;
    const duplicateUsernameUser = {
      firstName: referenceUser.firstName,
      lastName: referenceUser.lastName,
      username: referenceUser.username,
      password: referenceUser.password,
    };
    const duplicateFeedbackPattern =
      /(user exists|username.*exist|already exists|already registered|already in use|already used|duplicate)/i;
    let dialogMessage = null;
    const relevantResponses = [];

    const handleDialog = async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    };

    const handleResponse = response => {
      if (/Account|User/i.test(response.url())) {
        relevantResponses.push(response);
      }
    };

    page.on('dialog', handleDialog);
    page.on('response', handleResponse);

    try {
      await test.step('Open Registration page', async () => {
        await registrationPage.goTo();
        await registrationPage.waitForLoaded();

        await ValidationHelpers.expectUrlContains(
          page,
          registrationPage.registerPath,
          'Registration URL should contain the register path before duplicate-username validation'
        );
      });

      await test.step('Complete the form with an existing username and submit', async () => {
        await registrationPage.fillRegistrationForm(duplicateUsernameUser);
        await registrationPage.submitRegistration();
        await page.waitForTimeout(1500);
      });

      await test.step('Verify registration is rejected or skip when the public environment blocks the validation', async () => {
        const pageText = (await page.locator('body').textContent()) || '';
        const hasDuplicateFeedback = duplicateFeedbackPattern.test(pageText);
        const backendRejected = relevantResponses.some(response => !response.ok());
        const captchaPresent = await registrationPage.isCaptchaPresent();

        test.skip(
          captchaPresent && !dialogMessage && !hasDuplicateFeedback && relevantResponses.length === 0,
          'Duplicate-username validation depends on stable registration submission; because the public registration flow is weak and intermittently fails, this case inherits the same effect when CAPTCHA/gate blocks the request before it is sent.'
        );

        await ValidationHelpers.expectUrlContains(
          page,
          registrationPage.registerPath,
          'Registration with a duplicate username should keep the user on the registration page'
        );

        expect(
          Boolean(dialogMessage) || hasDuplicateFeedback || backendRejected,
          'Duplicate-username registration should show duplicate feedback or be rejected safely by the backend'
        ).toBe(true);

        if (dialogMessage) {
          expect(
            dialogMessage,
            'Dialog feedback should describe that the username already exists or is duplicated'
          ).toMatch(duplicateFeedbackPattern);
        }

        if (hasDuplicateFeedback) {
          expect(
            pageText,
            'Page feedback should describe that the username already exists or is duplicated'
          ).toMatch(duplicateFeedbackPattern);
        }

        if (backendRejected) {
          expect(
            relevantResponses.some(response => response.status() >= 400),
            'At least one account-related response should reject the duplicate-username submission'
          ).toBe(true);
        }

        await ValidationHelpers.expectVisible(
          registrationPage.registerButton,
          'Register button should remain available after duplicate-username rejection'
        );
      });
    } finally {
      page.off('dialog', handleDialog);
      page.off('response', handleResponse);
    }
  });
});
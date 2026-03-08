const base = require('@playwright/test');
const config = require('../config/global');
const LoginPage = require('../pages/LoginPage');
const ProfilePage = require('../pages/ProfilePage');
const { ValidationHelpers } = require('../utils');

async function loginAs(page, credentials = config.credentials.valid) {
  const loginPage = new LoginPage(page);
  const profilePage = new ProfilePage(page);

  await loginPage.goTo();
  await loginPage.waitForLoaded();
  await loginPage.login(credentials.username, credentials.password);

  await ValidationHelpers.expectUrlContains(
    page,
    profilePage.profilePath,
    'Authenticated fixture should redirect to the profile area after login'
  );
  await profilePage.waitForLoaded();

  return profilePage;
}

const test = base.test.extend({
  authCredentials: [config.credentials.valid, { option: true }],

  authenticatedPage: async ({ page, authCredentials }, use) => {
    await loginAs(page, authCredentials);
    await use(page);
  },

  authenticatedProfilePage: async ({ authenticatedPage }, use) => {
    const profilePage = new ProfilePage(authenticatedPage);
    await profilePage.waitForLoaded();
    await use(profilePage);
  },
});

module.exports = {
  test,
  expect: base.expect,
  loginAs,
};
const BasePage = require('./BasePage');
const { URLS } = require('../config/urls');
const { NavigationHelpers } = require('../utils');

class ProfilePage extends BasePage {
  constructor(page) {
    super(page);

    this.profileContainer = page.locator('.profile-wrapper');
    this.usernameValue = page.locator('#userName-value');
    this.logoutButton = page.getByRole('button', { name: /^logout$/i });
    this.searchBox = page.getByPlaceholder('Type to search');
    this.bookTable = page.locator('.ReactTable, table');
    this.collectionTitleLinks = page.locator('.ReactTable a, table a');
  }

  async goTo() {
    await NavigationHelpers.goToProfile(this.page);
  }

  async waitForLoaded() {
    await this.waitForPageReady();
    await this.profileContainer.waitFor({ state: 'visible' });
    await this.usernameValue.waitFor({ state: 'visible' });
  }

  async getDisplayedUsername() {
    return (await this.usernameValue.textContent())?.trim();
  }

  getBookTitleLinkByTitle(title) {
    return this.page.locator('.ReactTable a, table a').filter({
      hasText: new RegExp(`^${title.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}$`, 'i'),
    });
  }

  async hasBookInCollection(title) {
    return (await this.getBookTitleLinkByTitle(title).count()) > 0;
  }

  get profilePath() {
    return URLS.profile;
  }
}

module.exports = ProfilePage;

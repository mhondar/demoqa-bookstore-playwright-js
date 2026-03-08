const BasePage = require('./BasePage');

class SidebarNavigation extends BasePage {
  constructor(page) {
    super(page);

    this.bookStoreButton = page.getByRole('link', { name: /^book store$/i });
    this.loginButton = page.getByRole('link', { name: /^login$/i });
    this.profileButton = page.getByRole('link', { name: /^profile$/i });
  }

  async clickBookStore() {
    await this.bookStoreButton.click();
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async clickProfile() {
    await this.profileButton.click();
  }
}

module.exports = SidebarNavigation;
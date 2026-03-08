class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path) {
    await this.page.goto(path);
    await this.waitForPageReady();
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = BasePage;
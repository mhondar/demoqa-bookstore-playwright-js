const BasePage = require('./BasePage');
const { URLS } = require('../config/urls');

class BookDetailPage extends BasePage {
  constructor(page) {
    super(page);

    this.detailContainer = page.locator('.books-wrapper');
    this.isbnWrapper = page.locator('#ISBN-wrapper');
    this.titleWrapper = page.locator('#title-wrapper');
    this.authorWrapper = page.locator('#author-wrapper');
    this.addToYourCollectionButton = page.getByRole('button', {
      name: /^add to your collection$/i,
    });
    this.backToBookStoreButton = page.getByRole('button', {
      name: /^back to book store$/i,
    });
  }

  async waitForLoaded() {
    await this.waitForPageReady();
    await this.detailContainer.waitFor({ state: 'visible' });
    await this.isbnWrapper.waitFor({ state: 'visible' });
    await this.titleWrapper.waitFor({ state: 'visible' });
  }

  getDetailPath(isbn) {
    return URLS.bookDetail(isbn);
  }

  async addToCollection() {
    await this.addToYourCollectionButton.click();
  }

  async clickBackToBookStore() {
    await this.backToBookStoreButton.click();
  }
}

module.exports = BookDetailPage;
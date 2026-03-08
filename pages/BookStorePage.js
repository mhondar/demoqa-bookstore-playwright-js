const BasePage = require('./BasePage');
const { URLS } = require('../config/urls');
const { NavigationHelpers } = require('../utils');

class BookStorePage extends BasePage {
  constructor(page) {
    super(page);

    this.catalogContainer = page.locator('.books-wrapper');
    this.catalogTable = page.locator('table');
    this.catalogBody = page.locator('table tbody');
    this.bookRows = page.locator('table tbody tr');
    this.visibleBookRows = page.locator('table tbody tr:visible');
    this.bookTitleLinks = page.locator('table tbody tr td:nth-child(2) a');
    this.searchInput = page.getByPlaceholder('Type to search');
  }

  async goTo() {
    await NavigationHelpers.goToBooks(this.page);
  }

  async waitForCatalogLoaded() {
    await this.waitForPageReady();
    await this.catalogContainer.waitFor({ state: 'visible' });
    await this.catalogTable.waitFor({ state: 'visible' });
    await this.bookRows.first().waitFor({ state: 'visible' });
  }

  async getRenderedBookRowCount() {
    return this.bookRows.count();
  }

  async getVisibleBookRowCount() {
    return this.visibleBookRows.count();
  }

  getBookRow(rowIndex = 0) {
    return this.bookRows.nth(rowIndex);
  }

  getBookTitleLink(rowIndex = 0) {
    return this.getBookRow(rowIndex).locator('td:nth-child(2) a');
  }

  getBookAuthorCell(rowIndex = 0) {
    return this.getBookRow(rowIndex).locator('td:nth-child(3)');
  }

  getBookPublisherCell(rowIndex = 0) {
    return this.getBookRow(rowIndex).locator('td:nth-child(4)');
  }

  async getBookMetadata(rowIndex = 0) {
    const title = (await this.getBookTitleLink(rowIndex).textContent())?.trim();
    const author = (await this.getBookAuthorCell(rowIndex).textContent())?.trim();
    const publisher = (await this.getBookPublisherCell(rowIndex).textContent())?.trim();

    return {
      title,
      author,
      publisher,
    };
  }

  async search(term) {
    await this.searchInput.fill(term);
  }

  getVisibleBookTitleLinks() {
    return this.page.locator('table tbody tr:visible td:nth-child(2) a');
  }

  getVisibleBookRowByTitle(title) {
    return this.page.locator('table tbody tr:visible', {
      has: this.page.getByRole('link', { name: title, exact: true }),
    });
  }

  getBookTitleLinkByTitle(title) {
    return this.page.getByRole('link', { name: title, exact: true });
  }

  async clickBookTitle(title) {
    await this.getBookTitleLinkByTitle(title).click();
  }

  async getVisibleBookTitles() {
    const titleCount = await this.getVisibleBookTitleLinks().count();
    const titles = [];

    for (let index = 0; index < titleCount; index += 1) {
      const title = await this.getVisibleBookTitleLinks().nth(index).textContent();
      titles.push(title?.trim());
    }

    return titles.filter(Boolean);
  }

  async getCurrentPath() {
    return new URL(this.page.url()).pathname;
  }

  get booksPath() {
    return URLS.books;
  }
}

module.exports = BookStorePage;
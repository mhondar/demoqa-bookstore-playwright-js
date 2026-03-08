const { test, expect } = require('@playwright/test');
const BookStorePage = require('../../pages/BookStorePage');
const { ValidationHelpers } = require('../../utils');
const booksData = require('../../test-data/books.json');

test.describe('Book Store', () => {
  test('TC-SMK-E2E-001 Access Book Store @smoke @bookstore', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);

    await test.step('Open Book Store page', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
    });

    await test.step('Verify catalog area is visible', async () => {
      await ValidationHelpers.expectVisible(
        bookStorePage.catalogContainer,
        'Book Store catalog container should be visible'
      );
      await ValidationHelpers.expectUrlContains(
        page,
        bookStorePage.booksPath,
        'Book Store URL should contain the books path'
      );
    });

    await test.step('Verify at least one book row is visible', async () => {
      const bookRowCount = await bookStorePage.getRenderedBookRowCount();

      expect(
        bookRowCount,
        'Book Store should render at least one book row'
      ).toBeGreaterThan(0);
      await ValidationHelpers.expectVisible(
        bookStorePage.bookTitleLinks.first(),
        'First book title link should be visible'
      );
    });
  });

  test('TC-SMK-E2E-002 View Book Catalog @smoke @bookstore', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);

    await test.step('Open Book Store page', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
    });

    await test.step('Inspect first visible rows', async () => {
      const bookRowCount = await bookStorePage.getRenderedBookRowCount();
      const rowsToInspect = Math.min(bookRowCount, 3);

      expect(
        rowsToInspect,
        'Book Store should expose at least one visible row to inspect'
      ).toBeGreaterThan(0);

      for (let rowIndex = 0; rowIndex < rowsToInspect; rowIndex += 1) {
        const metadata = await bookStorePage.getBookMetadata(rowIndex);

        expect(
          metadata.title,
          `Row ${rowIndex + 1} should include a visible book title`
        ).toBeTruthy();
        expect(
          metadata.author,
          `Row ${rowIndex + 1} should include a visible book author`
        ).toBeTruthy();
        expect(
          metadata.publisher,
          `Row ${rowIndex + 1} should include a visible book publisher`
        ).toBeTruthy();

        await ValidationHelpers.expectVisible(
          bookStorePage.getBookTitleLink(rowIndex),
          `Row ${rowIndex + 1} title link should be visible`
        );
      }
    });
  });

  test('TC-CRT-E2E-003 Search Books by Exact Title @critical @bookstore @search', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const exactTitle = booksData.searchData.validSearchTerms.exactTitle.value;

    await test.step('Open Book Store page', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
    });

    await test.step('Enter exact title in search input', async () => {
      await bookStorePage.search(exactTitle);
    });

    await test.step('Verify matching book remains visible and unrelated rows are filtered', async () => {
      await ValidationHelpers.expectVisible(
        bookStorePage.getVisibleBookRowByTitle(exactTitle),
        'The exact title result should remain visible after filtering'
      );

      const visibleTitles = await bookStorePage.getVisibleBookTitles();
      const visibleRowCount = await bookStorePage.getVisibleBookRowCount();

      expect(
        visibleRowCount,
        'At least one filtered row should remain visible for the exact title search'
      ).toBeGreaterThan(0);
      expect(
        visibleTitles,
        'The expected exact title should be present in the filtered result set'
      ).toContain(exactTitle);
      expect(
        visibleTitles.every(title => title === exactTitle),
        'Unrelated visible rows should be filtered out for an exact title search'
      ).toBeTruthy();
    });
  });
});
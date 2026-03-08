const { test, expect } = require('@playwright/test');
const BookStorePage = require('../../pages/BookStorePage');
const { ValidationHelpers } = require('../../utils');
const booksData = require('../../test-data/books.json');

test.describe('Book Store', () => {
  test('TC-SMK-E2E-023 Access Book Store @smoke @bookstore', async ({
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

  test('TC-SMK-E2E-024 View Book Catalog @smoke @bookstore', async ({
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

  test('TC-CRT-E2E-025 Search Books by Exact Title @critical @bookstore @search', async ({
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

  test('TC-CRT-E2E-026 Search with No Results @critical @bookstore @search', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const noResultsTerm = booksData.searchData.invalidSearchTerms.noResults.value;
    const expectedVisibleResults =
      booksData.searchData.invalidSearchTerms.noResults.expectedVisibleResults;

    await test.step('Open Book Store page', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
    });

    await test.step('Enter a non-existing term in search input', async () => {
      await bookStorePage.search(noResultsTerm);
    });

    await test.step('Verify no matching rows remain visible and layout stays stable', async () => {
      const visibleTitles = await bookStorePage.getVisibleBookTitles();
      const visibleRowCount = await bookStorePage.getVisibleBookRowCount();

      expect(
        visibleRowCount,
        'A non-existing search term should leave zero visible catalog rows'
      ).toBe(expectedVisibleResults);
      expect(
        visibleTitles,
        'A non-existing search term should not leave any visible book titles'
      ).toEqual([]);

      await ValidationHelpers.expectVisible(
        bookStorePage.catalogContainer,
        'Book Store catalog container should remain visible after a no-results search'
      );
      await ValidationHelpers.expectVisible(
        bookStorePage.catalogTable,
        'Book Store table layout should remain visible after a no-results search'
      );
      await ValidationHelpers.expectVisible(
        bookStorePage.searchInput,
        'Search input should remain visible after a no-results search'
      );
      await expect(
        bookStorePage.searchInput,
        'Search input should preserve the entered no-results term'
      ).toHaveValue(noResultsTerm);
    });
  });

  test('TC-SMK-BS-027 Validate book list loads @smoke @bookstore', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);

    await test.step('Open Book Store page and wait for the list to load', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
    });

    await test.step('Verify the book list area is visible', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        bookStorePage.booksPath,
        'Book Store URL should contain the books path when the list loads'
      );
      await ValidationHelpers.expectVisible(
        bookStorePage.catalogContainer,
        'Book Store catalog container should be visible after the page loads'
      );
      await ValidationHelpers.expectVisible(
        bookStorePage.catalogBody,
        'Book list body should be visible after the page loads'
      );
      await ValidationHelpers.expectVisible(
        bookStorePage.bookRows.first(),
        'At least the first book row should be visible when the list loads'
      );
    });
  });

  test('TC-SMK-BS-028 Validate visible number of records @smoke @bookstore', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);

    await test.step('Open Book Store page and wait for the list to load', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
    });

    await test.step('Count visible rows and verify the number is stable', async () => {
      const initialVisibleRowCount = await bookStorePage.getVisibleBookRowCount();
      const repeatedVisibleRowCount = await bookStorePage.getVisibleBookRowCount();

      expect(
        initialVisibleRowCount,
        'Book Store should display at least one visible record after the list loads'
      ).toBeGreaterThan(0);
      expect(
        repeatedVisibleRowCount,
        'Visible record count should remain stable when measured again without interaction'
      ).toBe(initialVisibleRowCount);

      await ValidationHelpers.expectVisible(
        bookStorePage.catalogBody,
        'Book list body should remain visible while counting the rendered records'
      );
    });
  });

  test('TC-CRT-BS-029 Validate search with valid text @critical @bookstore @search', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const exactTitle = booksData.searchData.validSearchTerms.exactTitle.value;

    await test.step('Open Book Store page and verify search is available', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();

      await ValidationHelpers.expectVisible(
        bookStorePage.searchInput,
        'Search input should be visible before entering a valid search term'
      );
    });

    await test.step('Enter a valid known search term', async () => {
      await bookStorePage.search(exactTitle);
    });

    await test.step('Verify the expected book remains visible and unrelated rows are filtered out', async () => {
      const visibleTitles = await bookStorePage.getVisibleBookTitles();
      const visibleRowCount = await bookStorePage.getVisibleBookRowCount();

      await ValidationHelpers.expectVisible(
        bookStorePage.getVisibleBookRowByTitle(exactTitle),
        'The expected book should remain visible after searching with valid text'
      );
      expect(
        visibleRowCount,
        'Searching with valid text should leave at least one visible row'
      ).toBeGreaterThan(0);
      expect(
        visibleTitles,
        'The expected valid title should appear in the filtered results'
      ).toContain(exactTitle);
      expect(
        visibleTitles.every(title => title === exactTitle),
        'Visible rows should be limited to the matching valid search result'
      ).toBeTruthy();
      await expect(
        bookStorePage.searchInput,
        'Search input should preserve the valid search term after filtering'
      ).toHaveValue(exactTitle);
    });
  });

  test('TC-CRT-BS-030 Validate search with no matches @critical @bookstore @search', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const noResultsTerm = booksData.searchData.invalidSearchTerms.noResults.value;
    const expectedVisibleResults =
      booksData.searchData.invalidSearchTerms.noResults.expectedVisibleResults;

    await test.step('Open Book Store page and verify search is available', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();

      await ValidationHelpers.expectVisible(
        bookStorePage.searchInput,
        'Search input should be visible before entering a no-match search term'
      );
    });

    await test.step('Enter a non-existing search term', async () => {
      await bookStorePage.search(noResultsTerm);
    });

    await test.step('Verify no matching records are visible and layout remains stable', async () => {
      const visibleTitles = await bookStorePage.getVisibleBookTitles();
      const visibleRowCount = await bookStorePage.getVisibleBookRowCount();

      expect(
        visibleRowCount,
        'Searching with a no-match term should leave zero visible rows'
      ).toBe(expectedVisibleResults);
      expect(
        visibleTitles,
        'Searching with a no-match term should leave no visible titles'
      ).toEqual([]);

      await ValidationHelpers.expectVisible(
        bookStorePage.catalogContainer,
        'Book Store catalog container should remain visible after a no-match search'
      );
      await ValidationHelpers.expectVisible(
        bookStorePage.catalogTable,
        'Book Store table layout should remain visible after a no-match search'
      );
      await expect(
        bookStorePage.searchInput,
        'Search input should preserve the entered no-match term'
      ).toHaveValue(noResultsTerm);
    });
  });

  test('TC-CRT-BS-031 Validate navigation to detail page @critical @bookstore', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const BookDetailPage = require('../../pages/BookDetailPage');
    const bookDetailPage = new BookDetailPage(page);
    const selectedBook = booksData.books.gitPocketGuide;

    await test.step('Open Book Store page and verify the known book is visible', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();

      await ValidationHelpers.expectVisible(
        bookStorePage.getBookTitleLinkByTitle(selectedBook.title),
        'The known book title should be visible before navigating to its detail page'
      );
    });

    await test.step('Click the known book title from the list', async () => {
      await bookStorePage.clickBookTitle(selectedBook.title);
    });

    await test.step('Verify the user reaches the corresponding detail page and the selected detail is displayed', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        bookStorePage.booksPath,
        'Book detail navigation should keep the user within the Book Store route'
      );
      await ValidationHelpers.expectUrlContains(
        page,
        selectedBook.isbn,
        'Book detail navigation should include the selected book identifier in the URL, even when the environment renders it through a search-style query parameter'
      );
      await bookDetailPage.waitForLoaded();
      await ValidationHelpers.expectVisible(
        bookDetailPage.detailContainer,
        'Book detail container should be visible after navigating from the catalog'
      );
      await ValidationHelpers.expectVisible(
        bookDetailPage.titleWrapper,
        'Book title detail should be visible after navigating from the catalog'
      );
      await ValidationHelpers.expectVisible(
        bookDetailPage.isbnWrapper,
        'Book ISBN detail should be visible after navigating from the catalog'
      );
      await expect(
        bookDetailPage.titleWrapper,
        'Selected book title should be displayed on the detail page'
      ).toContainText(selectedBook.title);
      await expect(
        bookDetailPage.isbnWrapper,
        'Selected book ISBN should be displayed on the detail page'
      ).toContainText(selectedBook.isbn);
    });
  });
});

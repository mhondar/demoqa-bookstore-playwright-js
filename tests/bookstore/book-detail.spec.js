const { test, expect } = require('@playwright/test');
const config = require('../../config/global');
const BookDetailPage = require('../../pages/BookDetailPage');
const BookStorePage = require('../../pages/BookStorePage');
const LoginPage = require('../../pages/LoginPage');
const ProfilePage = require('../../pages/ProfilePage');
const { BookStoreApiHelpers, ValidationHelpers } = require('../../utils');
const booksData = require('../../test-data/books.json');

test.describe('Book Detail', () => {
  test('TC-CRT-E2E-032 Navigate to Book Detail @critical @bookstore @e2e', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const bookDetailPage = new BookDetailPage(page);
    const selectedBook = booksData.books.gitPocketGuide;

    await test.step('Open Book Store page', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();

      await ValidationHelpers.expectVisible(
        bookStorePage.getBookTitleLinkByTitle(selectedBook.title),
        'Known book title should be visible before navigating to Book Detail'
      );
    });

    await test.step('Click the known book title from the list', async () => {
      await bookStorePage.clickBookTitle(selectedBook.title);
    });

    await test.step('Verify the route changes and the selected book detail is displayed', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        bookStorePage.booksPath,
        'Book Detail navigation should remain within the books route'
      );
      await ValidationHelpers.expectUrlContains(
        page,
        selectedBook.isbn,
        'Book Detail navigation should include the selected ISBN in the resulting URL'
      );

      await bookDetailPage.waitForLoaded();
      await ValidationHelpers.expectVisible(
        bookDetailPage.detailContainer,
        'Book Detail container should be visible after selecting a book from the catalog'
      );
      await expect(
        bookDetailPage.titleWrapper,
        'Selected book detail should display the expected title'
      ).toContainText(selectedBook.title);
    });
  });

  test('TC-REG-E2E-033 Add Book to Collection @regression @bookstore @collection', async ({
    page,
    request,
  }) => {
    test.slow();

    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const bookStorePage = new BookStorePage(page);
    const bookDetailPage = new BookDetailPage(page);
    const credentials = config.credentials.valid;
    const targetBook = booksData.collectionData.booksToAdd.primaryAddBook;
    let addCollectionDialogMessage = null;
    let authSession;
    let originalCollectionIsbns = [];

    try {
      await test.step('Authenticate with a valid user and normalize the collection precondition', async () => {
        await loginPage.goTo();
        await loginPage.waitForLoaded();
        await loginPage.login(credentials.username, credentials.password);

        await ValidationHelpers.expectUrlContains(
          page,
          profilePage.profilePath,
          'Successful login should reach the profile page before validating collection state'
        );
        await profilePage.waitForLoaded();
        await ValidationHelpers.expectVisible(
          profilePage.logoutButton,
          'Authenticated profile should expose the logout action before add-to-collection setup'
        );
        await expect(
          profilePage.usernameValue,
          'Authenticated profile should display the logged-in username before collection setup'
        ).toHaveText(credentials.username);

        authSession = await BookStoreApiHelpers.getAuthSessionFromPage(page);
        originalCollectionIsbns = await BookStoreApiHelpers.getCollectionIsbns(request, authSession);

        await BookStoreApiHelpers.replaceCollection(request, authSession, []);
        await profilePage.goTo();
        await profilePage.waitForLoaded();

        expect(
          await profilePage.hasBookInCollection(targetBook.title),
          'Controlled setup should remove the target book from the authenticated collection before the add flow starts'
        ).toBe(false);
      });

      await test.step('Open the known book detail page from the catalog', async () => {
        await bookStorePage.goTo();
        await bookStorePage.waitForCatalogLoaded();
        await bookStorePage.clickBookTitle(targetBook.title);
        await bookDetailPage.waitForLoaded();

        await ValidationHelpers.expectVisible(
          bookDetailPage.addToYourCollectionButton,
          'Add To Your Collection action should be visible for an authenticated user on the detail page'
        );
      });

      await test.step('Add the selected book to the collection', async () => {
        const dialogPromise = page.waitForEvent('dialog', { timeout: 5000 }).then(async dialog => {
          addCollectionDialogMessage = dialog.message();
          await dialog.accept();
        });

        await bookDetailPage.addToCollection();
        await dialogPromise;

        expect(
          addCollectionDialogMessage,
          'Adding a book to the collection should show a success confirmation dialog'
        ).toMatch(/book added to your collection|added to your collection|success/i);
      });

      await test.step('Verify the book appears in the authenticated profile collection', async () => {
        await profilePage.goTo();
        await profilePage.waitForLoaded();

        await ValidationHelpers.expectVisible(
          profilePage.bookTable,
          'Profile collection table should be visible after adding a book'
        );
        await ValidationHelpers.expectVisible(
          profilePage.getBookTitleLinkByTitle(targetBook.title),
          'The added book should appear in the authenticated profile collection'
        );
      });
    } finally {
      if (authSession) {
        await BookStoreApiHelpers.replaceCollection(request, authSession, originalCollectionIsbns);
      }
    }
  });

  test('TC-REG-E2E-034 Attempt to Add Book Without Login @regression @bookstore @collection', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const bookDetailPage = new BookDetailPage(page);
    const targetBook = booksData.collectionData.booksToAdd.primaryAddBook;

    await test.step('Open the known book detail page with a clean unauthenticated session', async () => {
      await page.context().clearCookies();

      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
      await bookStorePage.clickBookTitle(targetBook.title);
      await bookDetailPage.waitForLoaded();

      await expect(
        bookDetailPage.addToYourCollectionButton,
        'Add To Your Collection action should not be present for an unauthenticated user on the detail page'
      ).toHaveCount(0);
    });

    await test.step('Verify the detail view remains safely accessible without collection actions', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        bookStorePage.booksPath,
        'Unauthenticated book detail should remain within the books route'
      );
      await ValidationHelpers.expectUrlContains(
        page,
        targetBook.isbn,
        'Unauthenticated book detail should still identify the selected book in the URL'
      );

      await ValidationHelpers.expectVisible(
        bookDetailPage.backToBookStoreButton,
        'Back To Book Store action should remain available for unauthenticated users'
      );
    });
  });

  test('TC-CRT-BD-035 Validate book detail page loads from catalog selection @critical @bookstore @book-detail', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const bookDetailPage = new BookDetailPage(page);
    const selectedBook = booksData.books.gitPocketGuide;

    await test.step('Open Book Store and confirm the known catalog row is available', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();

      await ValidationHelpers.expectVisible(
        bookStorePage.getBookTitleLinkByTitle(selectedBook.title),
        'Known catalog title should be visible before opening Book Detail'
      );
    });

    await test.step('Select the known book from the catalog', async () => {
      await bookStorePage.clickBookTitle(selectedBook.title);
    });

    await test.step('Verify the detail page finishes loading', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        selectedBook.isbn,
        'Book Detail URL should include the selected ISBN after catalog navigation'
      );

      await bookDetailPage.waitForLoaded();
      await ValidationHelpers.expectVisible(
        bookDetailPage.detailContainer,
        'Book Detail container should be visible after selecting a book from the catalog'
      );
    });
  });

  test('TC-CRT-BD-036 Validate detail page shows expected book information @critical @bookstore @book-detail', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const bookDetailPage = new BookDetailPage(page);
    const selectedBook = booksData.books.gitPocketGuide;

    await test.step('Open the known book detail page from the catalog', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
      await bookStorePage.clickBookTitle(selectedBook.title);
      await bookDetailPage.waitForLoaded();
    });

    await test.step('Verify the visible detail fields match the selected book', async () => {
      await ValidationHelpers.expectVisible(
        bookDetailPage.titleWrapper,
        'Book Detail title field should be visible for the selected book'
      );
      await ValidationHelpers.expectVisible(
        bookDetailPage.authorWrapper,
        'Book Detail author field should be visible for the selected book'
      );
      await ValidationHelpers.expectVisible(
        bookDetailPage.isbnWrapper,
        'Book Detail ISBN field should be visible for the selected book'
      );

      await expect(
        bookDetailPage.titleWrapper,
        'Book Detail title field should match the selected catalog title'
      ).toContainText(selectedBook.title);
      await expect(
        bookDetailPage.authorWrapper,
        'Book Detail author field should match the selected catalog author'
      ).toContainText(selectedBook.author);
      await expect(
        bookDetailPage.isbnWrapper,
        'Book Detail ISBN field should match the selected catalog ISBN'
      ).toContainText(selectedBook.isbn);
    });
  });

  test('TC-REG-BD-037 Validate back navigation to Book Store @regression @bookstore @book-detail', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const bookDetailPage = new BookDetailPage(page);
    const selectedBook = booksData.books.gitPocketGuide;

    await test.step('Open a known book detail page', async () => {
      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
      await bookStorePage.clickBookTitle(selectedBook.title);
      await bookDetailPage.waitForLoaded();

      await ValidationHelpers.expectVisible(
        bookDetailPage.backToBookStoreButton,
        'Back To Book Store action should be visible on the detail page'
      );
    });

    await test.step('Return to the Book Store from the detail page', async () => {
      await bookDetailPage.clickBackToBookStore();
    });

    await test.step('Verify the catalog is visible again', async () => {
      await ValidationHelpers.expectUrlContains(
        page,
        bookStorePage.booksPath,
        'Back navigation from Book Detail should return to the books route'
      );
      await bookStorePage.waitForCatalogLoaded();

      await ValidationHelpers.expectVisible(
        bookStorePage.catalogContainer,
        'Book Store catalog should be visible again after navigating back from detail'
      );
      await ValidationHelpers.expectVisible(
        bookStorePage.getBookTitleLinkByTitle(selectedBook.title),
        'Known catalog title should be visible again after returning from Book Detail'
      );
    });
  });

  test('TC-REG-BD-038 Validate add book to collection without login is blocked @regression @bookstore @book-detail', async ({
    page,
  }) => {
    const bookStorePage = new BookStorePage(page);
    const bookDetailPage = new BookDetailPage(page);
    const targetBook = booksData.collectionData.booksToAdd.primaryAddBook;

    await test.step('Open a known book detail page in a clean unauthenticated session', async () => {
      await page.context().clearCookies();

      await bookStorePage.goTo();
      await bookStorePage.waitForCatalogLoaded();
      await bookStorePage.clickBookTitle(targetBook.title);
      await bookDetailPage.waitForLoaded();

      await ValidationHelpers.expectUrlContains(
        page,
        targetBook.isbn,
        'Unauthenticated Book Detail access should still resolve to the selected book'
      );
    });

    await test.step('Verify the add-to-collection action is blocked safely', async () => {
      await expect(
        bookDetailPage.addToYourCollectionButton,
        'Book Detail should not expose Add To Your Collection for an unauthenticated user'
      ).toHaveCount(0);

      await ValidationHelpers.expectVisible(
        bookDetailPage.backToBookStoreButton,
        'Safe navigation back to the catalog should remain available when add-to-collection is blocked'
      );
      await ValidationHelpers.expectVisible(
        bookDetailPage.detailContainer,
        'Book Detail should remain visible when unauthenticated collection actions are blocked in place'
      );
    });
  });

  test('TC-REG-BD-039 Validate add book to collection with authenticated user @regression @bookstore @book-detail', async ({
    page,
    request,
  }) => {
    test.slow();

    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const bookStorePage = new BookStorePage(page);
    const bookDetailPage = new BookDetailPage(page);
    const credentials = config.credentials.valid;
    const targetBook = booksData.collectionData.booksToAdd.primaryAddBook;
    let addCollectionDialogMessage = null;
    let authSession;
    let originalCollectionIsbns = [];

    try {
      await test.step('Authenticate the user and control the collection state', async () => {
        await loginPage.goTo();
        await loginPage.waitForLoaded();
        await loginPage.login(credentials.username, credentials.password);

        await ValidationHelpers.expectUrlContains(
          page,
          profilePage.profilePath,
          'Authenticated add-to-collection should begin from a valid logged-in profile session'
        );
        await profilePage.waitForLoaded();
        await ValidationHelpers.expectVisible(
          profilePage.logoutButton,
          'Authenticated profile should expose the logout action before opening Book Detail'
        );

        authSession = await BookStoreApiHelpers.getAuthSessionFromPage(page);
        originalCollectionIsbns = await BookStoreApiHelpers.getCollectionIsbns(request, authSession);

        await BookStoreApiHelpers.replaceCollection(request, authSession, []);
      });

      await test.step('Open the known book detail page with an authenticated session', async () => {
        await bookStorePage.goTo();
        await bookStorePage.waitForCatalogLoaded();
        await bookStorePage.clickBookTitle(targetBook.title);
        await bookDetailPage.waitForLoaded();

        await ValidationHelpers.expectVisible(
          bookDetailPage.addToYourCollectionButton,
          'Authenticated Book Detail should expose Add To Your Collection'
        );
      });

      await test.step('Add the book from the detail page', async () => {
        const dialogPromise = page.waitForEvent('dialog', { timeout: 5000 }).then(async dialog => {
          addCollectionDialogMessage = dialog.message();
          await dialog.accept();
        });

        await bookDetailPage.addToCollection();
        await dialogPromise;

        expect(
          addCollectionDialogMessage,
          'Authenticated add-to-collection should confirm success'
        ).toMatch(/book added to your collection|added to your collection|success/i);
      });

      await test.step('Verify the selected book is now present in the collection', async () => {
        await profilePage.goTo();
        await profilePage.waitForLoaded();

        await ValidationHelpers.expectVisible(
          profilePage.getBookTitleLinkByTitle(targetBook.title),
          'Authenticated collection should contain the book added from Book Detail'
        );
      });
    } finally {
      if (authSession) {
        await BookStoreApiHelpers.replaceCollection(request, authSession, originalCollectionIsbns);
      }
    }
  });
});
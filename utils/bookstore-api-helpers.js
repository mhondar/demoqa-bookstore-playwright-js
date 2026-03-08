const { BASE_URL } = require('../config/urls');

class BookStoreApiHelpers {
  static async getAuthSessionFromPage(page) {
    const cookies = await page.context().cookies();
    const token = cookies.find(cookie => cookie.name === 'token')?.value;
    const userId = cookies.find(cookie => cookie.name === 'userID')?.value;

    if (!token || !userId) {
      throw new Error('Authenticated DemoQA session cookies were not available for Book Store API setup.');
    }

    return { token, userId };
  }

  static async getUser(request, authSession) {
    const response = await request.get(
      `${BASE_URL}/Account/v1/User/${authSession.userId}`,
      {
        headers: {
          Authorization: `Bearer ${authSession.token}`,
        },
      }
    );

    if (!response.ok()) {
      throw new Error(
        `Failed to retrieve the authenticated DemoQA user record: ${response.status()} ${response.statusText()}`
      );
    }

    return response.json();
  }

  static async getCollectionIsbns(request, authSession) {
    const user = await this.getUser(request, authSession);
    return Array.isArray(user.books) ? user.books.map(book => book.isbn) : [];
  }

  static async clearCollection(request, authSession) {
    const response = await request.delete(
      `${BASE_URL}/BookStore/v1/Books?UserId=${authSession.userId}`,
      {
        headers: {
          Authorization: `Bearer ${authSession.token}`,
        },
      }
    );

    if (response.status() !== 204) {
      throw new Error(
        `Failed to clear the authenticated collection: ${response.status()} ${response.statusText()}`
      );
    }
  }

  static async seedCollection(request, authSession, isbns) {
    if (!Array.isArray(isbns) || isbns.length === 0) {
      return;
    }

    const response = await request.post(`${BASE_URL}/BookStore/v1/Books`, {
      headers: {
        Authorization: `Bearer ${authSession.token}`,
        'Content-Type': 'application/json',
      },
      data: {
        userId: authSession.userId,
        collectionOfIsbns: isbns.map(isbn => ({ isbn })),
      },
    });

    if (response.status() !== 201) {
      throw new Error(
        `Failed to seed the authenticated collection: ${response.status()} ${response.statusText()}`
      );
    }
  }

  static async replaceCollection(request, authSession, isbns = []) {
    await this.clearCollection(request, authSession);
    await this.seedCollection(request, authSession, isbns);
  }
}

module.exports = BookStoreApiHelpers;
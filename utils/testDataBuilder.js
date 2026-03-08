const { faker } = require('@faker-js/faker');

/**
 * Test Data Builder utility
 * Provides methods to generate fake test data using Faker.js
 */
class TestDataBuilder {
  /**
   * Generate user data for testing
   */
  static generateUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      username: faker.internet.username(),
    };
  }

  /**
   * Generate book search terms
   */
  static generateSearchTerm() {
    const searchTerms = [
      'JavaScript',
      'Python',
      'Testing',
      'Automation',
      'Playwright',
      'Web Development',
      'Programming',
      'Design Patterns',
    ];

    return faker.helpers.arrayElement(searchTerms);
  }

  /**
   * Generate random ISBN-like string
   */
  static generateISBN() {
    return faker.string.alphanumeric({ length: 13 });
  }

  /**
   * Generate book data
   */
  static generateBook() {
    return {
      title: faker.book.title(),
      author: faker.book.author(),
      isbn: this.generateISBN(),
      description: faker.lorem.sentences(3),
      pages: faker.number.int({ min: 50, max: 1000 }),
      publishDate: faker.date.past({ years: 20 }),
    };
  }

  /**
   * Generate multiple users
   */
  static generateUsers(count = 5) {
    return Array.from({ length: count }, () => this.generateUser());
  }

  /**
   * Generate multiple books
   */
  static generateBooks(count = 10) {
    return Array.from({ length: count }, () => this.generateBook());
  }

  /**
   * Generate valid login credentials
   */
  static getValidCredentials() {
    return {
      username: 'testuser',
      password: 'Test@123',
    };
  }

  /**
   * Generate invalid login credentials
   */
  static getInvalidCredentials() {
    return {
      username: faker.internet.username(),
      password: faker.internet.password(),
    };
  }
}

module.exports = TestDataBuilder;

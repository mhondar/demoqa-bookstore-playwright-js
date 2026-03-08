const { faker } = require('@faker-js/faker');
const TestDataBuilder = require('./testDataBuilder');

/**
 * Dynamic data helpers for stable and reusable test data patterns.
 */
class DataHelpers {
  static uniqueId(prefix = 'qa') {
    const timestamp = Date.now();
    const random = faker.string.alphanumeric(6).toLowerCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  static buildDynamicUser(overrides = {}) {
    const base = TestDataBuilder.generateUser();
    const unique = this.uniqueId('user');

    return {
      ...base,
      username: `${base.username}-${unique}`,
      email: `${unique}@example.test`,
      ...overrides,
    };
  }

  static buildInvalidUser(overrides = {}) {
    return {
      username: '',
      password: faker.internet.password({ length: 4 }),
      email: 'invalid-email-format',
      firstName: '',
      lastName: faker.person.lastName(),
      ...overrides,
    };
  }

  static buildDynamicBook(overrides = {}) {
    const base = TestDataBuilder.generateBook();
    return {
      ...base,
      isbn: faker.string.numeric(13),
      ...overrides,
    };
  }

  static pickRandom(list = []) {
    if (!Array.isArray(list) || list.length === 0) {
      throw new Error('pickRandom requires a non-empty array');
    }

    return faker.helpers.arrayElement(list);
  }

  static futureDate(daysFromNow = 7) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date;
  }

  static credentialsFromEnv() {
    return {
      username: process.env.TEST_USERNAME || 'testuser',
      password: process.env.TEST_PASSWORD || 'Test@123',
    };
  }
}

module.exports = DataHelpers;

/**
 * Global test configuration
 * Provides centralized access to test settings and utilities
 */

// Load environment variables
require('dotenv').config();

const config = {
  // Application URLs
  urls: require('./urls'),

  // Test settings
  timeouts: {
    action: parseInt(process.env.ACTION_TIMEOUT) || 10000,
    navigation: parseInt(process.env.NAVIGATION_TIMEOUT) || 30000,
    expect: parseInt(process.env.EXPECT_TIMEOUT) || 10000,
    test: parseInt(process.env.TIMEOUT) || 60000,
  },

  // Browser settings
  browser: {
    default: process.env.BROWSER || 'chromium',
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1280, height: 720 },
  },

  // Test data
  testData: require('../utils').TestDataBuilder,

  // Environment
  environment: {
    name: process.env.TEST_ENV || 'local',
    isCI: process.env.CI === 'true',
    baseUrl: process.env.BASE_URL || 'https://demoqa.com',
  },

  // Test execution settings
  execution: {
    workers: parseInt(process.env.WORKERS) || 3,
    retries: process.env.CI ? 2 : 0,
    parallel: true,
  },

  // Media settings
  media: {
    screenshot: process.env.SCREENSHOT_ON_FAILURE || 'only-on-failure',
    video: process.env.VIDEO_MODE || 'retain-on-failure',
    trace: process.env.TRACE_MODE || 'on-first-retry',
  },

  // Selectors and locators (can be expanded)
  selectors: {
    // Common selectors used across tests
    loadingSpinner: '.loading-spinner',
    errorMessage: '.error-message',
    successMessage: '.success-message',
  },

  // Test user credentials
  credentials: {
    valid: {
      username: process.env.TEST_USERNAME || 'testuser',
      password: process.env.TEST_PASSWORD || 'Test@123',
      firstName: process.env.TEST_USER_FIRST_NAME || 'Test',
      lastName: process.env.TEST_USER_LAST_NAME || 'User',
      email: process.env.TEST_USER_EMAIL || 'testuser@example.com',
    },
    invalid: {
      username: process.env.INVALID_TEST_USERNAME || 'invaliduser',
      password: process.env.INVALID_TEST_PASSWORD || 'WrongPass@123',
    },
  },
};

module.exports = config;

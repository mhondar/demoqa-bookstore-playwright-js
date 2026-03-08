// URLs configuration for DemoQA Book Store application
const BASE_URL = 'https://demoqa.com';

const URLS = {
  // Base application URLs
  home: '/',
  books: '/books',

  // Authentication URLs
  login: '/login',
  profile: '/profile',

  // Book-related URLs
  bookDetail: (isbn) => `/books?book=${isbn}`,

  // External URLs (if needed)
  github: 'https://github.com',
  documentation: 'https://playwright.dev/docs/intro'
};

module.exports = {
  BASE_URL,
  URLS
};
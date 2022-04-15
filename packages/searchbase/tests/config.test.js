const {
  SearchBase,
  SearchComponent
} = require('./../dist/@appbaseio/searchbase.cjs');

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';
const mongodb = {
  db: 'sample_airbnb',
  collection: 'listingsAndReviews'
};

describe('SearchBase: Input Validations (Elasticsearch as SearchBackend)', () => {
  test('throw error if empty url', () => {
    try {
      /* eslint-disable-next-line */
      const searchbase = new SearchBase({
        index
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toEqual(
        'url is required for <SearchBase /> component when used with the elasticsearch Search backend.'
      );
    }
  });
  test('throw error if empty index', () => {
    try {
      /* eslint-disable-next-line */
      const searchbase = new SearchBase({
        url: 'https://appbase-demo.dev.io'
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toEqual(
        'index is required for <SearchBase /> component when used with the elasticsearch Search backend.'
      );
    }
  });
  test('throw error if empty credentials', () => {
    try {
      /* eslint-disable-next-line */
      const searchbase = new SearchBase({
        index,
        url: 'https://appbase-demo.dev.io'
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toEqual(
        'credentials is required for <SearchBase /> component when used with the elasticsearch Search backend.'
      );
    }
  });
});

describe('SearchBase: Input Validations (MongoDB as SearchBackend)', () => {
  test('throw error if empty url', () => {
    try {
      /* eslint-disable-next-line */
      const searchbase = new SearchBase({
        mongodb
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toEqual(
        'url is required for <SearchBase /> component when used with the mongodb Search backend.'
      );
    }
  });
});

describe('SearchComponent: Input Validations (Elasticsearch as SearchBackend)', () => {
  test('throw error if empty url', () => {
    try {
      /* eslint-disable-next-line */
      const searchComponent = new SearchComponent({
        index
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toEqual(
        'url is required for <SearchBase /> component when used with the elasticsearch Search backend.'
      );
    }
  });
  test('throw error if empty index', () => {
    try {
      /* eslint-disable-next-line */
      const searchComponent = new SearchComponent({
        url: 'https://appbase-demo.dev.io'
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toEqual(
        'index is required for <SearchBase /> component when used with the elasticsearch Search backend.'
      );
    }
  });
  test('throw error if empty credentials', () => {
    try {
      /* eslint-disable-next-line */
      const searchComponent = new SearchComponent({
        index,
        url: 'https://appbase-demo.dev.io'
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toEqual(
        'credentials is required for <SearchBase /> component when used with the elasticsearch Search backend.'
      );
    }
  });
});

describe('SearchComponent: Input Validations (MongoDB as SearchBackend)', () => {
  test('throw error if empty url', () => {
    try {
      /* eslint-disable-next-line */
      const searchComponent = new SearchComponent({
        mongodb
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toEqual(
        'url is required for <SearchBase /> component when used with the mongodb Search backend.'
      );
    }
  });
});

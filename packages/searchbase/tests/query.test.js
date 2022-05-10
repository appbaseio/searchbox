const { SearchBase } = require('../dist/@appbaseio/searchbase.cjs.js');

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';
const mongodb = {
  db: 'sample_airbnb',
  collection: 'listingsAndReviews'
};
const searchComponentId = 'search-component';
const resultComponentId = 'result-component';
const componentId = searchComponentId;

const crossFetch = require('cross-fetch');
jest.mock('cross-fetch');
beforeEach(() => {
  crossFetch.mockResolvedValue({
    status: 200,
    json: async () => ({
      [searchComponentId]: { hits: { hits: [] } },
      [resultComponentId]: { hits: { hits: [] } }
    })
  });
});

describe('Request Generation Logic(Elasticsearch as backend)', () => {
  let searchBase;
  beforeEach(() => {
    searchBase = new SearchBase({
      index,
      url,
      credentials
    });
  });
  test('should trigger query with all options', async () => {
    const props = {
      react: {
        and: ['date-component', 'language-filter']
      },
      dataField: ['name', 'description'],
      queryFormat: 'and'
    };
    const searchComponent = searchBase.register(componentId, {
      ...props,
      type: 'search'
    });

    await searchComponent.triggerDefaultQuery();
    const searchComponentQuery = searchComponent.query.find(
      q => q.id === componentId
    );
    expect(searchComponentQuery).toEqual(expect.objectContaining(props));
  });
  test('should trigger default query as Elasticsearch query DSL', async () => {
    const query = {
      query: { match: { title: 'harry' } }
    };
    const searchComponent = searchBase.register(componentId, {
      defaultQuery: () => query,
      type: 'search'
    });

    await searchComponent.triggerDefaultQuery();
    const searchComponentQuery = searchComponent.query.find(
      q => q.id === componentId
    );
    expect(searchComponentQuery.defaultQuery).toEqual(
      expect.objectContaining(query)
    );
  });
  test('should trigger default query as stored query', async () => {
    const query = {
      id: 'stored-query',
      params: { value: 'harry' }
    };

    const searchComponent = searchBase.register(componentId, {
      defaultQuery: () => query,
      type: 'search'
    });

    await searchComponent.triggerDefaultQuery();
    const searchComponentQuery = searchComponent.query.find(
      q => q.id === componentId
    );
    expect(searchComponentQuery.defaultQuery).toEqual(
      expect.objectContaining(query)
    );
  });
  test('should trigger custom query', async () => {
    const searchComponent = searchBase.register(searchComponentId, {
      value: 'harry'
    });
    const resultComponent = searchBase.register(resultComponentId, {
      react: { and: searchComponentId }
    });

    await searchComponent.triggerCustomQuery();
    const resultComponentQuery = resultComponent.query.find(
      q => q.id === searchComponentId // should have a query with id of the search-component
    );
    expect(resultComponentQuery).toEqual(
      expect.objectContaining({ value: 'harry' })
    );
  });

  test('should trigger custom query as Elasticsearch query DSL', async () => {
    const query = { query: { match: { title: 'harry' } } };
    const searchComponent = searchBase.register(searchComponentId, {
      customQuery: () => query
    });
    const resultComponent = searchBase.register(resultComponentId, {
      react: { and: searchComponentId }
    });

    await searchComponent.triggerCustomQuery();
    const resultComponentQuery = resultComponent.query.find(
      q => q.id === searchComponentId // should have a query with id of the search-component
    );
    expect(resultComponentQuery).toEqual(expect.objectContaining(query));
  });

  test('should trigger custom query as stored query', async () => {
    const query = { id: 'stored-query', params: { value: 'harry' } };
    const searchComponent = searchBase.register(searchComponentId, {
      customQuery: () => query
    });
    const resultComponent = searchBase.register(resultComponentId, {
      react: { and: searchComponentId }
    });

    await searchComponent.triggerCustomQuery();
    const resultComponentQuery = resultComponent.query.find(
      q => q.id === searchComponentId // should have a query with id of the search-component
    );
    expect(resultComponentQuery).toEqual(expect.objectContaining(query));
  });
});
describe('Request Generation Logic(MongoDB as SearchBackend', () => {
  let searchBase;
  beforeEach(() => {
    searchBase = new SearchBase({
      index,
      url,
      credentials,
      mongodb
    });
  });
  test('should trigger default query as MongoDB aggregation query', async () => {
    const query = {
      react: {
        and: ['date-component', 'language-filter']
      },
      dataField: ['name', 'description'],
      queryFormat: 'and'
    };
    const searchComponent = searchBase.register(componentId, {
      ...query,
      type: 'search'
    });

    await searchComponent.triggerDefaultQuery();
    expect(searchComponent.query[0]).toEqual(expect.objectContaining(query));
  });
  test('should trigger custom query as MongoDB aggregation query', async () => {
    const query = { query: { match: { title: 'harry' } } };
    const searchComponent = searchBase.register(componentId, {
      customQuery: () => query
    });

    await searchComponent.triggerCustomQuery();
    expect(searchComponent.query[0]).toEqual(expect.objectContaining(query));
  });
});

const { SearchBase } = require('../dist/@appbaseio/searchbase.cjs.js');

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';

beforeAll(() => jest.spyOn(window, 'fetch'));

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
    const componentId = 'search-component';
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

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        [componentId]: { hits: { hits: [] } }
      })
    });

    await searchComponent.triggerDefaultQuery();
    expect(searchComponent.query[0]).toEqual(expect.objectContaining(query));
  });
  test('should trigger default query as Elasticsearch query DSL', async () => {
    const componentId = 'search-component';
    const query = {
      query: { match: { title: 'harry' } }
    };
    const searchComponent = searchBase.register(componentId, {
      defaultQuery: () => query,
      type: 'search'
    });

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        [componentId]: { hits: { hits: [] } }
      })
    });

    await searchComponent.triggerDefaultQuery();
    expect(searchComponent.query[0].defaultQuery).toEqual(
      expect.objectContaining(query)
    );
  });
  test('should trigger default query as stored query', async () => {
    const componentId = 'search-component';
    const query = {
      id: 'stored-query',
      params: { value: 'harry' }
    };

    const searchComponent = searchBase.register(componentId, {
      defaultQuery: () => query,
      type: 'search'
    });

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        [componentId]: { hits: { hits: [] } }
      })
    });

    await searchComponent.triggerDefaultQuery();
    expect(searchComponent.query[0].defaultQuery).toEqual(
      expect.objectContaining(query)
    );
  });
  test('should trigger custom query', async () => {
    const searchComponentId = 'search-component';
    const resultComponentId = 'result-component';

    const searchComponent = searchBase.register(searchComponentId, {
      value: 'harry'
    });
    const resultComponent = searchBase.register(resultComponentId, {
      react: { and: searchComponentId }
    });

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        [searchComponentId]: { hits: { hits: [] } },
        [resultComponentId]: { hits: { hits: [] } }
      })
    });

    await searchComponent.triggerCustomQuery();
    expect(resultComponent.query[1]).toEqual(
      expect.objectContaining({ value: 'harry' })
    );
  });
  test('should trigger custom query', async () => {
    const searchComponentId = 'search-component';
    const resultComponentId = 'result-component';

    const searchComponent = searchBase.register(searchComponentId, {
      value: 'harry'
    });
    const resultComponent = searchBase.register(resultComponentId, {
      react: { and: searchComponentId }
    });

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        [searchComponentId]: { hits: { hits: [] } },
        [resultComponentId]: { hits: { hits: [] } }
      })
    });

    await searchComponent.triggerCustomQuery();
    expect(resultComponent.query[1]).toEqual(
      expect.objectContaining({ value: 'harry' })
    );
  });
});

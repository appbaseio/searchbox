const {
  SearchBase,
  SearchComponent
} = require('../dist/@appbaseio/searchbase.cjs.js');

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';

const componentId = 'search-component';

const crossFetch = require('cross-fetch');
jest.mock('cross-fetch');
beforeEach(() => {
  crossFetch.mockResolvedValue({
    status: 200,
    json: async () => ({
      [componentId]: { hits: { hits: [] } }
    })
  });
});

describe('SearchBase: transformResponse', () => {
  test('should transform the response', async () => {
    const mockHits = { hits: [1, 2, 3] };
    // transformRequest takes the same input as fetch
    const searchBase = new SearchBase({
      index,
      url,
      credentials,
      id: componentId,
      transformResponse: async elasticsearchResponse => {
        return {
          ...elasticsearchResponse,
          [componentId]: mockHits
        };
      }
    });
    const searchComponent = searchBase.register(componentId, {
      dataField: ['name']
    });

    const response = await searchComponent.triggerDefaultQuery();
    expect(response).toBe(mockHits);
  });
});

describe('SearchComponent: transformResponse', () => {
  test('should transform the response', async () => {
    const mockHits = { hits: [1, 2, 3] };
    // transformRequest takes the same input as fetch
    const searchComponent = new SearchComponent({
      index,
      url,
      credentials,
      id: componentId,
      transformResponse: async elasticsearchResponse => {
        return {
          ...elasticsearchResponse,
          [componentId]: mockHits
        };
      }
    });

    const response = await searchComponent.triggerDefaultQuery();
    expect(response).toBe(mockHits);
  });
  test('should not be overriden by SearchBase.transformResponse', async () => {
    const mockHitsSearchBase = { hits: [1, 2, 3] };
    const mockHitsSearchComponent = { hits: [2, 3, 4] };

    const searchComponent = new SearchComponent({
      index,
      url,
      credentials,
      id: componentId,
      // transformResponse should return the complete response
      transformResponse: async elasticsearchResponse => {
        return {
          ...elasticsearchResponse,
          [componentId]: mockHitsSearchComponent
        };
      }
    });
    const searchBase = new SearchBase({
      index,
      url,
      credentials,
      id: componentId,
      // transformResponse should return the complete response
      transformResponse: async elasticsearchResponse => {
        return {
          ...elasticsearchResponse,
          [componentId]: mockHitsSearchBase
        };
      }
    });

    searchBase.register(componentId, searchComponent);

    const response = await searchComponent.triggerDefaultQuery();
    expect(response).toBe(mockHitsSearchComponent);
  });
});

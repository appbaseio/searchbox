const {
  SearchBase,
  SearchComponent
} = require('../dist/@appbaseio/searchbase.cjs.js');

const suffix = '_reactivesearch.v3';
const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';
const mongodb = {
  db: 'sample_airbnb',
  collection: 'listingsAndReviews'
};

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('SearchBase: transformResponse', () => {
  test('should transform the response', async () => {
    const componentId = 'search-component';
    const mockHits = { hits: [1, 2, 3] };
    //transformRequest takes the same input as fetch
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

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        [componentId]: { hits: { hits: [] } }
      })
    });

    const response = await searchComponent.triggerDefaultQuery();
    expect(response).toBe(mockHits);
  });
});

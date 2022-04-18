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

describe('SearchBase: transformRequest', () => {
  test('should transform the request', async () => {
    const AFTER_ONE_HOUR = new Date(Date.now() + 1000 * 60 * 60);
    const componentId = 'search-component';
    //transformRequest takes the same input as fetch
    const searchBase = new SearchBase({
      index,
      url,
      credentials,
      id: componentId,
      transformRequest: request =>
        Promise.resolve({
          ...request,
          headers: {
            ...request.headers,
            Expires: AFTER_ONE_HOUR
          }
        })
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

    await searchComponent.triggerDefaultQuery();
    expect(window.fetch).toHaveBeenCalledWith(
      `${url}/${index}/${suffix}`,
      expect.objectContaining({
        headers: expect.objectContaining({ Expires: AFTER_ONE_HOUR })
      })
    );
  });
});

describe('SearchComponent: transformRequest', () => {
  test('should transform the request', async () => {
    const AFTER_ONE_HOUR = new Date(Date.now() + 1000 * 60 * 60);
    const componentId = 'search-component';
    //transformRequest takes the same input as fetch
    const searchComponent = new SearchComponent({
      index,
      url,
      credentials,
      id: componentId,
      transformRequest: request =>
        Promise.resolve({
          ...request,
          headers: {
            ...request.headers,
            Expires: AFTER_ONE_HOUR
          }
        })
    });

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        [componentId]: { hits: { hits: [] } }
      })
    });

    await searchComponent.triggerDefaultQuery();
    expect(window.fetch).toHaveBeenCalledWith(
      `${url}/${index}/${suffix}`,
      expect.objectContaining({
        headers: expect.objectContaining({ Expires: AFTER_ONE_HOUR })
      })
    );
  });
});

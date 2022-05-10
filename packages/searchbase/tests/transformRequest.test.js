const {
  SearchBase,
  SearchComponent
} = require('../dist/@appbaseio/searchbase.cjs.js');

const suffix = '_reactivesearch.v3';
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

describe('SearchBase: transformRequest', () => {
  test('should transform the request', async () => {
    const AFTER_ONE_HOUR = new Date(Date.now() + 1000 * 60 * 60);
    // transformRequest takes the same input as fetch
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

    await searchComponent.triggerDefaultQuery();
    expect(crossFetch).toHaveBeenCalledWith(
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
    // transformRequest takes the same input as fetch
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

    await searchComponent.triggerDefaultQuery();
    expect(crossFetch).toHaveBeenCalledWith(
      `${url}/${index}/${suffix}`,
      expect.objectContaining({
        headers: expect.objectContaining({ Expires: AFTER_ONE_HOUR })
      })
    );
  });
  test('should not be overriden by SearchBase.transformRequest', async () => {
    const AFTER_ONE_HOUR = new Date(Date.now() + 1000 * 60 * 60);
    const AFTER_TWO_HOUR = new Date(Date.now() + 2 * 1000 * 60 * 60);
    // transformRequest takes the same input as fetch
    const searchBase = new SearchBase({
      index,
      url,
      credentials,
      transformRequest: request =>
        Promise.resolve({
          ...request,
          headers: {
            ...request.headers,
            Expires: AFTER_ONE_HOUR
          }
        })
    });
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
            Expires: AFTER_TWO_HOUR
          }
        })
    });

    await searchComponent.triggerDefaultQuery();
    expect(crossFetch).toHaveBeenCalledWith(
      `${url}/${index}/${suffix}`,
      expect.objectContaining({
        headers: expect.objectContaining({ Expires: AFTER_TWO_HOUR })
      })
    );
  });
});

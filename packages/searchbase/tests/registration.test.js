const {
  SearchBase,
  SearchComponent
} = require('../dist/@appbaseio/searchbase.cjs.js');

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';
const appbaseConfig = {
  recordAnalytics: true,
  enableQueryRules: true,
  userId: 'jon@appbase.io',
  customEvents: {
    platform: 'ios',
    device: 'iphoneX'
  }
};

describe('SearchBase: register', () => {
  test('should register a component with config', () => {
    const searchBase = new SearchBase({ index, url, credentials });
    const componentId = 'search-component';
    searchBase.register(componentId, {
      enablePredictiveSuggestions: true,
      dataField: ['name']
    });
    expect(searchBase.getComponent(componentId).id).toBe(componentId);
  });
  test('should register a component with SearchComponent instance', () => {
    const searchBase = new SearchBase({ index, url, credentials });
    const componentId = 'search';
    const searchComponent = new SearchComponent({
      index,
      url,
      credentials,
      id: componentId
    });
    searchBase.register(componentId, searchComponent);
    expect(searchBase.getComponent(componentId).id).toBe(componentId);
  });
});

describe('SearchComponent: appbaseConfig', () => {
  test('should inherit appbaseConfig from SearchBase', () => {
    const searchBase = new SearchBase({
      index,
      url,
      credentials,
      appbaseConfig
    });
    const componentId = 'search';

    const searchComponent = searchBase.register(componentId, {
      dataField: ['name']
    });
    expect(searchComponent.appbaseConfig).toBe(appbaseConfig);
  });
});

describe('SearchBase: unregister', () => {
  test('should unregister a component by id', () => {
    const searchBase = new SearchBase({ index, url, credentials });
    const componentId = 'search-component';
    searchBase.register(componentId, {
      enablePredictiveSuggestions: true,
      dataField: ['name']
    });
    searchBase.unregister(componentId);
    expect(searchBase.getComponent(componentId)).toBeFalsy();
  });
});

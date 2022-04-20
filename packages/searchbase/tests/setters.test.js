const {
  SearchBase,
  SearchComponent
} = require('./../dist/@appbaseio/searchbase.cjs');

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';

const query = {
  query: {
    match: {
      name: 'harry'
    }
  }
};

// field,  initialValue, updateValue
const settersTable = [
  ['dataField', 'name', ['name', 'repositories']],
  ['value', '', 'house'],
  ['size', 5, 10],
  ['from', 1, 2],
  ['includeFields', ['name'], ['name', 'description']],
  ['excludeFields', ['name'], ['name', 'description']],
  ['sortBy', 'asc', 'desc'],
  ['react', {}, { and: ['date-component'] }],
  ['fuzziness', '0', 3],
  ['after', {}, { date: '2015-10-01T06:00:00.000Z' }],
  ['defaultQuery', null, query],
  ['customQuery', null, query]
];

describe('SearchComponent: setter methods', () => {
  test.each(settersTable)('should set %s', (field, initialVal, updatedVal) => {
    const searchBase = new SearchBase({ index, url, credentials });
    const componentId = 'search-component';
    const capitalizedField = field[0].toUpperCase() + field.slice(1);
    const setterName = 'set' + capitalizedField;
    const searchComponent = searchBase.register(componentId, {
      [field]: initialVal
    });

    searchComponent.subscribeToStateChanges(change => {
      const fieldChange = change[field].next;
      if (Array.isArray(updatedVal))
        expect(fieldChange).toEqual(expect.arrayContaining(updatedVal));
      else expect(fieldChange).toEqual(updatedVal);
    });
    searchComponent[setterName](updatedVal, {
      stateChanges: true
    });
  });
});

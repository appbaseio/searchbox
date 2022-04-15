const {
  SearchBase,
  SearchComponent
} = require('./../dist/@appbaseio/searchbase.cjs');

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';

describe('SearchComponent: setter methods', () => {
  test('should set dataField', () => {
    const searchBase = new SearchBase({ index, url, credentials });
    const componentId = 'search-component';
    const nextDataFields = ['name', 'repositories'];
    const searchComponent = searchBase.register(componentId, {
      dataField: ['name']
    });
    searchComponent.subscribeToStateChanges(change => {
      const dataFieldChange = change.dataField.next;
      expect(dataFieldChange).toEqual(expect.arrayContaining(nextDataFields));
    });
    searchComponent.setDataField(nextDataFields, {
      stateChanges: true
    });
  });
  test('should set value', () => {
    const searchBase = new SearchBase({ index, url, credentials });
    const componentId = 'search-component';
    const nextValue = 'House';
    const searchComponent = searchBase.register(componentId, {
      value: ''
    });
    searchComponent.subscribeToStateChanges(change => {
      const valueChange = change.value.next;
      expect(valueChange).toBe(nextValue);
    });
    searchComponent.setValue(nextValue, {
      stateChanges: true
    });
  });
  test('should set size', () => {
    const searchBase = new SearchBase({ index, url, credentials });
    const componentId = 'search-component';
    const nextSize = 10;
    const searchComponent = searchBase.register(componentId, {
      size: 5
    });
    searchComponent.subscribeToStateChanges(change => {
      const sizeChange = change.size.next;
      expect(sizeChange).toBe(nextSize);
    });
    searchComponent.setSize(nextSize, {
      stateChanges: true
    });
  });
});

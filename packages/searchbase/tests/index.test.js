// TODO: handle coverage for _setError* (e.g. _setError, _setSuggestionError, etc..)
const Searchbase = require('./../dist/@appbaseio/searchbase.cjs');

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';

test('throw error if empty index', () => {
  try {
    /* eslint-disable-next-line */
    const searchbase = new Searchbase({});
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toEqual('Please provide a valid index.');
  }
});

test('throw error if empty url', () => {
  try {
    /* eslint-disable-next-line */
    const searchbase = new Searchbase({
      index
    });
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toEqual('Please provide a valid url.');
  }
});

test('throw error if empty dataField', () => {
  try {
    /* eslint-disable-next-line */
    const searchbase = new Searchbase({
      index,
      url
    });
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toEqual('Please provide a valid data field.');
  }
});

it('subscribeToStateChanges with string value `results`', async () => {
  expect.assertions(1);
  const searchbase = new Searchbase({
    index,
    url,
    dataField: 'original_title',
    credentials
  });
  searchbase.triggerQuery();
  searchbase.subscribeToStateChanges(() => {
    expect(true).toEqual(true);
  }, 'results');
  await new Promise(r => setTimeout(r, 4000));
});

it('transformResponse', async () => {
  expect.assertions(1);
  const searchbase = new Searchbase({
    index,
    url,
    dataField: 'original_title',
    credentials
  });
  searchbase.transformResponse = () =>
    new Promise(res => {
      return res({
        hits: {
          hits: [
            {
              id: 'custom_item'
            }
          ]
        }
      });
    });
  searchbase.triggerQuery();
  searchbase.subscribeToStateChanges(changes => {
    expect(changes.results.next.data).toEqual([
      {
        id: 'custom_item'
      }
    ]);
  }, 'results');
  await new Promise(r => setTimeout(r, 4000));
});

it('transformRequest', async () => {
  expect.assertions(1);
  const searchbase = new Searchbase({
    index,
    url,
    dataField: 'original_title',
    credentials
  });

  searchbase.transformRequest = requestOptions =>
    new Promise(res => {
      expect(true).toEqual(true);
      return res(requestOptions);
    });
  searchbase.triggerQuery();
  await new Promise(r => setTimeout(r, 4000));
});

it('transformQuery', async () => {
  expect.assertions(1);
  const searchbase = new Searchbase({
    index,
    url,
    dataField: 'original_title',
    credentials
  });

  searchbase.transformQuery = query =>
    new Promise(res => {
      expect(true).toEqual(true);
      return res({
        ...query,
        timeout: '1s'
      });
    });
  searchbase.triggerQuery();
  await new Promise(r => setTimeout(r, 4000));
});

it('transformSuggestionsQuery', async () => {
  expect.assertions(1);
  const searchbase = new Searchbase({
    index,
    url,
    dataField: 'original_title',
    credentials
  });

  searchbase.transformSuggestionsQuery = query =>
    new Promise(res => {
      expect(true).toEqual(true);
      return res({
        ...query,
        timeout: '1s'
      });
    });
  searchbase.triggerSuggestionsQuery();
  await new Promise(r => setTimeout(r, 4000));
});

it('beforeValueChange', async () => {
  expect.assertions(1);
  // eslint-disable-next-line no-unused-vars
  const searchbase = new Searchbase({
    index,
    url,
    dataField: 'original_title',
    credentials,
    value: 'harry',
    beforeValueChange: value =>
      new Promise(res => {
        expect(true).toEqual(true);
        return res(value);
      })
  });
  await new Promise(r => setTimeout(r, 4000));
});

// Events
it('onQueryChange', async () => {
  expect.assertions(1);
  // eslint-disable-next-line no-unused-vars
  const searchbase = new Searchbase({
    index,
    url,
    dataField: 'original_title',
    credentials
  });
  searchbase.onQueryChange = next => {
    expect(next).toEqual({
      query: {
        match_all: {}
      },
      size: 10,
      from: 0,
      _source: { includes: ['*'], excludes: [] }
    });
  };
  searchbase.triggerQuery();
  await new Promise(r => setTimeout(r, 4000));
});

it('onSuggestionsQueryChange', async () => {
  expect.assertions(1);
  // eslint-disable-next-line no-unused-vars
  const searchbase = new Searchbase({
    index,
    url,
    dataField: 'original_title',
    credentials
  });
  searchbase.onSuggestionsQueryChange = next => {
    expect(next).toEqual({
      query: {
        match_all: {}
      },
      size: 10
    });
  };
  searchbase.triggerSuggestionsQuery();
  await new Promise(r => setTimeout(r, 4000));
});

test('suggestions with subscribeToStateChanges', () => {
  const searchbase = new Searchbase({
    index,
    url,
    credentials,
    dataField: 'original_title'
  });
  searchbase.subscribeToStateChanges(({ suggestions }) => {
    expect(suggestions.prev.data).toEqual([]);
    expect(suggestions.next.data).toEqual([
      { label: 'hello', value: 'world', source: { _id: 123 } }
    ]);
  });
  searchbase.setSuggestions([
    { label: 'hello', value: 'world', source: { _id: 123 } }
  ]);
});

describe('set [value, results, suggestions]', () => {
  let searchbase;
  beforeEach(() => {
    searchbase = new Searchbase({
      index,
      url,
      credentials,
      dataField: 'original_title'
    });
  });
  test('onValueChange', () => {
    searchbase.onValueChange = (next, prev) => {
      expect(prev).toEqual('');
      expect(next).toEqual('hello world');
    };
    searchbase.setValue('hello world');
  });
  test('onResultChange', () => {
    searchbase.onResults = (next, prev) => {
      expect(prev.data).toEqual([]);
      expect(next.data).toEqual([{ key: 'value' }]);
    };
    searchbase.setResults([{ key: 'value' }]);
  });
  test('onSuggestionsChange', () => {
    searchbase.onSuggestions = (next, prev) => {
      expect(prev.data).toEqual([]);
      expect(next.data).toEqual([
        { label: 'hello', value: 'world', source: { _id: 123 } }
      ]);
    };
    searchbase.setSuggestions([
      { label: 'hello', value: 'world', source: { _id: 123 } }
    ]);
  });
});

test('should query with and operator `and` field weight', () => {
  expect(
    Searchbase.shouldQuery(
      'hello world',
      [{ field: 'original_title.search', weight: 50 }, '_id'],
      { queryFormat: 'and' }
    )
  ).toEqual([
    {
      multi_match: {
        query: 'hello world',
        fields: ['original_title.search^50', '_id'],
        type: 'cross_fields',
        operator: 'and'
      }
    },
    {
      multi_match: {
        query: 'hello world',
        fields: ['original_title.search^50', '_id'],
        type: 'phrase_prefix',
        operator: 'and'
      }
    }
  ]);
});

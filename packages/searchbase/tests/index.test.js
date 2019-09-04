const IndexTest = require('../dist/@appbaseio/searchbase.cjs');

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';

test('throw error if empty index', () => {
  try {
    /* eslint-disable-next-line */
    const searchbase = new IndexTest({});
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toEqual('Please provide a valid index.');
  }
});

test('throw error if empty url', () => {
  try {
    /* eslint-disable-next-line */
    const searchbase = new IndexTest({
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
    const searchbase = new IndexTest({
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
  const searchbase = new IndexTest({
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
  const searchbase = new IndexTest({
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
  const searchbase = new IndexTest({
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
  const searchbase = new IndexTest({
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

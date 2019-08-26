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
    query: {
      size: 5,
      from: 1,
      query: {
        term: {
          original_title: 'Harry Potter'
        }
      }
    },
    credentials
  });
  searchbase.subscribeToStateChanges(value => {
    expect(true).toEqual(true);
  }, 'results');
  await new Promise(r => setTimeout(r, 4000));
});

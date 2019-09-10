import SearchbaseJS from '@appbaseio/searchbase-js';

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';

// eslint-disable-next-line
new SearchbaseJS({
  search: 'search',
  index,
  credentials,
  renderNoSuggestion: 'No Results To Show.',
  dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics'],
  url
});

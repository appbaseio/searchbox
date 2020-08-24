import searchbox from '@appbaseio/searchbox';
import Searchbase from '@appbaseio/searchbase';

const instance = new Searchbase({
  index: 'good-books-ds',
  credentials: 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
  url: 'https://arc-cluster-appbase-demo-6pjy6z.searchbase.io',
  dataField: ['original_title', 'original_title.search'],
  size: 5
});

instance.triggerQuery();

const micButton = document.getElementById('voice');
const input = document.getElementById('input');

micButton.addEventListener('click', () => {
  instance.onMicClick(null, {
    triggerSuggestionsQuery: true
  });
});

instance.onMicStatusChange = status => {
  switch (status) {
    case 'ACTIVE':
      micButton.className = 'voice active';
      break;
    case 'DENIED':
      micButton.className = 'voice disabled';
      break;
    default:
      micButton.className = 'voice';
  }
};

instance.onValueChange = value => {
  input.value = value.toLowerCase();
  micButton.className = 'voice';
};

searchbox('#input', { instance, openOnFocus: true }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      },
      empty: function() {
        return `<div>No Results</div>`;
      },
      loader: function() {
        return `<div class="loader">Loading...</div>`;
      }
    }
  }
]);

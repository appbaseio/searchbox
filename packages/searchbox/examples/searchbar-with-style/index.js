import searchbox from '@appbaseio/searchbox';
import Searchbase from '@appbaseio/searchbase';

const instance = new Searchbase({
  index: 'good-books-ds',
  credentials: 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
  url: 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io',
  dataField: ['original_title', 'original_title.search'],
  size: 5
});

const micButton = document.getElementById('voice');

micButton.addEventListener('click', () => {
  instance.onMicClick(null);
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

const sbInstance = searchbox('#input', { instance, openOnFocus: true }, [
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

instance.onValueChange = value => {
  sbInstance.autocomplete.setVal(value.toLowerCase());
  const input = sbInstance[0];
  input.focus();
  micButton.className = 'voice';
};

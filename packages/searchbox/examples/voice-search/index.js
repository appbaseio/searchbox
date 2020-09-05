import Searchbase from '@appbaseio/searchbase';
import searchbox from '@appbaseio/searchbox';

import './styles.css';

const instance = new Searchbase({
  index: 'gitxplore-app',
  credentials: 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
  url: 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io',
  size: 5,
  dataField: [
    'fullname',
    'fullname.autosuggest',
    'fullname.keyword',
    'fullname.lang',
    'fullname.search',
    'fullname.synonyms',
    'name',
    'name.autosuggest',
    'name.keyword',
    'name.lang',
    'name.search',
    'name.synonyms',
    'owner',
    'owner.autosuggest',
    'owner.keyword',
    'owner.lang',
    'owner.search',
    'owner.synonyms'
  ]
});

const micButton = document.getElementById('voice');

micButton.addEventListener('click', () => {
  instance.onMicClick(null);
});

instance.onMicStatusChange = status => {
  switch (status) {
    case 'ACTIVE':
      micButton.innerText = 'Listening';
      micButton.className = 'btn btn-primary';
      break;
    case 'DENIED':
      micButton.innerText = 'Enable Voice';
      micButton.className = 'btn btn-info btn-disable';
      break;
    default:
      micButton.innerText = 'Voice Search';
  }
};

const sbInstance = searchbox('#git', { instance, openOnFocus: true }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      },
      empty: function() {
        return `<div>No Results</div>`;
      },
      loader: function() {
        return `<div>Loader</div>`;
      },
      footer: function({ query, isEmpty }) {
        return `
                    <div style="background: #eaeaea; padding: 10px;">Footer</div>
                `;
      },
      header: function({ query, isEmpty }) {
        return `
                    <div style="background: #efefef; padding: 10px;">
                        Hello From Header
                    </div>
                `;
      }
    }
  }
]);


instance.onValueChange = value => {
  sbInstance.autocomplete.setVal(value.toLowerCase());
  const input = sbInstance[0];
  input.focus();
  micButton.innerText = 'Voice Search';
  micButton.className = 'btn btn-light';
};

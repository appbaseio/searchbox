import { SearchBase } from '@appbaseio/searchbase';
import Autocomplete from '@trevoreyre/autocomplete-js';
import '../styles.css';

const index = 'gitxplore-app';
const url =
  'https://appbase-demo-ansible-abxiydt-arc.searchbase.io.searchbase.io';
const credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';

document.body.innerHTML = `
  <div id="autocomplete" class="autocomplete">
    <input class="autocomplete-input" id="input" />
    <ul class="autocomplete-result-list"></ul>
  </div>
  <div id="selected">

  </div>
`;

const input = document.getElementById('input');
const selectedSuggestion = document.getElementById('selected');

const searchbase = new SearchBase({
  index,
  url,
  credentials
});

// Register search component => To render the suggestions
searchbase.register('search-component', {
  dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics'],
  clearFiltersOnQueryChange: true
});

// Register result component with react dependency on search component => To render the results
searchbase.register('result-component', {
  dataField: 'name',
  react: {
    and: 'search-component'
  }
});

// Get the search component controller by component id
const searchComponent = searchbase.getComponent('search-component');

// Get the result component controller by component id
const resultComponent = searchbase.getComponent('result-component');

const handleInput = e => {
  // Set the value to fetch the suggestions
  searchComponent.setValue(e.target.value);
};

input.addEventListener('input', handleInput);

const handleKeyPress = e => {
  // Fetch the results
  if (e.key === 'Enter') {
    e.preventDefault();
    searchComponent.triggerCustomQuery();
  }
};

input.addEventListener('keydown', handleKeyPress);

// Fetch initial results
resultComponent.triggerDefaultQuery();

searchComponent.subscribeToStateChanges(
  change => {
    console.log('Track State Updates', change);
  },
  ['value', 'results']
);

resultComponent.onResults = results => {
  const items = results.data.map(i => {
    return `<div class="suggestion">
        <div>
          <img src=${i.avatar} alt=${i.name} />
        </div>
        <div>
        <h4>${i.name}</h4>
        <p>${i.description}</p>
        </div>
      </div>`;
  });

  selectedSuggestion.innerHTML = items.join('<br>');
};

searchComponent.onValueChange = value => {
  console.log('Value Updated to', value);
};

// eslint-disable-next-line
new Autocomplete('#autocomplete', {
  search: () => {
    return searchComponent.suggestions;
  },
  getResultValue: result => result.label,
  renderResult: (result, props) => `
    <li ${props}>
      <div class="suggestion">
        <div>
          <img src=${result.source.avatar} alt=${result.label} />
        </div>
        <div>
        <h4>${result.label}</h4>
        <p>${result.source.description}</p>
        </div>
      </div>
    </li>
  `,
  onSubmit: result => {
    if (result) {
      console.log('Selected', result);
      searchComponent.setValue(input.value, {
        // Trigger query for dependent components to update results
        triggerDefaultQuery: false,
        triggerCustomQuery: true
      });
    }
  }
});

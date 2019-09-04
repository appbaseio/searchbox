import Searchbase from '@appbaseio/searchbase';
import Autocomplete from '@trevoreyre/autocomplete-js';
import '../styles.css';

const index = 'gitxplore-latest-app';
const url = 'https://scalr.api.appbase.io';
const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';

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

const searchBase = new Searchbase({
  index,
  url,
  dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics'],
  credentials
});

const handleInput = e => {
  searchBase.setValue(e.target.value, {
    triggerSuggestionsQuery: true
  });
};

input.addEventListener('input', handleInput);

searchBase.triggerQuery();

searchBase.subscribeToStateChanges(() => {
  console.log('Track State Updates');
});

searchBase.onResults = results => {
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

searchBase.onValueChange = value => {
  console.log('Value Updated to', value);
};

// eslint-disable-next-line
new Autocomplete('#autocomplete', {
  search: () => {
    return searchBase.suggestions.data;
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
      searchBase.setValue(input.value, {
        triggerQuery: true
      });
    }
  }
});

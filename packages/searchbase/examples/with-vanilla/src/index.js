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

searchBase.triggerQuery();

input.value = searchBase.value;
input.addEventListener('change', searchBase.onChange);

searchBase.subscribeToStateChanges(() => {
  // If we press enter key than autocomplete box is closed.
  // Handling a edge case.

  if (input.value) {
    input.blur();
    input.focus();
  }
});

// eslint-disable-next-line
new Autocomplete('#autocomplete', {
  search: () => {
    return searchBase.results.data;
  },
  getResultValue: result => result.name,
  renderResult: (result, props) => `
    <li ${props}>
      <div class="suggestion">
        <div>
          <img src=${result.avatar} alt=${result.name} />
        </div>
        <div>
        <h4>${result.name}</h4>
        <p>${result.description}</p>
        </div>
      </div>
    </li>
  `,
  onSubmit: result => {
    selectedSuggestion.innerHTML = `
    <h4>Suggestion Selected</h4>
    <div class="suggestion selected">
        <div>
          <img src=${result.avatar} alt=${result.name} />
        </div>
        <div>
          <h4>${result.name}</h4>
          <p>${result.stars} Stars</p>
        </div>
      </div>`;
  }
});

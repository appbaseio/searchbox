import { SearchBase } from '@appbaseio/searchbase';
import Autocomplete from '@trevoreyre/autocomplete-js';
import '../styles.css';

const index = 'gitxplore-app';
const url = 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io';
const credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';

document.body.innerHTML = `
  <div id="root">
    <h2 class="text-center">Searchbase Demo with Facet</h2>
    <div id="autocomplete" class="autocomplete">
      <input class="autocomplete-input" id="input" />
      <ul class="autocomplete-result-list"></ul>
    </div>
    <div class="row">
      <div class="col">
        <div class="filter" id="language-filter"></div>
      </div>
      <div class="col">
        <div id="results">
          <div class="loading">Loading results... </div>
        </div>
      </div>
    </div>
  </div>
`;

const input = document.getElementById('input');
const resultElement = document.getElementById('results');

const searchbase = new SearchBase({
  index,
  url,
  credentials
});

// Register search component => To render the suggestions
const searchComponent = searchbase.register('search-component', {
  // dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics'],
  clearOnQueryChange: true,
  enablePredictiveSuggestions: true,
  size: 5
});

// Register filter component with dependency on search component
const filterComponent = searchbase.register('language-filter', {
  type: 'term',
  dataField: 'language.keyword',
  aggregationSize: 10,
  react: {
    and: 'search-component'
  }
});

// Register result component with react dependency on search and filter component => To render the results
const resultComponent = searchbase.register('result-component', {
  dataField: 'name',
  react: {
    and: ['search-component', 'language-filter']
  },
  defaultQuery: () => ({
    track_total_hits: true
  })
});

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

resultComponent.subscribeToStateChanges(
  change => {
    const results = change.results.next;
    const items = results.data.map(i => {
      return `
    <div class="result-set">
      <div class="image">
        <img src=${i.avatar} alt=${i.name} />
      </div>
      <div class="details">
        <h4>${i.name}</h4>
        <p>${i.description}</p>
      </div>
    </div>`;
    });
    const resultStats = `<p class="results-stats">
                          Showing ${results.numberOfResults} in ${results.time}ms
                        <p>`;
    resultElement.innerHTML = `${resultStats}${items.join('')}`;
  },
  ['results']
);

// Fetch initial filter options
filterComponent.triggerDefaultQuery();

filterComponent.subscribeToStateChanges(
  change => {
    const aggregations = change.aggregationData.next;
    const container = document.getElementById('language-filter');
    container.innerHTML = '';
    aggregations.data.forEach(i => {
      if (i._key) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = i._key;
        checkbox.id = i._key;
        checkbox.onclick = () => {
          const values = filterComponent.value || [];
          if (values && values.includes(i._key)) {
            values.splice(values.indexOf(i._key), 1);
          } else {
            values.push(i._key);
          }
          // Set filter value and trigger custom query
          filterComponent.setValue(values, {
            triggerDefaultQuery: false,
            triggerCustomQuery: true
          });
        };
        const label = document.createElement('label');
        label.htmlFor = i._key;
        label.innerHTML = `${i._key}(${i._doc_count})`;
        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
      }
    });
  },
  ['aggregationData']
);

searchComponent.subscribeToStateChanges(
  change => {
    console.log('Track State Updates', change);
  },
  ['value', 'results']
);

searchComponent.onValueChange = value => {
  console.log('Value Updated to', value);
};

// eslint-disable-next-line
new Autocomplete('#autocomplete', {
  search: () => {
    return searchComponent.results?.data ?? [];
  },
  getResultValue: result => result.label,
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

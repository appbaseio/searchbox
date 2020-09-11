import { SearchBase } from '@appbaseio/searchbase';
import Autocomplete from '@trevoreyre/autocomplete-js';
import '../styles.css';

const index = 'gitxplore-app';
const url = 'https://@arc-cluster-appbase-demo-6pjy6z.searchbase.io';
const credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';

document.body.innerHTML = `
  <div id="autocomplete" class="autocomplete">
    <input class="autocomplete-input" id="input" />
    <ul class="autocomplete-result-list"></ul>
  </div>
  <div class="layout">
    <div class="filter" id="language-filter">
    </div>
    <div id="results">
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
searchbase.register('search-component', {
  dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics']
});

// Register filter component with dependency on search component
searchbase.register('language-filter', {
  type: 'term',
  dataField: 'language.keyword',
  react: {
    and: 'search-component'
  }
});

// Register result component with react dependency on search and filter component => To render the results
searchbase.register('result-component', {
  dataField: 'name',
  react: {
    and: ['search-component', 'language-filter']
  }
});

// Get the search component controller by component id
const searchComponent = searchbase.getComponent('search-component');

// Get the result component controller by component id
const resultComponent = searchbase.getComponent('result-component');

// Get the filter component controller by component id
const filterComponent = searchbase.getComponent('language-filter');

const handleInput = e => {
  // Set the value to fetch the suggestions
  searchComponent.setValue(e.target.value);
};

input.addEventListener('input', handleInput);

// Fetch initial results
resultComponent.triggerDefaultQuery();

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

  resultElement.innerHTML = items.join('<br>');
};

// Fetch initial filter options
filterComponent.triggerDefaultQuery();

filterComponent.onAggregationData = aggregations => {
  const container = document.getElementById('language-filter');
  container.innerHTML = '';
  aggregations.data.forEach(i => {
    if (i._key) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = i._key;
      checkbox.value = i._key;
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
      container.appendChild(checkbox);
      container.appendChild(label);
      container.appendChild(document.createElement('br'));
    }
  });
};

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

  resultElement.innerHTML = items.join('<br>');
};

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
    return searchComponent.getSuggestions();
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

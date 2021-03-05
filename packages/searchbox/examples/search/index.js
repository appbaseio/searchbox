import searchbox from '@appbaseio/searchbox';
import Searchbase from '@appbaseio/searchbase';

const instance = new Searchbase({
  index: 'gitxplore-app',
  credentials: 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
  url: 'https://appbase-demo-ansible-abxiydt-arc',
  size: 5,
  dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics']
});

const popularSuggestionsInstance = new Searchbase({
  index: 'good-books-clone',
  credentials: 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
  url: 'https://appbase-demo-ansible-abxiydt-arc',
  size: 5,
  dataField: ['original_title', 'original_title.search'],
  enablePopularSuggestions: true,
  enableAppbase: true,
  appbaseConfig: { recordAnalytics: false }
});

const analyticsInstance = new Searchbase({
  index: 'movies-store-app',
  credentials: 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
  url: 'https://appbase-demo-ansible-abxiydt-arc',
  size: 5,
  analytics: true,
  dataField: [
    'original_title',
    'original_title.autosuggest',
    'original_title.english',
    'original_title.keyword',
    'original_title.search'
  ]
});

searchbox('#git', { instance }, [
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

searchbox('#git2', { hint: false, instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    }
  }
]);

searchbox('#git3', { autoselect: true, instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    }
  }
]);

searchbox('#git4', { clearOnSelected: true, instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    }
  }
]);

searchbox('#git5', { openOnFocus: true, instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    }
  }
]);

searchbox('#git6', { keyboardShortcuts: ['s', 'a'], instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    }
  }
]);

searchbox('#git7', { minLength: 3, instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    }
  }
]);

searchbox('#git8', { instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    }
  }
])
  .on('selected', function(event, suggestion, dataset, context) {
    console.log('selected', suggestion, dataset, context);
  })
  .on('cursorchanged', function(event, suggestion, dataset) {
    console.log('cursorchanged', suggestion, dataset);
  })
  .on('opened', function(event) {
    console.log('opened', event);
  })
  .on('shown', function(event) {
    console.log('shown', event);
  })
  .on('empty', function(event) {
    console.log('empty', event);
  });

searchbox('#git9', { instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    },
    debounce: 1000
  }
]);

searchbox('#git10', { instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    },
    displayKey: function(suggestion) {
      return 'Awesome ' + suggestion.label + ' Blossom';
    }
  }
]);

searchbox('#git11', { instance: analyticsInstance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      }
    }
  }
]);

searchbox('#git12', { instance }, [
  {
    templates: {
      suggestion: function(suggestion) {
        return `<p class="is-4">${suggestion.label}</p>`;
      },
      loader: function() {
        return `<p>Loading Things</p>`;
      }
    }
  }
]);

searchbox(
  '#git13',
  {
    instance: analyticsInstance
  },
  [
    {
      templates: {
        suggestion: function(suggestion) {
          if (suggestion.source._promoted) {
            return `<p class="is-4">${suggestion.label} <span class="badge badge-primary">Promoted</span></p>`;
          }
          return `<p class="is-4">${suggestion.label}</p>`;
        }
      }
    }
  ]
);

searchbox(
  '#git14',
  {
    instance: analyticsInstance
  },
  [
    {
      templates: {
        render: function({ data, getItemProps, promotedData, resultStats }) {
          const suggestionHTML = data
            .filter(i => !i.source._promoted)
            .reduce((agg, i) => {
              return (
                agg +
                `
									<div ${getItemProps(i)}>
										${i.label}
									</div>
								`
              );
            }, '');
          const promotedHTML = data
            .filter(i => !!i.source._promoted)
            .reduce((agg, i) => {
              return (
                agg +
                `
									<div ${getItemProps(i)}>
										${i.label}
									</div>
								`
              );
            }, '');

          if (resultStats.promoted) {
            return `
							<div class="shadow-sm p-2 text-light bg-primary">
								Promoted Results
							</div>
							${promotedHTML}
							<div class="shadow-sm p-2 text-light bg-primary">
								Search Results
							</div>
							${suggestionHTML}
							<div class="shadow-sm p-2 text-dark bg-light">
								Found ${resultStats.numberOfResults} in ${resultStats.time}ms
							</div>
						`;
          }
          return `
						<div class="shadow-sm p-2 text-light bg-primary">
							Search Results
						</div>
						${suggestionHTML}
						<div class="shadow-sm p-2 text-muted bg-light">
							Found ${resultStats.numberOfResults} in ${resultStats.time}ms
						</div>
					`;
        }
      }
    }
  ]
);

searchbox(
  '#git15',
  {
    instance: popularSuggestionsInstance
  },
  [
    {
      templates: {
        render: function({ data, getItemProps, popularSuggestions }) {
          const suggestionHTML = (popularSuggestions || [])
            .concat(data)
            .filter(i => !i.source._promoted)
            .reduce((agg, i) => {
              return (
                agg +
                `
									<div ${getItemProps(i)}>
										${i.label}
									</div>
								`
              );
            }, '');
          return `
						<div class="shadow-sm p-2 text-light bg-primary">
							Search Results
						</div>
						${suggestionHTML}
					`;
        }
      }
    }
  ]
);

searchbox(
  '#git16',
  {
    instance: popularSuggestionsInstance
  },
  [
    {
      templates: {
        render: function({ data, getItemProps }) {
          const suggestionHTML = data
            .filter(i => !i.source._promoted)
            .reduce((agg, i) => {
              return (
                agg +
                `
									<div ${getItemProps(i)}>
										${i.label}
									</div>
								`
              );
            }, '');
          return `
						<div class="shadow-sm p-2 text-light bg-primary">
							Search Results
						</div>
						${suggestionHTML}
					`;
        },
        renderPopularSuggestions: function({ data, getItemProps }) {
          const suggestionHTML = (data || [])
            .filter(i => !i.source._promoted)
            .reduce((agg, i) => {
              return (
                agg +
                `
									<div ${getItemProps(i)}>
										${i.label}
									</div>
								`
              );
            }, '');
          if ((data || []).length === 0) return '';
          return `
						<div class="shadow-sm p-2 text-light bg-primary">
							Popular Suggestion Results
						</div>
						${suggestionHTML}
					`;
        }
      }
    }
  ]
);

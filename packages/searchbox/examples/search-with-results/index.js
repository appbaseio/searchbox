import searchbox from '@appbaseio/searchbox';
import Searchbase from '@appbaseio/searchbase';

const instance = new Searchbase({
  index: 'gitxplore-app',
  credentials: 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61',
  url: 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io',
  size: 5,
  dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics']
});

const resultElement = document.getElementById('root');

instance.onResults = ({ data }) => {
  const resultMarkup = data.map(item => {
    return `
			<div class="col-md-6 col-sm-12 my-2">
				<div class="card">
					<div class="row no-gutters">
						<div class="col-md-4">
						<img src="${item.avatar}" class="card-img" alt="${item.name}">
						</div>
						<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">${item.name}</h5>
							<p class="card-text">${item.description}</p>
						</div>
						</div>
					</div>
				</div>
			</div>
		`;
  });

  resultElement.innerHTML = resultMarkup.join('\n');
};

instance.onRequestStatusChange = status => {
  if (status === 'PENDING') {
    resultElement.innerHTML = `
			<div class="spinner-border" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		`;
  }
};

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
]).on('selected', function(event, suggestion) {
  instance.setValue(suggestion.value, {
    triggerQuery: true
  });
});

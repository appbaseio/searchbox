import Searchbase from '@appbaseio/searchbase';
import searchbox from '@appbaseio/searchbox';

import './styles.css';

const instance = new Searchbase({
	index: 'gitxplore-latest-app',
	credentials: 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38',
	url: 'https://scalr.api.appbase.io',
	size: 5,
	dataField: [
		'name',
		'name.keyword',
		'name.search',
		'description',
		'name.raw',
		'fullname',
		'owner',
		'topics'
	],
	analytics: true
});

instance.triggerQuery();

const micButton = document.getElementById('voice');
const input = document.getElementById('git');

micButton.addEventListener('click', () => {
	instance.onMicClick(null, { triggerSuggestionsQuery: true });
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

instance.onValueChange = value => {
	input.value = value.toLowerCase();
	micButton.className = 'btn btn-light';
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
]);

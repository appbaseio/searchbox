import VueTypes from 'vue-types';
import { isEqual, checkValidValue } from '../utils/helper';

const URLParamsProvider = {
	name: 'URLParamsProvider',
	inject: ['searchbase'],
	props: {
		id: VueTypes.string.isRequired
	},
	mounted() {
		const { id } = this.$props;
		if (window) {
			this.init();

			window.addEventListener('popstate', () => {
				const options = {
					triggerCustomQuery: true,
					triggerDefaultQuery: true,
					stateChanges: true
				};
				this.init();
				const componentInstance = this.getComponentInstance();
				if (componentInstance) {
					if (this.params.has(id)) {
						// Set component value
						try {
							let paramValue = JSON.parse(this.params.get(id));
							let category;
							if (typeof paramValue === 'object' && paramValue.category) {
								category = paramValue.category;
								paramValue = paramValue.value;

								componentInstance.setCategoryValue(category, {
									triggerCustomQuery: false,
									triggerDefaultQuery: false,
									stateChanges: false
								});
							}
							if (!isEqual(componentInstance.value, paramValue)) {
								componentInstance.setValue(paramValue, {
									...options									
								});
							}
						} catch (e) {
							console.error(e);
							// Do not set value if JSON parsing fails.
						}
					} else if (componentInstance.value) {
						// Remove inactive componentInstance
						componentInstance.setValue(null, options);
					}
				}
			});

			const component = this.getComponentInstance();
			if (component) {
				component.subscribeToStateChanges(
					change => {
						this.init();
						// this ensures the url params change are handled
						// when the url changes, which enables us to
						// make `onpopstate` event handler work with history.pushState updates
						this.checkForURLParamsChange();
						// Set URLParams on value change
						// Only set the valid values
						if (checkValidValue(change.value.next)) {
							// stringify the values
							let valueParam = change.value.next;
							if (component.categoryValue) {
								valueParam = {
									value: change.value.next,
									category: component.categoryValue
								};
							}
							this.params.set(id, JSON.stringify(valueParam));
						} else {
							this.params.delete(id);
						}
						// Update URLParam
						this.pushToHistory();
					},
					['value']
				);
			}
		}
	},
	beforeDestroy() {
		const { id } = this.$props;
		// Remove param on unmount
		this.params.delete(id);
	},
	methods: {
		getComponentInstance() {
			return this.searchbase.getComponent(this.$props.id);
		},
		init() {
			this.searchString = window.location.search;
			this.params = new URLSearchParams(this.searchString);
		},
		checkForURLParamsChange() {
			// we only compare the search string (window.location.search by default)
			// to see if the route has changed (or) not. This handles the following usecase:
			// search on homepage -> route changes -> search results page with same search query
			if (window) {
				const searchString = window.location.search;

				if (searchString !== this.searchString) {
					let event;
					if (typeof Event === 'function') {
						event = new Event('popstate');
					} else {
						// Correctly fire popstate event on IE11 to prevent app crash.
						event = document.createEvent('Event');
						event.initEvent('popstate', true, true);
					}

					window.dispatchEvent(event);
				}
			}
		},
		pushToHistory() {
			const paramsSting = this.params.toString()
				? `?${this.params.toString()}`
				: '';
			const base = window.location.href.split('?')[0];
			const newURL = `${base}${paramsSting}`;

			if (window.history.pushState) {
				window.history.pushState({ path: newURL }, '', newURL);
			}
			this.init();
		}
	},
	render() {
		return this.$slots.default ? <div>{this.$slots.default}</div> : null;
	}
};

URLParamsProvider.install = function(Vue) {
	Vue.component(URLParamsProvider.name, URLParamsProvider);
};

export default URLParamsProvider;

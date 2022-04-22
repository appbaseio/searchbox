import VueTypes from 'vue-types';
import { types } from '../utils/types';
import { getCamelCase, LIBRARY_ALIAS } from '../utils/helper';
import URLParamsProvider from './URLParamsProvider.jsx';


const SearchComponent = {
	name: 'search-component',
	inject: ['searchbase'],
	props: {
		index: VueTypes.string,
		url: VueTypes.string,
		credentials: VueTypes.string,
		headers: VueTypes.object,
		appbaseConfig: types.appbaseConfig,
		transformRequest: VueTypes.func,
		transformResponse: VueTypes.func,
		beforeValueChange: VueTypes.func,
		enablePopularSuggestions: VueTypes.bool,
		enablePredictiveSuggestions: VueTypes.bool,
		maxPopularSuggestions: VueTypes.number,
		clearOnQueryChange: VueTypes.bool,
		showDistinctSuggestions: types.showDistinctSuggestions,
		URLParams: VueTypes.bool,
		// RS API properties
		id: VueTypes.string.isRequired,
		value: VueTypes.any,
		type: types.queryTypes,
		react: types.reactType,
		queryFormat: types.queryFormat,
		dataField: types.dataField,
		categoryField: VueTypes.string,
		categoryValue: VueTypes.string,
		nestedField: VueTypes.string,
		from: VueTypes.number,
		size: VueTypes.number,
		sortBy: types.sortType,
		aggregationField: VueTypes.string,
		aggregationSize: VueTypes.number,
		after: VueTypes.object,
		includeNullValues: VueTypes.bool,
		includeFields: types.sourceFields,
		excludeFields: types.sourceFields,
		fuzziness: types.fuzziness,
		searchOperators: VueTypes.bool,
		highlight: VueTypes.bool,
		highlightField: VueTypes.string,
		customHighlight: VueTypes.object,
		interval: VueTypes.number,
		aggregations: VueTypes.arrayOf(VueTypes.string),
		missingLabel: VueTypes.string,
		showMissing: VueTypes.bool,
		defaultQuery: VueTypes.func,
		customQuery: VueTypes.func,
		enableSynonyms: VueTypes.bool,
		selectAllLabel: VueTypes.string,
		pagination: VueTypes.bool,
		queryString: VueTypes.bool,
		preserveResults: VueTypes.bool,
		render: VueTypes.func,
		distinctField: VueTypes.string,
		distinctFieldConfig: VueTypes.object,
		// subscribe on changes,
		subscribeTo: VueTypes.arrayOf(VueTypes.string),
		triggerQueryOnInit: VueTypes.bool.def(true),
		recentSuggestionsConfig: VueTypes.object,
		popularSuggestionsConfig: VueTypes.object,
		maxPredictedWords: VueTypes.number,
		urlField: VueTypes.string,
		rankFeature: VueTypes.object,
		enableRecentSearches: VueTypes.bool,
		enableRecentSuggestions: VueTypes.bool,
		applyStopwords: VueTypes.bool,
		stopwords: VueTypes.arrayOf(VueTypes.string),
		// meta info about instantiated component
		componentName: VueTypes.oneOf(['SearchBox', 'SearchComponent']).def(
			'SearchComponent'
		),
		// mongodb specific
		autocompleteField: types.dataField,
		highlightConfig: VueTypes.object,
		mongodb: VueTypes.object,
	},
	data() {
		return {
			searchState: {}
		};
	},
	created() {
		// clone the props for component it is needed because $options gets changed on time
		let componentProps = this.$props;
		if (this.$options && this.$options.propsData) {
			componentProps = { ...this.$options.propsData };
		}
		// handle kebab case for props
		const parsedProps = {};
		Object.keys(componentProps).forEach(key => {
			parsedProps[getCamelCase(key)] = componentProps[key];
		});
		this.rawProps = parsedProps;
		const {
			id,
			index,
			url,
			credentials,
			headers,
			appbaseConfig,
			transformRequest,
			transformResponse,
			type,
			react,
			queryFormat,
			dataField,
			categoryField,
			categoryValue,
			nestedField,
			from,
			size,
			sortBy,
			aggregationField,
			aggregationSize,
			after,
			includeNullValues,
			includeFields,
			excludeFields,
			fuzziness,
			searchOperators,
			highlight,
			highlightField,
			customHighlight,
			interval,
			aggregations,
			missingLabel,
			showMissing,
			defaultQuery,
			customQuery,
			enableSynonyms,
			selectAllLabel,
			pagination,
			queryString,
			enablePopularSuggestions,
			maxPopularSuggestions,
			enablePredictiveSuggestions,
			showDistinctSuggestions,
			subscribeTo,
			preserveResults,
			clearOnQueryChange,
			distinctField,
			distinctFieldConfig,
			enableRecentSearches,
			enableRecentSuggestions,
			recentSuggestionsConfig,
			popularSuggestionsConfig,
			maxPredictedWords,
			urlField,
			rankFeature,
			applyStopwords,
			stopwords,
			mongodb,
			autocompleteField,
			highlightConfig
		} = this.rawProps;
		let { value } = this.rawProps;
		if (window && window.location && window.location.search) {
			const params = new URLSearchParams(window.location.search);
			if (params.has(id)) {
				try {
					value = JSON.parse(params.get(id));
				} catch (e) {
					console.error(e);
					// Do not set value if JSON parsing fails.
				}
			}
		}
		const componentInstance = this.searchbase.register(id, {
			index,
			url,
			credentials,
			headers,
			appbaseConfig,
			transformRequest,
			transformResponse,
			value,
			type,
			react,
			queryFormat,
			dataField,
			categoryField,
			categoryValue,
			nestedField,
			from,
			size,
			sortBy,
			aggregationField,
			aggregationSize,
			after,
			includeNullValues,
			includeFields,
			excludeFields,
			fuzziness,
			searchOperators,
			highlight,
			highlightField,
			customHighlight,
			interval,
			aggregations,
			missingLabel,
			showMissing,
			defaultQuery,
			customQuery,
			enableSynonyms,
			selectAllLabel,
			pagination,
			queryString,
			enablePopularSuggestions,
			maxPopularSuggestions,
			enablePredictiveSuggestions,
			showDistinctSuggestions,
			preserveResults,
			clearOnQueryChange,
			distinctField,
			distinctFieldConfig,
			enableRecentSearches,
			enableRecentSuggestions,
			recentSuggestionsConfig,
			popularSuggestionsConfig,
			maxPredictedWords,
			urlField,
			rankFeature,
			applyStopwords,
			stopwords,
			componentName: this.$props.componentName,
			mongodb,
			autocompleteField,
			highlightConfig,
			onValueChange: (prev, next) => {
				this.$emit('value', {
					prev,
					next
				});
			},
			onResults: (prev, next) => {
				this.$emit('results', {
					prev,
					next
				});
			},
			onAggregationData: (prev, next) => {
				this.$emit('aggregationData', {
					prev,
					next
				});
			},
			onError: (prev, next) => {
				this.$emit('error', {
					prev,
					next
				});
			},
			onRequestStatusChange: (prev, next) => {
				this.$emit('requestStatus', {
					prev,
					next
				});
			},
			onQueryChange: (prev, next) => {
				this.$emit('query', {
					prev,
					next
				});
			},
			onMicStatusChange: (prev, next) => {
				this.$emit('micStatus', {
					prev,
					next
				});
			},
			libAlias: LIBRARY_ALIAS.VUE_SEARCHBOX
		});
		Object.keys(componentInstance.mappedProps).forEach(key => {
			this.$set(this.searchState, key, componentInstance.mappedProps[key]);
		});
		// Subscribe to state changes only when slot is defined
		componentInstance.subscribeToStateChanges(change => {
			Object.keys(change).forEach(() => {
				this.searchState = componentInstance.mappedProps;
			});
		}, subscribeTo);

		if ((value || customQuery) && this.componentInstance) {
			this.componentInstance.triggerCustomQuery();
		}
	},
	mounted() {
		const { triggerQueryOnInit } = this.$props;
		const componentInstance = this.getComponentInstance();
		if (triggerQueryOnInit) {
			componentInstance.triggerDefaultQuery();
		}
	},
	methods: {
		getComponentInstance() {
			return this.searchbase.getComponent(this.$props.id);
		}
	},
	render() {
		const { id, URLParams } = this.$props;
		if (this.$scopedSlots.default) {
			const dom = this.$scopedSlots.default;
			if (URLParams) {
				return (
					<URLParamsProvider id={id}>{dom(this.searchState)}</URLParamsProvider>
				);
			}
			return <div>{dom(this.searchState)}</div>;
		}
		return null;
	}
};

SearchComponent.install = function(Vue) {
	Vue.component(SearchComponent.name, SearchComponent);
};

export default SearchComponent;

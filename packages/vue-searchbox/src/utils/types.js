import VueTypes from 'vue-types';

VueTypes.sensibleDefaults = false;

const DataField = VueTypes.shape({
	field: VueTypes.string,
	weight: VueTypes.number
});

const reactKeyType = VueTypes.oneOfType([
	VueTypes.string,
	VueTypes.arrayOf(VueTypes.string),
	VueTypes.object,
	VueTypes.arrayOf(VueTypes.object)
]);

// eslint-disable-next-line
export const types = {
	app: VueTypes.string.isRequired,
	url: VueTypes.string.def('https://scalr.api.appbase.io'),
	enableAppbase: VueTypes.bool.def(false),
	enablePopularSuggestions: VueTypes.bool.def(false),
	credentials: VueTypes.string.isRequired,
	analytics: VueTypes.bool.def(false),
	headers: VueTypes.object,
	dataField: VueTypes.oneOfType([
		VueTypes.string,
		VueTypes.arrayOf(VueTypes.oneOfType([VueTypes.string, DataField]))
	]),
	// aggregationData can be used by listening to event `aggregations`
	aggregationField: VueTypes.string,
	aggregationSize: VueTypes.number,
	nestedField: VueTypes.string,
	size: VueTypes.number.def(10),
	title: VueTypes.string,
	defaultValue: VueTypes.string,
	placeholder: VueTypes.string.def('Search'),
	showIcon: VueTypes.bool.def(true),
	iconPosition: VueTypes.oneOf(['left', 'right']).def('right'),
	icon: VueTypes.any,
	showClear: VueTypes.bool.def(false),
	clearIcon: VueTypes.any,
	autosuggest: VueTypes.bool.def(true),
	strictSelection: VueTypes.bool.def(false),
	defaultSuggestions: VueTypes.arrayOf(VueTypes.object),
	debounce: VueTypes.number.def(0),
	highlight: VueTypes.bool.def(false),
	highlightField: VueTypes.oneOfType([
		VueTypes.string,
		VueTypes.arrayOf(VueTypes.string)
	]),
	customHighlight: VueTypes.func,
	queryFormat: VueTypes.oneOf(['and', 'or']).def('or'),
	fuzziness: VueTypes.oneOf([0, 1, 2, 'AUTO']),
	showVoiceSearch: VueTypes.bool.def(false),
	searchOperators: VueTypes.bool.def(false),
	render: VueTypes.func,
	renderError: VueTypes.oneOfType([VueTypes.string, VueTypes.any]),
	renderNoSuggestion: VueTypes.oneOfType([
		VueTypes.string,
		VueTypes.any
	]),
	renderMic: VueTypes.func,
	innerClass: VueTypes.object,
	style: VueTypes.object,
	defaultQuery: VueTypes.func,
	beforeValueChange: VueTypes.func,
	className: VueTypes.string.def(''),
	loader: VueTypes.object,
	autoFocus: VueTypes.bool.def(false),
	currentURL: VueTypes.string.def(''),
	searchTerm: VueTypes.string.def('search'),
	URLParams: VueTypes.bool.def(false),
	appbaseConfig: VueTypes.shape({
		recordAnalytics: VueTypes.bool,
		enableQueryRules: VueTypes.bool,
		enableSearchRelevancy: VueTypes.bool,
		customEvents: VueTypes.object,
		userId: VueTypes.string,
		useCache: VueTypes.bool,
		enableTelemetry: VueTypes.bool
	}),
	showDistinctSuggestions: VueTypes.bool.def(true),
	queryString: VueTypes.queryString,
	queryTypes: VueTypes.oneOf([
		'search',
		'term',
		'geo',
		'range',
		'suggestion'
	]),
	reactType: VueTypes.shape({
		and: reactKeyType,
		or: reactKeyType,
		not: reactKeyType
	}),
	sortType: VueTypes.oneOf(['asc', 'desc', 'count']),
	sourceFields: VueTypes.arrayOf(VueTypes.string),
	focusShortcuts: VueTypes.arrayOf(
		VueTypes.oneOfType([VueTypes.string, VueTypes.number])
	),
	expandSuggestionsContainer: VueTypes.bool.def(true)
};

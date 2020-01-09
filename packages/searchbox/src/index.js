'use strict';

// this will inject Zepto in window, unfortunately no easy commonJS zepto build

// setup utils functions
var _ = require('./common/utils.js');

var zepto = _.zepto;

// setup DOM element
var DOM = require('./common/dom.js');
DOM.element = zepto;

var typeaheadKey = 'aaAutocomplete';
var Typeahead = require('./autocomplete/typeahead.js');
var EventBus = require('./autocomplete/event_bus.js');

function autocomplete(selector, options, datasets, typeaheadObject) {
	datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 2);

	var inputs = zepto(selector).each(function(i, input) {
		var $input = zepto(input);
		var eventBus = new EventBus({ el: $input });
		var typeahead =
			typeaheadObject ||
			new Typeahead({
				input: $input,
				eventBus: eventBus,
				dropdownMenuContainer: options.dropdownMenuContainer,
				hint: options.hint === undefined ? true : !!options.hint,
				minLength: options.minLength,
				autoselect: options.autoselect,
				autoselectOnBlur: options.autoselectOnBlur,
				tabAutocomplete: options.tabAutocomplete,
				openOnFocus: options.openOnFocus,
				templates: options.templates,
				debug: options.debug,
				clearOnSelected: options.clearOnSelected,
				cssClasses: options.cssClasses,
				datasets: datasets,
				keyboardShortcuts: options.keyboardShortcuts,
				appendTo: options.appendTo,
				autoWidth: options.autoWidth,
				ariaLabel:
					options.ariaLabel || input.getAttribute('aria-label'),
				instance: options.instance
			});
		$input.data(typeaheadKey, typeahead);
	});

	// expose all methods in the `autocomplete` attribute
	inputs.autocomplete = {};
	_.each(
		['open', 'close', 'getVal', 'setVal', 'destroy', 'getWrapper'],
		function(method) {
			inputs.autocomplete[method] = function() {
				var methodArguments = arguments;
				var result;
				inputs.each(function(j, input) {
					var typeahead = zepto(input).data(typeaheadKey);
					result = typeahead[method].apply(
						typeahead,
						methodArguments
					);
				});
				return result;
			};
		}
	);

	return inputs;
}

autocomplete.escapeHighlightedString = _.escapeHighlightedString;

var wasAutocompleteSet = 'autocomplete' in window;
var oldAutocomplete = window.autocomplete;
autocomplete.noConflict = function noConflict() {
	if (wasAutocompleteSet) {
		window.autocomplete = oldAutocomplete;
	} else {
		delete window.autocomplete;
	}
	return autocomplete;
};

module.exports = autocomplete;

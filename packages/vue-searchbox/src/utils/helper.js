import computeScrollIntoView from 'compute-scroll-into-view';

export const getClassName = (classMap, component) =>
	(classMap && classMap[component]) || '';

/**
 * To determine wether an element is a function
 * @param {any} element
 */

export const equals = (a, b) => {
	if (a === b) return true;
	if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
		return a === b;
	if (a === null || a === undefined || b === null || b === undefined)
		return false;
	if (a.prototype !== b.prototype) return false;
	const keys = Object.keys(a);
	if (keys.length !== Object.keys(b).length) return false;
	return keys.every(k => equals(a[k], b[k]));
};

export const debounce = (method, delay) => {
	clearTimeout(method._tId);
	// eslint-disable-next-line
  method._tId = setTimeout(() => {
		method();
	}, delay);
};

/**
 * Scroll node into view if necessary
 * @param {HTMLElement} node the element that should scroll into view
 * @param {HTMLElement} rootNode the root element of the component
 */
// eslint-disable-next-line
export const scrollIntoView = (node, rootNode) => {
	if (node === null) {
		return;
	}

	const actions = computeScrollIntoView(node, {
		boundary: rootNode,
		block: 'nearest',
		scrollMode: 'if-needed'
	});
	actions.forEach(({ el, top, left }) => {
		el.scrollTop = top;
		el.scrollLeft = left;
	});
};

// escapes regex for special characters: \ => \\, $ => \$
export function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Extracts the renderPopularSuggestions prop from props or slot and returns a valid JSX element
 * @param {Object} data
 * @param _ref
 */
export const getPopularSuggestionsComponent = (data = {}, _ref = {}) => {
	const { renderPopularSuggestions } = _ref.$scopedSlots || _ref.$props;
	if (renderPopularSuggestions) return renderPopularSuggestions(data);
	return null;
};
/**
 * To determine whether a component has renderPopularSuggestions prop or slot defined or not
 * @returns {Boolean}
 */
export const hasPopularSuggestionsRenderer = (_ref = {}) => {
	const { renderPopularSuggestions } = _ref.$scopedSlots || _ref.$props;
	return Boolean(renderPopularSuggestions);
};

/**
 * Extracts the render prop from props or slot and returns a valid JSX element
 * @param {Object} data
 * @param _ref
 */
export const getComponent = (data = {}, _ref = {}) => {
	const { render } = _ref.$scopedSlots || _ref.$props;
	if (render) return render(data);
	return null;
};
/**
 * To determine whether a component has render prop or slot defined or not
 * @returns {Boolean}
 */
export const hasCustomRenderer = (_ref = {}) => {
	const { render } = _ref.$scopedSlots || _ref.$props;
	return Boolean(render);
};

export function isEqual(x, y) {
	if (x === y) return true;
	if (!(x instanceof Object) || !(y instanceof Object)) return false;
	if (x.constructor !== y.constructor) return false;

	/* eslint-disable */
  for (const p in x) {
    if (!x.hasOwnProperty(p)) continue;
    if (!y.hasOwnProperty(p)) return false;
    if (x[p] === y[p]) continue;
    if (typeof x[p] !== 'object') return false;
    if (!isEqual(x[p], y[p])) return false;
  }

  for (const p in y) {
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
  }
  /* eslint-enable */
	return true;
}

export const checkValidValue = value => {
	if (value) {
		if (Array.isArray(value) && !value.length) return false;
		return true;
	}
	return false;
};

/**
 * To get the camel case string from kebab case
 * @returns {string}
 */
export const getCamelCase = (str = '') => {
	const arr = str.split('-');
	const capital = arr.map((item, index) =>
		index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item
	);
	// ^-- change here.
	const capitalString = capital.join('');
	return capitalString || '';
};

export const isEmpty = val => !(val && val.length && Object.keys(val).length);

export function isNumeric(value) {
	return /^-?\d+$/.test(value);
}

// check if passed shortcut a key combination
export function isHotkeyCombination(hotkey) {
	return typeof hotkey === 'string' && hotkey.indexOf('+') !== -1;
}

// parse focusshortcuts array for key combinations
export function isHotkeyCombinationUsed(focusShortcuts) {
	for (let index = 0; index < focusShortcuts.length; index += 1) {
		if (isHotkeyCombination(focusShortcuts[index])) {
			return true;
		}
	}
	return false;
}

// used for getting correct string char from keycode passed
// the below algebraic expression is used to get the correct ascii code out of the e.which || e.keycode returned value
// since the keyboards doesn't understand ascii but scan codes and they differ for certain keys such as '/'
// stackoverflow ref: https://stackoverflow.com/a/29811987/10822996
export function getCharFromCharCode(passedCharCode) {
	const which = passedCharCode;
	const chrCode = which - 48 * Math.floor(which / 48);
	return String.fromCharCode(which >= 96 ? chrCode : which);
}

// used for parsing focusshortcuts for keycodes passed as string, eg: 'ctrl+/' is same as 'ctrl+47'
// returns focusShortcuts containing appropriate key charsas depicted on keyboards
export function parseFocusShortcuts(focusShortcutsArray) {
	if (isEmpty(focusShortcutsArray)) return [];

	const parsedFocusShortcutsArray = [];
	focusShortcutsArray.forEach(element => {
		if (typeof element === 'string') {
			if (isHotkeyCombination(element)) {
				// splitting the combination into pieces
				const splitCombination = element.split('+');
				const parsedSplitCombination = [];
				// parsedCombination would have all the keycodes converted into chars
				let parsedCombination = '';
				for (let i = 0; i < splitCombination.length; i += 1) {
					if (isNumeric(splitCombination[i])) {
						parsedSplitCombination.push(
							getCharFromCharCode(+splitCombination[i])
						);
					} else {
						parsedSplitCombination.push(splitCombination[i]);
					}
				}
				parsedCombination = parsedSplitCombination.join('+');
				parsedFocusShortcutsArray.push(parsedCombination);
			} else if (isNumeric(element)) {
				parsedFocusShortcutsArray.push(getCharFromCharCode(+element));
			} else {
				// single char shortcut, eg: '/'
				parsedFocusShortcutsArray.push(element);
			}
		} else {
			// if not a string the the shortcut is assumed to be a keycode
			parsedFocusShortcutsArray.push(getCharFromCharCode(element));
		}
	});
	return parsedFocusShortcutsArray;
}

// used to convert camelCase event names to kebab-case
export function convertToKebabCase(eventName) {
	const regex = /(\\G(?!^)|\b[a-zA-Z][a-z]*)([A-Z][a-z]*|\d+)/g;
	const parsedEventNameArray =  regex.exec(eventName);
	if (parsedEventNameArray) {
		return `${parsedEventNameArray[1].toLowerCase()}-${parsedEventNameArray[2].toLowerCase()}`;
	}
	return null;
}

export const MODIFIER_KEYS = [
	'shift',
	'ctrl',
	'alt',
	'control',
	'option',
	'cmd',
	'command'
];

// filter out modifierkeys such as ctrl, alt, command, shift from focusShortcuts prop
export function extractModifierKeysFromFocusShortcuts(focusShortcutsArray) {
	return focusShortcutsArray.filter(shortcutKey =>
		MODIFIER_KEYS.includes(shortcutKey)
	);
}

export function isModifierKeyUsed(focusShortcutsArray) {
	return !!extractModifierKeysFromFocusShortcuts(focusShortcutsArray).length;
}

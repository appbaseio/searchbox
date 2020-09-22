import React from 'react';

export const SearchContext = React.createContext();

export const getClassName = (classMap, component) =>
  (classMap && classMap[component]) || '';

/**
 * To determine wether an element is a function
 * @param {any} element
 */
export const isFunction = element => typeof element === 'function';

export const getComponent = (data = {}, props = {}) => {
  const { children, render } = props;
  // Render function as child
  if (isFunction(children)) {
    return children(data);
  }
  // Render function as render prop
  if (isFunction(render)) {
    return render(data);
  }
  return null;
};

export const hasCustomRenderer = (props = {}) => {
  const { render, children } = props;
  return isFunction(children) || isFunction(render);
};

export const equals = (a, b) => {
  if (a === b) return true;
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
    return a === b;
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
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

export const isEmpty = val => !(val && val.length && Object.keys(val).length);

/**
 * To determine whether a component has renderQuerySuggestions prop defined or not
 * @returns {Boolean}
 */
export const hasQuerySuggestionsRenderer = (props = {}) => {
  const { renderQuerySuggestions } = props;
  return isFunction(renderQuerySuggestions);
};

/**
 * Extracts the renderQuerySuggestions prop from props and returns a valid React element
 * @param {Object} data
 * @param {Object} props
 */
export const getQuerySuggestionsComponent = (data = {}, props = {}) => {
  const { renderQuerySuggestions } = props;
  // Render function as render prop
  if (isFunction(renderQuerySuggestions)) {
    return renderQuerySuggestions(data);
  }
  return null;
};

export const checkValidValue = value => {
  if (value) {
    if (Array.isArray(value) && !value.length) return false;
    return true;
  }
  return false;
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

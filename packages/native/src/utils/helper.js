import React from 'react';

export const SearchContext = React.createContext();

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

export const queryTypes = {
  Search: 'search',
  Term: 'term',
  Geo: 'geo',
  Range: 'range',
  Suggestion: 'suggestion'
};

export const suggestionTypes = {
  Popular: 'popular',
  Index: 'index',
  Recent: 'recent',
  Promoted: 'promoted'
};

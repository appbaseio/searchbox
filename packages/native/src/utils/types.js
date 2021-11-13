import {
  oneOf,
  bool,
  string,
  shape,
  object,
  number,
  oneOfType,
  arrayOf,
  any
} from 'prop-types';

export const queryTypes = oneOf([
  'search',
  'term',
  'geo',
  'range',
  'suggestion'
]);

export const sourceFields = arrayOf(string);

export const sortType = oneOf(['asc', 'desc', 'count']);

const DataField = shape({
  field: string,
  weight: number
});

export const dataField = oneOfType([
  string,
  arrayOf(oneOfType([string, DataField]))
]);

const reactKeyType = oneOfType([
  string,
  arrayOf(string),
  object,
  arrayOf(object)
]);

export const reactType = shape({
  and: reactKeyType,
  or: reactKeyType,
  not: reactKeyType
});

export const position = oneOf(['left', 'right']);

export const highlightField = oneOfType([string, arrayOf(string)]);

export const queryFormat = oneOf(['and', 'or']);

export const fuzziness = oneOf([0, 1, 2, 'AUTO']);

export const title = oneOfType([string, any]);

export const wholeNumber = (props, propName, componentName) => {
  if (typeof props[propName] != 'number' || props[propName] < 0) {
    return new Error(
      `Invalid type of ${propName} supplied to ${componentName}. Validation failed`
    );
  }
  return null;
};

export const appbaseConfig = shape({
  recordAnalytics: bool,
  enableQueryRules: bool,
  userId: string,
  customEvents: object,
  enableTelemetry: bool
});

import PropTypes from 'prop-types';

export const string = PropTypes.string;
export const stringRequired = PropTypes.string.isRequired;
export const bool = PropTypes.bool;
export const object = PropTypes.object;
export const array = PropTypes.array;
export const number = PropTypes.number;
export const func = PropTypes.func;
export const any = PropTypes.any;
export const element = PropTypes.element;

export const queryTypes = PropTypes.oneOf([
  'search',
  'term',
  'geo',
  'range',
  'suggestion'
]);

export const sourceFields = PropTypes.arrayOf(string);

export const sortType = PropTypes.oneOf(['asc', 'desc', 'count']);

const DataField = PropTypes.shape({
  field: string,
  weight: number
});

export const dataField = PropTypes.oneOfType([
  string,
  PropTypes.arrayOf(PropTypes.oneOfType([string, DataField]))
]);

const reactKeyType = PropTypes.oneOfType([
  string,
  PropTypes.arrayOf(string),
  object,
  PropTypes.arrayOf(object)
]);

export const reactType = PropTypes.shape({
  and: reactKeyType,
  or: reactKeyType,
  not: reactKeyType
});

export const react = PropTypes.shape({
  and: reactType,
  or: reactType,
  not: reactType
});

export const position = PropTypes.oneOf(['left', 'right']);

export const suggestions = PropTypes.arrayOf(object);

export const highlightField = PropTypes.oneOfType([
  string,
  PropTypes.arrayOf(string)
]);

export const queryFormat = PropTypes.oneOf(['and', 'or']);

export const fuzziness = PropTypes.oneOf([0, 1, 2, 'AUTO']);

export const title = PropTypes.oneOfType([string, any]);

export const wholeNumber = function(props, propName, componentName) {
  if (typeof props[propName] != 'number' || props[propName] < 0) {
    return new Error(
      `Invalid type of ${propName} supplied to ${componentName}. Validation failed`
    );
  }
};

export const appbaseConfig = PropTypes.shape({
  recordAnalytics: bool,
  enableQueryRules: bool,
  enableSearchRelevancy: bool,
  customEvents: object,
  userId: string,
  useCache: bool,
  enableTelemetry: bool
});

export const dataFieldValidator = (props, propName, componentName) => {
  const propValue = props[propName];
  if (!props.enableAppbase) {
    if (typeof propValue !== 'string' && !Array.isArray(propValue)) {
      return new Error(
        `Invalid ${propName} supplied to ${componentName}. Validation failed.`
      );
    }
  }
};

export const autocompleteField = PropTypes.oneOfType([string, array]);

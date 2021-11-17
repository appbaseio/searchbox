import type { DataField } from './types';

export function getErrorMessage(msg: string): string {
  return `SearchBase: ${msg}`;
}

export const errorMessages = {
  invalidIndex: getErrorMessage('Please provide a valid index.'),
  invalidURL: getErrorMessage('Please provide a valid url.'),
  invalidComponentId: getErrorMessage('Please provide component id.'),
  invalidDataField: getErrorMessage('Please provide data field.'),
  dataFieldAsArray: getErrorMessage(
    'Only components with `search` and `suggestion` type supports the multiple data fields. Please define `dataField` as a string.'
  )
};

export const queryTypes = {
  Search: 'search',
  Term: 'term',
  Geo: 'geo',
  Range: 'range',
  Suggestion: 'suggestion'
};

export const queryFormats = {
  Or: 'or',
  And: 'and'
};

export const sortOptions = {
  Asc: 'asc',
  Desc: 'desc',
  Count: 'count'
};

export const withClickIds = (results: Array<Object> = []): Array<Object> =>
  results.map((result, index) => ({
    ...result,
    _click_id: index + 1
  }));

export const highlightResults = (result: Object): Object => {
  const data = { ...result };
  if (data.highlight) {
    Object.keys(data.highlight).forEach(highlightItem => {
      const highlightValue = data.highlight[highlightItem][0];
      data._source = { ...data._source, [highlightItem]: highlightValue };
    });
  }
  return data;
};

export const parseHits = (hits: Array<Object>): Array<Object> => {
  let results: Array<Object> = [];
  if (hits) {
    results = [...hits].map(item => {
      const data = highlightResults(item);
      const result = Object.keys(data)
        .filter(key => key !== '_source')
        .reduce(
          (obj: { [key: string]: any }, key: string) => {
            // eslint-disable-next-line
            obj[key] = data[key];
            return obj;
          },
          {
            ...data._source
          }
        );
      return result;
    });
  }
  return results;
};

export const getNormalizedField = (
  field: string | Array<string | DataField>
): Array<string> => {
  if (field) {
    // if data field is string
    if (!Array.isArray(field)) {
      return [field];
    }
    if (field.length) {
      let fields = [];
      field.forEach(dataField => {
        if (typeof dataField === 'string') {
          fields.push(dataField);
        } else if (dataField.field) {
          // if data field is an array of objects
          fields.push(dataField.field);
        }
      });
      return fields;
    }
  }
  return undefined;
};

export function isNumber(n) {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
}

export const getNormalizedWeights = (
  field: string | Array<string | DataField>
): Array<string> => {
  if (field && Array.isArray(field) && field.length) {
    let weights = [];
    field.forEach(dataField => {
      if (isNumber(dataField.weight)) {
        // if data field is an array of objects
        weights.push(dataField.weight);
      } else {
        // Add default weight as 1 to maintain order
        weights.push(1);
      }
    });
    return weights;
  }
  return undefined;
};

export function flatReactProp(reactProp: Object, componentID): Array<string> {
  let flattenReact = [];
  const flatReact = react => {
    if (react && Object.keys(react)) {
      Object.keys(react).forEach(r => {
        if (react[r]) {
          if (typeof react[r] === 'string') {
            flattenReact = [...flattenReact, react[r]];
          } else if (Array.isArray(react[r])) {
            flattenReact = [...flattenReact, ...react[r]];
          } else if (typeof react[r] === 'object') {
            flatReact(react[r]);
          }
        }
      });
    }
  };
  flatReact(reactProp);
  // Remove cyclic dependencies i.e dependencies on it's own
  flattenReact = flattenReact.filter(react => react !== componentID);
  return flattenReact;
}
// flattens a nested array
export const flatten = (arr: Array<any>) =>
  arr.reduce(
    (flat, toFlatten): Array<any> =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  );

// helper function to extract suggestions
export const extractSuggestion = (val: any) => {
  if (typeof val === 'object') {
    if (Array.isArray(val)) {
      return flatten(val);
    }
    return null;
  }
  return val;
};

export function parseCompAggToHits(
  aggFieldName: string,
  buckets?: Array<Object> = []
): Array<Object> {
  return buckets.map(bucket => {
    // eslint-disable-next-line camelcase
    const { doc_count, key, [aggFieldName]: data } = bucket;
    return {
      _doc_count: doc_count,
      // To handle the aggregation results for term and composite aggs
      _key: key[aggFieldName] !== undefined ? key[aggFieldName] : key,
      ...data
    };
  });
}

export function isEqual(x, y): boolean {
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

export const searchBaseMappings = {
  id: 'id',
  type: 'type',
  react: 'react',
  queryFormat: 'queryFormat',
  dataField: 'dataField',
  categoryField: 'categoryField',
  categoryValue: 'categoryValue',
  nestedField: 'nestedField',
  from: 'from',
  size: 'size',
  sortBy: 'sortBy',
  value: 'value',
  aggregationField: 'aggregationField',
  aggregationSize: 'aggregationSize',
  after: 'after',
  includeNullValues: 'includeNullValues',
  includeFields: 'includeFields',
  excludeFields: 'excludeFields',
  fuzziness: 'fuzziness',
  searchOperators: 'searchOperators',
  highlight: 'highlight',
  highlightField: 'highlightField',
  customHighlight: 'customHighlight',
  interval: 'interval',
  aggregations: 'aggregations',
  missingLabel: 'missingLabel',
  showMissing: 'showMissing',
  enableSynonyms: 'enableSynonyms',
  selectAllLabel: 'selectAllLabel',
  pagination: 'pagination',
  queryString: 'queryString',
  enablePopularSuggestions: 'enablePopularSuggestions',
  showDistinctSuggestions: 'showDistinctSuggestions',
  error: 'error',
  defaultQuery: 'defaultQuery',
  customQuery: 'customQuery',
  requestStatus: 'requestStatus',
  results: 'results',
  aggregationData: 'aggregationData',
  micStatus: 'micStatus',
  micInstance: 'micInstance',
  micActive: 'micActive',
  micInactive: 'micInactive',
  micDenied: 'micDenied',
  query: 'query',
  requestPending: 'loading',
  appbaseSettings: 'appbaseConfig',
  suggestions: 'suggestions',
  queryId: 'queryId',
  recentSearches: 'recentSearches',
  distinctField: 'distinctField',
  distinctFieldConfig: 'distinctFieldConfig',
  // ---------------- Methods -----------------------
  onMicClick: 'handleMicClick',
  triggerDefaultQuery: 'triggerDefaultQuery',
  triggerCustomQuery: 'triggerCustomQuery',
  recordClick: 'recordClick',
  recordConversions: 'recordConversions',
  subscribeToStateChanges: 'subscribeToStateChanges',
  unsubscribeToStateChanges: 'unsubscribeToStateChanges',
  // ---------------- Setter Methods ----------------
  setDataField: 'setDataField',
  setValue: 'setValue',
  setSize: 'setSize',
  setFrom: 'setFrom',
  setFuzziness: 'setFuzziness',
  setIncludeFields: 'setIncludeFields',
  setExcludeFields: 'setExcludeFields',
  setSortBy: 'setSortBy',
  setReact: 'setReact',
  setDefaultQuery: 'setDefaultQuery',
  setCustomQuery: 'setCustomQuery',
  setAfter: 'setAfter'
};

export function btoa(input = '') {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const str = input;
  let output = '';

  // eslint-disable-next-line
  for (
    let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || ((map = '='), i % 1); // eslint-disable-line no-bitwise
    output += map.charAt(63 & (block >> (8 - (i % 1) * 8))) // eslint-disable-line no-bitwise
  ) {
    charCode = str.charCodeAt((i += 3 / 4));

    if (charCode > 0xff) {
      throw new Error(
        '"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.'
      );
    }

    block = (block << 8) | charCode; // eslint-disable-line no-bitwise
  }

  return output;
}

export const componentsAlias = {
  SEARCHBASE: 'SearchBase',
  SEARCHCOMPONENT: 'SearchComponent'
};

export const backendAlias = {
  MONGODB: 'mongodb', // mongodb
  ELASTICSEARCH: 'elasticsearch' // elasticsearch
};

export const dataTypes = {
  ARRAY: 'array',
  FUNCTION: 'function',
  OBJECT: 'object',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  STRING: 'string'
};

const checkDataType = temp => {
  if (typeof temp === dataTypes.OBJECT) {
    if (Array.isArray(temp)) {
      return dataTypes.ARRAY;
    }

    return dataTypes.OBJECT;
  }
  return typeof temp;
};

export function validateSchema(
  passedProperties = {},
  schema = {},
  backendName = '',
  componentName = '',
  componentNameForErrorDisplay = ''
) {
  const passedPropertiesKeys = Object.keys(passedProperties).filter(
    propertyKey => !!passedProperties[propertyKey]
  );
  const schemaPropertiesKeys = Object.keys(schema);
  const requiredProperties = [];
  const acceptedProperties = [];
  // fetch required properties
  schemaPropertiesKeys.forEach(propName => {
    const currentProperty = schema[propName];
    if (Object.keys(currentProperty.components).includes(componentName)) {
      acceptedProperties.push(propName);
      if (currentProperty.components[componentName].required) {
        requiredProperties.push(propName);
      }
    }
  });
  // check for required properties
  requiredProperties.forEach(requiredProperty => {
    if (!passedPropertiesKeys.includes(requiredProperty)) {
      throw new Error(
        `${requiredProperty} is required for <${componentNameForErrorDisplay} /> component when used with the ${backendName} Search backend.`
      );
    }
  });

  // check for accepted properties
  passedPropertiesKeys.forEach(passedPropertyKey => {
    if (!acceptedProperties.includes(passedPropertyKey)) {
      throw new Error(
        `<${componentNameForErrorDisplay} /> component doesn't accept a property ${passedPropertyKey}.`
      );
    }

    const acceptedTypes = Array.isArray(schema[passedPropertyKey].type)
      ? schema[passedPropertyKey].type
      : [...schema[passedPropertyKey].type];
    const receivedPropertyType = checkDataType(
      passedProperties[passedPropertyKey]
    );
    if (!acceptedTypes.includes(receivedPropertyType)) {
      throw new Error(
        `<${componentNameForErrorDisplay} /> component accepts a property ${passedPropertyKey} with type(s) [${acceptedTypes.join(
          ', '
        )}], but type was set as ${receivedPropertyType}.`
      );
    }
  });
}

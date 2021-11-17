import { componentsAlias, dataTypes } from '../utils';

const { SEARCHBASE, SEARCHCOMPONENT } = componentsAlias;

export default {
  url: {
    components: [SEARCHBASE, SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: true
  },
  index: {
    components: [
      {
        SEARCHBASE: {
          required: true
        }
      },
      {
        SEARCHCOMPONENT: {
          required: false
        }
      }
    ],
    type: dataTypes.STRING
  },
  credentials: {
    components: [SEARCHBASE, SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: true
  },
  appbaseConfig: {
    components: [SEARCHBASE, SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  headers: {
    components: [SEARCHBASE, SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  transformRequest: {
    components: [SEARCHBASE, SEARCHCOMPONENT],
    type: dataTypes.FUNCTION,
    required: false
  },
  transformResponse: {
    components: [SEARCHBASE, SEARCHCOMPONENT],
    type: dataTypes.FUNCTION,
    required: false
  },
  id: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: true
  },
  dataField: {
    components: [SEARCHCOMPONENT],
    type: [dataTypes.ARRAY, dataTypes.STRING],
    required: false
  },
  autocompleteField: {
    components: [SEARCHCOMPONENT],
    type: [dataTypes.ARRAY, dataTypes.STRING],
    required: false
  },
  queryFormat: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  react: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  size: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.NUMBER,
    required: false
  },
  from: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.NUMBER,
    required: false
  },
  includeFields: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.ARRAY,
    required: false
  },
  excludeFields: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.ARRAY,
    required: false
  },
  sortBy: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  aggregationField: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  aggregationSize: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.NUMBER,
    required: false
  },
  highlight: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  highlightField: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  customHighlight: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  categoryField: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  categoryValue: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  nestedField: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  fuzziness: {
    components: [SEARCHCOMPONENT],
    type: [dataTypes.STRING, dataTypes.NUMBER],
    required: false
  },
  enableSynonyms: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  searchOperators: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  queryString: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  distinctField: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  distinctFieldConfig: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  enableRecentSuggestions: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  enablePopularSuggestions: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  recentSuggestionsConfig: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  popularSuggestionsConfig: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  enablePredictiveSuggestions: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  maxPredictedWords: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.NUMBER,
    required: false
  },
  urlField: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  pagination: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  after: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  showMissing: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  includeNullValues: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  interval: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.NUMBER,
    required: false
  },
  aggregations: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.ARRAY,
    required: false
  },
  defaultQuery: {
    components: [SEARCHCOMPONENT],
    type: [dataTypes.FUNCTION, dataTypes.OBJECT],
    required: false
  },
  customQuery: {
    components: [SEARCHCOMPONENT],
    type: [dataTypes.FUNCTION, dataTypes.OBJECT],
    required: false
  },
  value: {
    components: [SEARCHCOMPONENT],
    type: [dataTypes.STRING, dataTypes.ARRAY, dataTypes.OBJECT],
    required: false
  },
  type: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  clearOnQueryChange: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  }
};

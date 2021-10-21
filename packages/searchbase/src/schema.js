import { componentsAlias, backendAlias, dataTypes } from './utils';

const { SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT } = componentsAlias;
const { MONGODB, ELASTICSEARCH } = backendAlias;

export default {
  url: {
    components: [SEARCHBASE],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.STRING,
    required: true
  },
  index: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.STRING,
    required: false
  },
  credentials: {
    components: [SEARCHBASE],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.STRING,
    required: false
  },
  appbaseConfig: {
    components: [SEARCHBASE],
    backend: [ELASTICSEARCH],
    type: dataTypes.OBJECT,
    required: false
  },
  headers: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.OBJECT,
    required: false
  },
  transformRequest: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.FUNCTION,
    required: false
  },
  transformResponse: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.FUNCTION,
    required: false
  },
  mongodb: {
    components: [SEARCHBASE],
    backend: [MONGODB],
    type: dataTypes.OBJECT,
    required: false
  },
  id: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.STRING,
    required: true
  },
  dataField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: [dataTypes.ARRAY, dataTypes.STRING],
    required: false
  },
  autocompleteField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [MONGODB],
    type: [dataTypes.ARRAY, dataTypes.STRING],
    required: false
  },
  queryFormat: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.STRING,
    required: false
  },
  react: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.OBJECT,
    required: false
  },
  size: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.NUMBER,
    required: false
  },
  from: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.NUMBER,
    required: false
  },
  includeFields: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.ARRAY,
    required: false
  },
  excludeFields: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.ARRAY,
    required: false
  },
  sortBy: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.STRING,
    required: false
  },
  aggregationField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.STRING,
    required: false
  },
  aggregationSize: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.NUMBER,
    required: false
  },
  highlight: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.BOOLEAN,
    required: false
  },
  highlightField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.STRING,
    required: false
  },
  customHighlight: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.OBJECT,
    required: false
  },
  highlightConfig: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [MONGODB],
    type: dataTypes.OBJECT,
    required: false
  },
  categoryField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.STRING,
    required: false
  },
  categoryValue: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.STRING,
    required: false
  },
  nestedField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.STRING,
    required: false
  },
  fuzziness: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: [dataTypes.STRING, dataTypes.NUMBER],
    required: false
  },
  enableSynonyms: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.BOOLEAN,
    required: false
  },
  searchOperators: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.BOOLEAN,
    required: false
  },
  queryString: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: dataTypes.STRING,
    required: false
  },
  distinctField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.STRING,
    required: false
  },
  distinctFieldConfig: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.OBJECT,
    required: false
  },
  enableRecentSuggestions: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: dataTypes.BOOLEAN,
    required: false
  },
  enablePopularSuggestions: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: dataTypes.BOOLEAN,
    required: false
  },
  recentSuggestionsConfig: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: dataTypes.OBJECT,
    required: false
  },
  popularSuggestionsConfig: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: dataTypes.OBJECT,
    required: false
  },
  enablePredictiveSuggestions: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: dataTypes.BOOLEAN,
    required: false
  },
  maxPredictedWords: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: dataTypes.NUMBER,
    required: false
  },
  urlField: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: dataTypes.STRING,
    required: false
  },
  pagination: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.BOOLEAN,
    required: false
  },
  after: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.OBJECT,
    required: false
  },
  showMissing: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.BOOLEAN,
    required: false
  },
  includeNullValues: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.BOOLEAN,
    required: false
  },
  interval: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.NUMBER,
    required: false
  },
  aggregations: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: dataTypes.ARRAY,
    required: false
  },
  defaultQuery: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: [dataTypes.FUNCTION, dataTypes.OBJECT],
    required: false
  },
  customQuery: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: [dataTypes.FUNCTION, dataTypes.OBJECT],
    required: false
  }
};

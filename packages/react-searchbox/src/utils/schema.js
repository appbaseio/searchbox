import { componentsAlias, backendAlias } from './helper';

const { SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT } = componentsAlias;
const { MONGODB, ELASTICSEARCH } = backendAlias;

export default {
  url: {
    components: [SEARCHBASE],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'string',
    required: true
  },
  index: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'string',
    required: false
  },
  credentials: {
    components: [SEARCHBASE],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'string',
    required: false
  },
  appbaseConfig: {
    components: [SEARCHBASE],
    backend: [ELASTICSEARCH],
    type: 'object',
    required: false
  },
  headers: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'object',
    required: false
  },
  transformRequest: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'function',
    required: false
  },
  transformResponse: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'function',
    required: false
  },
  mongodb: {
    components: [SEARCHBASE],
    backend: [MONGODB],
    type: 'object',
    required: true
  },
  id: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'string',
    required: true
  },
  dataField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'array.objects',
    required: false
  },
  queryFormat: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'string',
    required: false
  },
  react: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'object',
    required: false
  },
  size: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'number',
    required: false
  },
  from: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'number',
    required: false
  },
  includeFields: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'array.string',
    required: false
  },
  excludeFields: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'array.string',
    required: false
  },
  sortBy: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'string',
    required: false
  },
  aggregationField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'string',
    required: false
  },
  aggregationSize: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'number',
    required: false
  },
  highlight: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'boolean',
    required: false
  },
  highlightField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'string',
    required: false
  },
  customHighlight: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'object',
    required: false
  },
  highlightConfig: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [MONGODB],
    type: 'object',
    required: false
  },
  categoryField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'string',
    required: false
  },
  categoryValue: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'string',
    required: false
  },
  nestedField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'string',
    required: false
  },
  fuzziness: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: ['string', 'number'],
    required: false
  },
  enableSynonyms: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'boolean',
    required: false
  },
  searchOperators: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'boolean',
    required: false
  },
  queryString: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: 'string',
    required: false
  },
  distinctField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'string',
    required: false
  },
  distinctFieldConfig: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'object',
    required: false
  },
  enableRecentSuggestions: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: 'boolean',
    required: false
  },
  enablePopularSuggestions: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: 'boolean',
    required: false
  },
  recentSuggestionsConfig: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: 'object',
    required: false
  },
  popularSuggestionsConfig: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: 'object',
    required: false
  },
  enablePredictiveSuggestions: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: 'boolean',
    required: false
  },
  maxPredictedWords: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: 'number',
    required: false
  },
  urlField: {
    components: [SEARCHBOX],
    backend: [ELASTICSEARCH],
    type: 'string',
    required: false
  },
  pagination: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'boolean',
    required: false
  },
  after: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'object',
    required: false
  },
  showMissing: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'boolean',
    required: false
  },
  includeNullValues: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'boolean',
    required: false
  },
  interval: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'number',
    required: false
  },
  aggregations: {
    components: [SEARCHCOMPONENT],
    backend: [ELASTICSEARCH],
    type: 'array.string',
    required: false
  },
  defaultQuery: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: ['function', 'object'],
    required: false
  },
  customQuery: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    backend: [ELASTICSEARCH, MONGODB],
    type: ['function', 'object'],
    required: false
  }
};

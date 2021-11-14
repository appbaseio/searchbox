import { componentsAlias, dataTypes } from './utils';

const { SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT } = componentsAlias;

export default {
  url: {
    components: [SEARCHBASE],
    type: dataTypes.STRING,
    required: true
  },
  index: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  credentials: {
    components: [SEARCHBASE],
    type: dataTypes.STRING,
    required: false
  },
  headers: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  transformRequest: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.FUNCTION,
    required: false
  },
  transformResponse: {
    components: [SEARCHBASE, SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.FUNCTION,
    required: false
  },
  mongodb: {
    components: [SEARCHBASE],
    type: dataTypes.OBJECT,
    required: false
  },
  id: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: true
  },
  dataField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: [dataTypes.ARRAY, dataTypes.STRING],
    required: false
  },
  autocompleteField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: [dataTypes.ARRAY, dataTypes.STRING],
    required: false
  },
  react: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  size: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.NUMBER,
    required: false
  },
  from: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.NUMBER,
    required: false
  },
  includeFields: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.ARRAY,
    required: false
  },
  excludeFields: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.ARRAY,
    required: false
  },
  sortBy: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  aggregationSize: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.NUMBER,
    required: false
  },
  highlight: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  highlightField: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  highlightConfig: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: false
  },
  fuzziness: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: [dataTypes.STRING, dataTypes.NUMBER],
    required: false
  },
  enableSynonyms: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  searchOperators: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.BOOLEAN,
    required: false
  },
  queryString: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  defaultQuery: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: [dataTypes.FUNCTION, dataTypes.OBJECT],
    required: false
  },
  customQuery: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: [dataTypes.FUNCTION, dataTypes.OBJECT],
    required: false
  },
  value: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: [dataTypes.STRING, dataTypes.ARRAY, dataTypes.OBJECT],
    required: false
  },
  type: {
    components: [SEARCHBOX, SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  }
};

import { componentsAlias, dataTypes } from '../utils';

const { SEARCHBASE, SEARCHCOMPONENT } = componentsAlias;

export default {
  url: {
    components: [SEARCHBASE],
    type: dataTypes.STRING,
    required: true
  },
  index: {
    components: [SEARCHBASE, SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  },
  credentials: {
    components: [SEARCHBASE, SEARCHCOMPONENT],
    type: dataTypes.STRING,
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
  mongodb: {
    components: [SEARCHBASE, SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
    required: true
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
  highlightConfig: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.OBJECT,
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
  queryFormat: {
    components: [SEARCHCOMPONENT],
    type: dataTypes.STRING,
    required: false
  }
};

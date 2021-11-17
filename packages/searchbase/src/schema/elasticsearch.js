import { componentsAlias, dataTypes } from '../utils';

const { SEARCHBASE, SEARCHCOMPONENT } = componentsAlias;

export default {
  url: {
    components: {
      [SEARCHBASE]: {
        required: true
      },
      [SEARCHCOMPONENT]: {
        required: true
      }
    },
    type: dataTypes.STRING
  },
  index: {
    components: {
      [SEARCHBASE]: {
        required: true
      },
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  credentials: {
    components: {
      [SEARCHBASE]: {
        required: true
      },
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  appbaseConfig: {
    components: {
      [SEARCHBASE]: {
        required: false
      },
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
  },
  headers: {
    components: {
      [SEARCHBASE]: {
        required: false
      },
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
  },
  transformRequest: {
    components: {
      [SEARCHBASE]: {
        required: false
      },
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.FUNCTION
  },
  transformResponse: {
    components: {
      [SEARCHBASE]: {
        required: false
      },
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.FUNCTION
  },
  id: {
    components: {
      [SEARCHCOMPONENT]: {
        required: true
      }
    },
    type: dataTypes.STRING,
    required: true
  },
  dataField: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: [dataTypes.ARRAY, dataTypes.STRING]
  },
  autocompleteField: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: [dataTypes.ARRAY, dataTypes.STRING]
  },
  queryFormat: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  react: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
  },
  size: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.NUMBER
  },
  from: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.NUMBER
  },
  includeFields: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.ARRAY
  },
  excludeFields: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.ARRAY
  },
  sortBy: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  aggregationField: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  aggregationSize: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.NUMBER
  },
  highlight: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  },
  highlightField: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  customHighlight: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
  },
  categoryField: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  categoryValue: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  nestedField: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  fuzziness: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: [dataTypes.STRING, dataTypes.NUMBER]
  },
  enableSynonyms: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  },
  searchOperators: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  },
  queryString: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  distinctField: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  distinctFieldConfig: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
  },
  enableRecentSuggestions: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  },
  enablePopularSuggestions: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  },
  recentSuggestionsConfig: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
  },
  popularSuggestionsConfig: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
  },
  enablePredictiveSuggestions: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  },
  maxPredictedWords: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.NUMBER
  },
  urlField: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  pagination: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  },
  after: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
  },
  showMissing: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  },
  includeNullValues: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  },
  interval: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.NUMBER
  },
  aggregations: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.ARRAY
  },
  defaultQuery: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: [dataTypes.FUNCTION, dataTypes.OBJECT]
  },
  customQuery: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: [dataTypes.FUNCTION, dataTypes.OBJECT]
  },
  value: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: [dataTypes.STRING, dataTypes.ARRAY, dataTypes.OBJECT]
  },
  type: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  },
  clearOnQueryChange: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.BOOLEAN
  }
};

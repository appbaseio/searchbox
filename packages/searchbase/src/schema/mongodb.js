import { componentsAlias, dataTypes } from '../utils';

const { SEARCHBASE, SEARCHCOMPONENT } = componentsAlias;

export default {
  url: {
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
  index: {
    components: {
      [SEARCHBASE]: {
        required: false
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
        required: false
      },
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
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
  mongodb: {
    components: {
      [SEARCHBASE]: {
        required: true
      },
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
  },
  id: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
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
  highlightConfig: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.OBJECT
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
  queryFormat: {
    components: {
      [SEARCHCOMPONENT]: {
        required: false
      }
    },
    type: dataTypes.STRING
  }
};

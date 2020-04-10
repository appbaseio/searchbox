type Suggestion = {
  label: string;
  value: string;
  source?: any;
};

type MicStatusField = 'INACTIVE' | 'ACTIVE' | 'DENIED';

type RequestStatus = 'INACTIVE' | 'PENDING' | 'ERROR';

type UpdateOn = 'change' | 'blur' | 'enter';
type QueryFormat = 'or' | 'and';

type DataField = {
  field: string;
  weight: number;
};

type SortOption = {
  label: string;
  dataField: string;
  sortBy: string;
};

type Options = {
  triggerQuery?: boolean;
  triggerSuggestionsQuery?: boolean;
  stateChanges?: boolean;
};

type Option = {
  stateChanges?: boolean;
};

type Observer = {
  callback: Function;
  properties?: string | Array<string>;
};

type AppbaseConfig = {
  recordAnalytics: boolean;
  enableQueryRules: boolean;
  userId: string;
  customEvents: Object;
};

type AppbaseSettings = {
  recordAnalytics: boolean;
  enableQueryRules: boolean;
  userId: string;
  customEvents: Object;
};

type SearchBaseConfig = {
  index: string;
  url: string;
  enableAppbase: boolean;
  credentials: string;
  appbaseConfig: AppbaseConfig;
  headers: Object;
  highlight?: boolean;
  highlightField?: string | Array<string>;
  value: string;
  suggestions: Array<Suggestion>;
  results: Array<Object>;
  fuzziness: string | number;
  searchOperators: boolean;
  queryFormat: QueryFormat;
  size: number;
  from: number;
  dataField: string | Array<string | DataField>;
  aggregationField?: string;
  includeFields?: Array<string>;
  excludeFields?: Array<string>;
  transformQuery?: (query: Object) => Promise<Object>;
  transformSuggestionsQuery?: (query: Object) => Promise<Object>;
  transformRequest?: (requestOptions: Object) => Promise<Object>;
  transformResponse?: (response: any) => Promise<any>;
  beforeValueChange?: (value: string) => Promise<any>;
  sortBy?: string;
  nestedField?: string;
  sortOptions?: Array<SortOption>;
};

export {
  Suggestion,
  MicStatusField,
  RequestStatus,
  UpdateOn,
  QueryFormat,
  DataField,
  Options,
  Option,
  SortOption,
  Observer,
  SearchBaseConfig,
  AppbaseConfig,
  AppbaseSettings
};

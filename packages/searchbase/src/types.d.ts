export type MicStatusField = 'INACTIVE' | 'ACTIVE' | 'DENIED';

export type RequestStatus = 'INACTIVE' | 'PENDING' | 'ERROR';

export type QueryFormat = 'or' | 'and';

export type QueryType = 'search' | 'term' | 'geo' | 'range';

export type SortType = 'asc' | 'desc' | 'count';

export type DataField = {
  field: string;
  weight: number;
};

export type Options = {
  triggerDefaultQuery?: boolean;
  triggerCustomQuery?: boolean;
  stateChanges?: boolean;
};

export type Option = {
  stateChanges?: boolean;
};

export type Observer = {
  callback: Function;
  properties?: string | Array<string>;
};

export type AppbaseSettings = {
  recordAnalytics?: boolean;
  enableQueryRules?: boolean;
  userId?: string;
  customEvents?: Object;
};

export type BaseConfig = {
  index?: string;
  url?: string;
  credentials?: string;
  appbaseConfig?: AppbaseSettings;
  headers?: Object;
  transformRequest?: (requestOptions: Object) => Promise<Object>;
  transformResponse?: (response: any) => Promise<any>;
};

export type RecentSearchOptions = {
  from?: string;
  to?: string;
  size?: number;
  minChars?: number;
  customEvents?: Object;
};

export type ComponentConfig = BaseConfig & {
  enablePopularSuggestions?: boolean;

  maxPopularSuggestions?: number;

  clearOnQueryChange?: boolean;

  results?: Array<Object>;

  beforeValueChange?: (value: string) => Promise<any>;

  // called when value changes
  onValueChange?: (next: string, prev: string) => void;

  // called when results change
  onResults?: (next: string, prev: string) => void;

  // called when composite aggregations change
  onAggregationData?: (next: Array<Object>, prev: Array<Object>) => void;

  // called when there is an error while fetching results
  onError?: (error: any) => void;

  // called when request status changes
  onRequestStatusChange?: (next: string, prev: string) => void;

  // called when query changes
  onQueryChange?: (next: string, prev: string) => void;

  // called when mic status changes
  onMicStatusChange?: (next: string, prev: string) => void;

  id?: string;

  type?: QueryType;

  react?: Object;

  queryFormat?: QueryFormat;

  dataField?: string | Array<string | DataField>;

  categoryField?: string;

  categoryValue?: string;

  nestedField?: string;

  from?: number;

  size?: number;

  sortBy?: SortType;

  value?: any;

  aggregationField?: string;

  aggregationSize?: number;

  after?: Object;

  includeNullValues?: Boolean;

  includeFields?: Array<string>;

  excludeFields?: Array<string>;

  fuzziness?: string | number;

  searchOperators?: boolean;

  highlight?: boolean;

  highlightField?: string | Array<string>;

  customHighlight?: Object;

  interval?: number;

  aggregations?: Array<string>;

  missingLabel?: string;

  showMissing?: boolean;

  defaultQuery?: Object;

  customQuery?: Object;

  execute?: boolean;

  enableSynonyms?: boolean;

  selectAllLabel?: string;

  pagination?: boolean;

  queryString?: boolean;
};

export type MIC_STATUS = {
  inactive: 'INACTIVE';
  active: 'ACTIVE';
  denied: 'DENIED';
};

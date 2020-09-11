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
  triggerQuery?: boolean;
  triggerSuggestionsQuery?: boolean;
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
  index: string;
  url: string;
  credentials?: string;
  appbaseConfig?: AppbaseSettings;
  headers?: Object;
  transformRequest?: (requestOptions: Object) => Promise<Object>;
  transformResponse?: (response: any) => Promise<any>;
};

export type ComponentConfig = BaseConfig & {
  enableQuerySuggestions?: boolean;
  results?: Array<Object>;
  beforeValueChange?: (value: string) => Promise<any>;
};

export type MIC_STATUS = {
  inactive: 'INACTIVE';
  active: 'ACTIVE';
  denied: 'DENIED';
};

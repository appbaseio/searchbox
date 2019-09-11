import { Results } from './Results';
import {
  DataField,
  MicStatusField,
  Option,
  Options,
  QueryFormat,
  RequestStatus,
  SearchBaseConfig,
  SortOption,
  Suggestion,
  UpdateOn
} from './types';
import { Observable } from './observable';

export class SearchBase {
  static defaultQuery: (
    value: string,
    options: {
      dataField: string | Array<string | DataField>;
      searchOperators?: boolean;
      queryFormat?: QueryFormat;
      fuzziness?: string | number;
      nestedField?: string;
    }
  ) => Object;

  static shouldQuery: (
    value: string,
    dataFields: Array<string | DataField>,
    options?: {
      searchOperators?: boolean;
      queryFormat?: QueryFormat;
      fuzziness?: string | number;
    }
  ) => Object;

  static generateQueryOptions: (options: {
    size?: number;
    from?: number;
    includeFields?: Array<string>;
    excludeFields?: Array<string>;
    sortOptions?: Array<SortOption>;
    sortBy?: string;
    sortByField?: string;
  }) => Object;

  // es index name
  index: string;

  // es url
  url: string;

  // auth credentials if any
  credentials: string;

  // to enable the recording of analytics
  analytics: boolean;

  // input value i.e query term
  value: string;

  // custom headers object
  headers: Object;

  // To define when to trigger the query
  updateOn: UpdateOn;

  // suggestions
  suggestions: Results;

  // suggestions query error
  suggestionsError: any;

  // results
  results: Results;

  // results query error
  error: any;

  // state changes subject
  stateChanges: Observable;

  // request status
  requestStatus: RequestStatus;

  // suggestions request status
  suggestionsRequestStatus: RequestStatus;

  // following are the es query options

  nestedField: string;

  queryFormat: QueryFormat;

  searchOperators: boolean;

  size: number;

  from: number;

  fuzziness: string | number;

  sortBy: string;

  sortByField: string;

  dataField: string | Array<string | DataField>;

  includeFields: Array<string>;

  excludeFields: Array<string>;

  sortOptions: Array<SortOption>;

  /* ------------- change events -------------------------------- */

  // called when value changes
  onValueChange: (next: string, prev: string) => void;

  // called when results change
  onResults: (next: string, prev: string) => void;

  // called when suggestions change
  onSuggestions: (next: string, prev: string) => void;

  // called when there is an error while fetching results
  onError: (error: any) => void;

  // called when there is an error while fetching suggestions
  onSuggestionsError: (error: any) => void;

  // called when request status changes
  onRequestStatusChange: (next: string, prev: string) => void;

  // called when suggestions request status changes
  onSuggestionsRequestStatusChange: (next: string, prev: string) => void;

  // called when query changes
  onQueryChange: (next: string, prev: string) => void;

  // called when suggestions query changes
  onSuggestionsQueryChange: (next: string, prev: string) => void;

  // called when mic status changes
  onMicStatusChange: (next: string, prev: string) => void;

  /* ---- callbacks to create the side effects while querying ----- */

  transformQuery: (query: Object) => Promise<Object>;

  transformSuggestionsQuery: (query: Object) => Promise<Object>;

  transformRequest: (requestOptions: Object) => Promise<Object>;

  transformResponse: (response: any) => Promise<any>;

  beforeValueChange: (value: string) => Promise<any>;

  subscribeToStateChanges: (
    fn: Function,
    propertiesToSubscribe?: string | Array<string>
  ) => void;

  unsubscribeToStateChanges: (fn?: Function) => void;

  setHeaders: (headers: Object, options?: Options) => void;

  setSize: (size: number, options?: Options) => void;

  setFrom: (from: number, options?: Options) => void;

  setFuzziness: (fuzziness: number | string, options?: Options) => void;

  setIncludeFields: (includeFields: Array<string>, options?: Options) => void;

  setExcludeFields: (excludeFields: Array<string>, options?: Options) => void;

  setSortBy: (sortBy: string, options?: Options) => void;

  setSortByField: (sortByField: string, options?: Options) => void;

  setNestedField: (nestedField: string, options?: Options) => void;

  setDataField: (
    dataField: string | Array<string | DataField>,
    options?: Options
  ) => void;

  setResults: (results: Array<Object>, options?: Option) => void;

  setSuggestions: (suggestions: Array<Suggestion>, options?: Option) => void;

  setValue: (value: string, options?: Options) => void;

  onMicClick: (micOptions: Object, options: Options) => void;

  triggerClickAnalytics: (searchPosition: string | number) => void;

  triggerQuery: (options?: Option) => Promise<any>;

  triggerSuggestionsQuery: (options?: Option) => Promise<any>;

  // getters
  readonly micStatus: MicStatusField;
  readonly micInstance: any;
  readonly micActive: boolean;
  readonly micInactive: boolean;
  readonly micDenied: boolean;
  readonly query: Object;
  readonly suggestionsQuery: Object;
  readonly requestPending: boolean;
  readonly suggestionsRequestPending: boolean;

  constructor({
    index,
    url,
    credentials,
    analytics,
    headers,
    value,
    suggestions,
    results,
    fuzziness,
    searchOperators,
    queryFormat,
    size,
    from,
    dataField,
    includeFields,
    excludeFields,
    transformQuery,
    transformSuggestionsQuery,
    transformRequest,
    transformResponse,
    beforeValueChange,
    sortBy,
    nestedField,
    sortOptions
  }: SearchBaseConfig);
}

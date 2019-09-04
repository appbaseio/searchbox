import { Results } from './Results';
import {
  DataField,
  QueryFormat,
  RequestStatus,
  SortOption,
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
}

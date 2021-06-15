import * as types from './types';
import Observable from './Observable';
import Base from './Base';
import Results from './Results';
import Aggregations from './Aggregations';
import SearchBase from './SearchBase';

export class SearchComponent extends Base {
  // RS API properties
  id: string;

  type: types.QueryType;

  react: Object;

  queryFormat: types.QueryFormat;

  dataField: string | Array<string | types.DataField>;

  categoryField: string;

  categoryValue: string;

  nestedField: string;

  from: number;

  size: number;

  sortBy: types.SortType;

  value: any;

  aggregationField: string;

  aggregationSize: number;

  after: Object;

  includeNullValues: Boolean;

  includeFields: Array<string>;

  excludeFields: Array<string>;

  fuzziness: string | number;

  searchOperators: boolean;

  highlight: boolean;

  highlightField: string | Array<string>;

  customHighlight: Object;

  interval: number;

  aggregations: Array<string>;

  missingLabel: string;

  showMissing: boolean;

  defaultQuery: (component: SearchComponent) => Object;

  customQuery: (component: SearchComponent) => Object;

  execute: boolean;

  enableSynonyms: boolean;

  selectAllLabel: string;

  pagination: boolean;

  queryString: boolean;

  // other properties

  // To enable the popular suggestions
  enablePopularSuggestions: boolean;

  // To define the size of popular suggestions
  maxPopularSuggestions: number;

  // To show the distinct suggestions
  showDistinctSuggestions: boolean;

  // To show the predictive suggestions
  enablePredictiveSuggestions: boolean;

  // To preserve the results state
  preserveResults: boolean;

  // query error
  error: any;

  // state changes subject
  stateChanges: Observable;

  // request status
  requestStatus: types.RequestStatus;

  // results
  results: Results;

  // aggregations
  aggregationData: Aggregations;

  // recent searches
  recentSearches: Array<{ label: string, value: string }>;

  /* ------ Private properties only for the internal use ----------- */
  _parent: SearchBase;

  // Counterpart of the query
  _query: Object;

  // TODO: Check on the below properties
  // mic status
  _micStatus: types.MicStatusField;

  // mic instance
  _micInstance: any;

  // query search ID
  _queryId: string;

  // To define the distinct field
  distinctField: string;

  // To specify additional options to the distinctField prop
  distinctFieldConfig: Object;

  /* ---- callbacks to create the side effects while querying ----- */

  beforeValueChange: (value: string) => Promise<any>;

  /* ------------- change events -------------------------------- */

  // called when value changes
  onValueChange: (next: string, prev: string) => void;

  // called when results change
  onResults: (next: string, prev: string) => void;

  // called when composite aggregations change
  onAggregationData: (next: Array<Object>, prev: Array<Object>) => void;

  // called when there is an error while fetching results
  onError: (error: any) => void;

  // called when request status changes
  onRequestStatusChange: (next: string, prev: string) => void;

  // called when query changes
  onQueryChange: (next: string, prev: string) => void;

  // called when mic status changes
  onMicStatusChange: (next: string, prev: string) => void;

  constructor({
    index,
    url,
    credentials,
    appbaseConfig,
    headers,
    transformRequest,
    transformResponse,
    beforeValueChange,
    enablePopularSuggestions,
    maxPopularSuggestions,
    results,
    ...rsAPIConfig
  }: types.ComponentConfig);

  // getters
  micStatus: types.MIC_STATUS;

  micInstance: Object;

  micActive: boolean;

  micInactive: boolean;

  micDenied: boolean;

  query: string;

  requestPending: boolean;

  appbaseSettings: types.AppbaseSettings;

  // To get the parsed suggestions from the results
  suggestions: Array<Object>;

  // Method to get the raw query based on the current state
  componentQuery: Object;

  queryId: string;

  /* -------- Public methods -------- */

  // mic click handler
  onMicClick(micOptions: Object, options: types.Options): void;

  // Method to set the dataField option
  setDataField(
    dataField: string | Array<string | types.DataField>,
    options?: types.Options
  ): void;

  // To set the parent (SearchBase) instance for the component
  setParent(parent: SearchBase): void;

  // Method to set the value
  setValue(value: any, options?: types.Options): void;

  // Method to set the size option
  setSize(size: number, options?: types.Options): void;

  // Method to set the from option
  setFrom(from: number, options?: types.Options): void;

  // Method to set the after key for composite aggs pagination
  setAfter(after: Object, options?: types.Options): void;

  // Method to set the fuzziness option
  setFuzziness(fuzziness: number | string, options?: types.Options): void;

  // Method to set the includeFields option
  setIncludeFields(includeFields: Array<string>, options?: types.Options): void;

  // Method to set the excludeFields option
  setExcludeFields(excludeFields: Array<string>, options?: types.Options): void;

  // Method to set the sortBy option
  setSortBy(sortBy: string, options?: types.Options): void;

  // Method to set the sortBy option
  setReact(react: Object, options?: types.Options): void;

  // Method to set the default query
  setDefaultQuery(
    defaultQuery: (component: SearchComponent) => void,
    options?: types.Options
  ): void;

  // Method to set the custom query
  setCustomQuery(
    customQuery: (component: SearchComponent) => void,
    options?: types.Options
  ): void;

  // Method to execute the component's own query i.e default query
  triggerDefaultQuery(options?: types.Option): Promise<any>;

  // Method to execute the query for watcher components
  triggerCustomQuery(options?: types.Option): Promise<any>;

  getSuggestionsQuery(): Object;

  // Method to get the recent searches
  getRecentSearches(queryOptions?: types.RecentSearchOptions): Promise<any>;

  // use this methods to record a search click event
  recordClick(objects: Object, isSuggestionClick?: boolean): void;

  // use this methods to record a search conversion
  recordConversions(objects: Array<string>): void;

  // Method to subscribe the state changes
  subscribeToStateChanges(
    fn: Function,
    propertiesToSubscribe?: string | Array<string>
  ): void;

  // Method to unsubscribe the state changes
  unsubscribeToStateChanges(fn?: Function): void;

  // Method to clear the stored results
  clearResults(options?: types.Option): void
}

export default SearchComponent;

// @flow

import fetch from 'cross-fetch';
import Results from './Results';
import Observable from './observable';
import { getSuggestions } from './utils';
import type {
  DataField,
  MicStatusField,
  Options,
  QueryFormat,
  RequestStatus,
  SortOption,
  Suggestion,
  Option,
  SearchBaseConfig
} from './types';

// mic constants
const MIC_STATUS = {
  inactive: 'INACTIVE',
  active: 'ACTIVE',
  denied: 'DENIED'
};

const REQUEST_STATUS = {
  inactive: 'INACTIVE',
  pending: 'PENDING',
  error: 'ERROR'
};

const defaultOptions: Options = {
  triggerQuery: true,
  triggerSuggestionsQuery: false,
  stateChanges: true
};

const defaultOption = {
  stateChanges: true
};

class Searchbase {
  static defaultQuery: (
    value: string,
    options: {
      dataField: string | Array<string | DataField>,
      searchOperators?: boolean,
      queryFormat?: QueryFormat,
      fuzziness?: string | number,
      nestedField?: string
    }
  ) => Object;

  static shouldQuery: (
    value: string,
    dataFields: Array<string | DataField>,
    options?: {
      searchOperators?: boolean,
      queryFormat?: QueryFormat,
      fuzziness?: string | number
    }
  ) => Object;

  static generateQueryOptions: (options: {
    size?: number,
    from?: number,
    includeFields?: Array<string>,
    excludeFields?: Array<string>,
    sortOptions?: Array<SortOption>,
    sortBy?: string,
    sortByField?: string
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

  /* ------ Private properties only for the internal use ----------- */

  // counterpart of the query
  _query: Object;

  // counterpart of the suggestions query
  _suggestionsQuery: Object;

  _queryOptions: Object;

  // search session id, required for analytics
  _searchId: string;

  // mic status
  _micStatus: MicStatusField;

  // mic instance
  _micInstance: any;

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
  }: SearchBaseConfig) {
    if (!index) {
      throw new Error('Please provide a valid index.');
    }
    if (!url) {
      throw new Error('Please provide a valid url.');
    }
    if (!dataField) {
      throw new Error('Please provide a valid data field.');
    }
    this.index = index;
    this.url = url;
    this.analytics = analytics || false;
    this.dataField = dataField;
    this.credentials = credentials || '';
    this.nestedField = nestedField || '';
    this.queryFormat = queryFormat || 'or';
    this.fuzziness = fuzziness || 0;
    this.searchOperators = searchOperators || false;
    this.size = Number(size) || 10;
    this.from = Number(from) || 0;
    this.sortBy = sortBy || '';
    this.includeFields = includeFields || ['*'];
    this.excludeFields = excludeFields || [];
    this.sortOptions = sortOptions || null;

    this.requestStatus = REQUEST_STATUS.inactive;
    this.suggestionsRequestStatus = REQUEST_STATUS.inactive;

    this.transformRequest = transformRequest || null;
    this.transformResponse = transformResponse || null;
    this.transformQuery = transformQuery || null;
    this.transformSuggestionsQuery = transformSuggestionsQuery || null;
    this.beforeValueChange = beforeValueChange || null;

    // Initialize the state changes observable
    this.stateChanges = new Observable();

    // Initialize the results
    this.suggestions = new Results(suggestions);
    // Add suggestions parser
    this.suggestions.parseResults = this._parseSuggestions;
    this.results = new Results(results);

    // Initialize headers
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    if (this.credentials) {
      this.headers = {
        ...this.headers,
        Authorization: `Basic ${btoa(this.credentials)}`
      };
    }
    if (headers) {
      this.setHeaders(headers, {
        stateChanges: false
      });
    }

    if (value) {
      this.setValue(value, {
        stateChanges: true
      });
    } else {
      this.value = '';
    }
  }

  // getters
  get micStatus() {
    return this._micStatus;
  }

  get micInstance() {
    return this._micInstance;
  }

  get micActive() {
    return this._micStatus === MIC_STATUS.active;
  }

  get micInactive() {
    return this._micStatus === MIC_STATUS.inactive;
  }

  get micDenied() {
    return this._micStatus === MIC_STATUS.denied;
  }

  get query() {
    return this._query;
  }

  get suggestionsQuery() {
    return this._suggestionsQuery;
  }

  get requestPending() {
    return this.requestStatus === REQUEST_STATUS.pending;
  }

  get suggestionsRequestPending() {
    return this.suggestionsRequestStatus === REQUEST_STATUS.pending;
  }

  // Method to subscribe the state changes
  subscribeToStateChanges(
    fn: Function,
    propertiesToSubscribe?: string | Array<string>
  ) {
    this.stateChanges.subscribe(fn, propertiesToSubscribe);
  }

  // Method to unsubscribe the state changes
  unsubscribeToStateChanges(fn?: Function) {
    this.stateChanges.unsubscribe(fn);
  }

  // Method to set the custom headers
  setHeaders(headers: Object, options?: Options = defaultOptions): void {
    const prev = this.headers;
    this.headers = {
      ...this.headers,
      ...headers
    };
    this._applyOptions(options, 'headers', prev, this.headers);
  }

  // Method to set the size option
  setSize(size: number, options?: Options = defaultOptions): void {
    const prev = this.size;
    this.size = size;
    this._applyOptions(options, 'size', prev, this.size);
  }

  // Method to set the from option
  setFrom(from: number, options?: Options = defaultOptions): void {
    const prev = this.from;
    this.from = from;
    this._applyOptions(options, 'from', prev, this.from);
  }

  // Method to set the fuzziness option
  setFuzziness(
    fuzziness: number | string,
    options?: Options = defaultOptions
  ): void {
    const prev = this.fuzziness;
    this.fuzziness = fuzziness;
    this._applyOptions(options, 'fuzziness', prev, this.fuzziness);
  }

  // Method to set the includeFields option
  setIncludeFields(
    includeFields: Array<string>,
    options?: Options = defaultOptions
  ): void {
    const prev = this.includeFields;
    this.includeFields = includeFields;
    this._applyOptions(options, 'includeFields', prev, includeFields);
  }

  // Method to set the excludeFields option
  setExcludeFields(
    excludeFields: Array<string>,
    options?: Options = defaultOptions
  ): void {
    const prev = this.excludeFields;
    this.excludeFields = excludeFields;
    this._applyOptions(options, 'excludeFields', prev, excludeFields);
  }

  // Method to set the sortBy option
  setSortBy(sortBy: string, options?: Options = defaultOptions): void {
    const prev = this.sortBy;
    this.sortBy = sortBy;
    this._applyOptions(options, 'sortBy', prev, sortBy);
  }

  // Method to set the sortByField option
  setSortByField(
    sortByField: string,
    options?: Options = defaultOptions
  ): void {
    const prev = this.sortByField;
    this.sortByField = sortByField;
    this._applyOptions(options, 'sortByField', prev, sortByField);
  }

  // Method to set the nestedField option
  setNestedField(
    nestedField: string,
    options?: Options = defaultOptions
  ): void {
    const prev = this.nestedField;
    this.nestedField = nestedField;
    this._applyOptions(options, 'nestedField', prev, nestedField);
  }

  // Method to set the dataField option
  setDataField(
    dataField: string | Array<string | DataField>,
    options?: Options = defaultOptions
  ): void {
    const prev = this.dataField;
    this.dataField = dataField;
    this._applyOptions(options, 'dataField', prev, dataField);
  }

  // Method to set the custom results
  setResults(results: Array<Object>, options?: Option = defaultOption): void {
    if (results) {
      const prev = this.results;
      this.results = new Results(results);
      this._applyOptions(
        {
          stateChanges: options.stateChanges
        },
        'results',
        prev,
        this.results
      );
    }
  }

  // Method to set the custom suggestions
  setSuggestions(
    suggestions: Array<Suggestion>,
    options?: Option = defaultOption
  ): void {
    if (suggestions) {
      const prev = this.suggestions;
      this.suggestions = new Results(suggestions);
      this.suggestions.parseResults = this._parseSuggestions;
      this._applyOptions(
        {
          stateChanges: options.stateChanges
        },
        'suggestions',
        prev,
        this.suggestions
      );
    }
  }

  // Method to set the value
  setValue(value: string, options?: Options = defaultOptions): void {
    const performUpdate = () => {
      const prev = this.value;
      this.value = value;
      this._applyOptions(options, 'value', prev, this.value);
    };
    if (this.beforeValueChange) {
      this.beforeValueChange(value)
        .then(performUpdate)
        .catch(e => {
          console.warn('beforeValueChange rejected the promise with ', e);
        });
    } else {
      performUpdate();
    }
  }

  // mic event
  onMicClick = (micOptions: Object = {}, options: Options = defaultOptions) => {
    const prevStatus = this._micStatus;
    if (window.SpeechRecognition && prevStatus !== MIC_STATUS.denied) {
      if (prevStatus === MIC_STATUS.active) {
        this._setMicStatus(MIC_STATUS.inactive, options);
      }
      const { SpeechRecognition } = window;
      if (this._micInstance) {
        this._stopMic();
        return;
      }
      this._micInstance = new SpeechRecognition();
      this._micInstance.continuous = true;
      this._micInstance.interimResults = true;
      Object.assign(this._micInstance, micOptions);
      this._micInstance.start();
      this._micInstance.onstart = () => {
        this._setMicStatus(MIC_STATUS.active, options);
      };
      this._micInstance.onresult = ({ results }) => {
        if (results && results[0] && results[0].isFinal) {
          this._stopMic();
        }
        this._handleVoiceResults({ results }, options);
      };
      this._micInstance.onerror = e => {
        if (e.error === 'no-speech' || e.error === 'audio-capture') {
          this._setMicStatus(MIC_STATUS.inactive, options);
        } else if (e.error === 'not-allowed') {
          this._setMicStatus(MIC_STATUS.denied, options);
        }
        console.error(e);
      };
    }
  };

  triggerClickAnalytics = (searchPosition: string | number) => {
    if (!this.analytics || !this._searchId) return;
    fetch(`${this.url}/${this.index}/_analytics`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'X-Search-Id': this._searchId,
        'X-Search-Click': true,
        'X-Search-ClickPosition': searchPosition + 1,
        'X-Search-Conversion': true
      }
    });
  };

  // Method to execute the query
  async triggerQuery(options?: Option = defaultOption): Promise<any> {
    try {
      this._updateQuery();
      this._setRequestStatus(REQUEST_STATUS.pending);
      let finalQuery = this.query;
      if (this.transformQuery) {
        finalQuery = await this.transformQuery(this.query);
      }
      const results = await this._fetchRequest(finalQuery);
      this._setRequestStatus(REQUEST_STATUS.inactive);
      const prev = this.results;
      this.results.setRaw(results);
      this._applyOptions(
        {
          stateChanges: options.stateChanges
        },
        'results',
        prev,
        this.results
      );
      return Promise.resolve(results);
    } catch (err) {
      this._setError(err, {
        stateChanges: options.stateChanges
      });
      console.error(err);
      return Promise.reject(err);
    }
  }

  // Method to execute the suggestions query
  async triggerSuggestionsQuery(
    options?: Option = defaultOption
  ): Promise<any> {
    try {
      this._updateSuggestionsQuery();
      this._setSuggestionsRequestStatus(REQUEST_STATUS.pending);
      let finalQuery = this.suggestionsQuery;
      if (this.transformSuggestionsQuery) {
        finalQuery = await this.transformSuggestionsQuery(
          this.suggestionsQuery
        );
      }
      const suggestions = await this._fetchRequest(finalQuery);
      this._setSuggestionsRequestStatus(REQUEST_STATUS.inactive);
      const prev = this.suggestions;
      this.suggestions.setRaw(suggestions);
      this._applyOptions(
        {
          stateChanges: options.stateChanges
        },
        'suggestions',
        prev,
        this.suggestions
      );
      return Promise.resolve(suggestions);
    } catch (err) {
      this._setSuggestionsError(err, {
        stateChanges: options.stateChanges
      });
      console.error(err);
      return Promise.reject(err);
    }
  }

  /* -------- Private methods only for the internal use -------- */
  // mic
  _handleVoiceResults = (
    { results }: Object,
    options?: Options = defaultOptions
  ) => {
    if (
      results &&
      results[0] &&
      results[0].isFinal &&
      results[0][0] &&
      results[0][0].transcript &&
      results[0][0].transcript.trim()
    ) {
      this.setValue(results[0][0].transcript.trim(), options);
    }
  };

  _stopMic = () => {
    if (this._micInstance) {
      this._micInstance.stop();
      this._micInstance = null;
      this._setMicStatus(MIC_STATUS.inactive);
    }
  };

  _setMicStatus = (
    status: MicStatusField,
    options: Options = defaultOptions
  ) => {
    const prevStatus = this._micStatus;
    this._micStatus = status;
    this._applyOptions(options, 'micStatus', prevStatus, this._micStatus);
  };

  _handleTransformResponse(res: any): Promise<any> {
    if (
      this.transformResponse &&
      typeof this.transformResponse === 'function'
    ) {
      return this.transformResponse(res);
    }
    return new Promise(resolve => resolve(res));
  }

  _handleTransformRequest(requestOptions: any): Promise<any> {
    if (this.transformRequest && typeof this.transformRequest === 'function') {
      return this.transformRequest(requestOptions);
    }
    return new Promise(resolve => resolve(requestOptions));
  }

  _fetchRequest(requestBody: Object): Promise<any> {
    let analyticsHeaders = {};
    // Set analytics headers
    if (this._searchId) {
      analyticsHeaders = {
        'X-Search-Id': this._searchId,
        'X-Search-Query': this.value
      };
    } else if (this.value) {
      analyticsHeaders = {
        'X-Search-Query': this.value
      };
    }

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        ...this.headers,
        ...analyticsHeaders
      }
    };

    return new Promise((resolve, reject) => {
      this._handleTransformRequest(requestOptions)
        .then(finalRequestOptions => {
          // set timestamp in request
          const timestamp = Date.now();

          return fetch(`${this.url}/${this.index}/_search`, finalRequestOptions)
            .then(res => {
              const responseHeaders = res.headers;

              // set search id
              if (res.headers) {
                this._searchId = res.headers.get('X-Search-Id') || null;
              }

              if (res.status >= 500) {
                return reject(res);
              }
              if (res.status >= 400) {
                return reject(res);
              }
              return res.json().then(data => {
                this._handleTransformResponse(data)
                  .then(transformedData => {
                    if (
                      transformedData &&
                      Object.prototype.hasOwnProperty.call(
                        transformedData,
                        'error'
                      )
                    ) {
                      reject(transformedData);
                    }
                    const response = {
                      ...transformedData,
                      _timestamp: timestamp,
                      _headers: responseHeaders
                    };
                    return resolve(response);
                  })
                  .catch(e => {
                    console.warn(
                      'transformResponse rejected the promise with ',
                      e
                    );
                    return reject(e);
                  });
              });
            })
            .catch(e => reject(e));
        })
        .catch(e => {
          console.warn('transformRequest rejected the promise with ', e);
          return reject(e);
        });
    });
  }

  _setSuggestionsError(
    suggestionsError: any,
    options?: Options = defaultOptions
  ) {
    this._setSuggestionsRequestStatus(REQUEST_STATUS.error);
    const prev = this.suggestionsError;
    this.suggestionsError = suggestionsError;
    this._applyOptions(
      options,
      'suggestionsError',
      prev,
      this.suggestionsError
    );
  }

  _setError(error: any, options?: Options = defaultOptions) {
    this._setRequestStatus(REQUEST_STATUS.error);
    const prev = this.error;
    this.error = error;
    this._applyOptions(options, 'error', prev, this.error);
  }

  _setRequestStatus(requestStatus: RequestStatus) {
    const prev = this.requestStatus;
    this.requestStatus = requestStatus;
    this._applyOptions(
      {
        stateChanges: true
      },
      'requestStatus',
      prev,
      this.requestStatus
    );
  }

  _setSuggestionsRequestStatus(suggestionsRequestStatus: RequestStatus) {
    const prev = this.suggestionsRequestStatus;
    this.suggestionsRequestStatus = suggestionsRequestStatus;
    this._applyOptions(
      {
        stateChanges: true
      },
      'suggestionsRequestStatus',
      prev,
      this.suggestionsRequestStatus
    );
  }

  // Method to set the default query value
  _updateQuery(query?: Object, queryOptions?: Object): void {
    // Set default query here
    const finalQueryOptions = Searchbase.generateQueryOptions({
      excludeFields: this.excludeFields,
      includeFields: this.includeFields,
      size: this.size,
      from: this.from,
      sortBy: this.sortBy,
      sortByField: this.sortByField,
      sortOptions: this.sortOptions
    });
    /**
     * First priority goes to the custom query set by user otherwise execute the default query
     * If none of the two exists execute the match_all
     */
    const finalQuery = query ||
      Searchbase.defaultQuery(this.value, {
        dataField: this.dataField,
        searchOperators: this.searchOperators,
        queryFormat: this.queryFormat,
        fuzziness: this.fuzziness,
        nestedField: this.nestedField
      }) || {
        match_all: {}
      };
    const prevQuery = this._query;
    this._query = {
      query: finalQuery,
      ...finalQueryOptions,
      // Overrides the default options by the user defined options
      ...queryOptions
    };
    this._applyOptions(
      {
        stateChanges: false
      },
      'query',
      prevQuery,
      this._query
    );
  }

  _updateSuggestionsQuery(query?: Object, queryOptions?: Object): void {
    // Set default suggestions query here
    const finalQueryOptions = Searchbase.generateQueryOptions({
      size: 10
    });
    /**
     * First priority goes to the custom query set by user otherwise execute the default query
     * If none of the two exists execute the match_all
     */
    const finalQuery = query ||
      Searchbase.defaultQuery(this.value, {
        dataField: this.dataField,
        searchOperators: this.searchOperators,
        queryFormat: this.queryFormat,
        fuzziness: this.fuzziness,
        nestedField: this.nestedField
      }) || {
        match_all: {}
      };
    const prevQuery = this._suggestionsQuery;
    this._suggestionsQuery = {
      query: finalQuery,
      ...finalQueryOptions,
      // Overrides the default options by the user defined options
      ...queryOptions
    };
    this._applyOptions(
      {
        stateChanges: false
      },
      'suggestionsQuery',
      prevQuery,
      this._suggestionsQuery
    );
  }

  _parseSuggestions = (suggestions: Array<Object>): Array<Object> => {
    let fields: Array<string> = [];
    if (this.dataField === 'string') {
      fields = [this.dataField];
    } else if (Array.isArray(this.dataField)) {
      this.dataField.forEach((dataField: string | DataField) => {
        if (typeof dataField === 'object') {
          fields.push(dataField.field);
        } else {
          fields.push(dataField);
        }
      });
    }
    return getSuggestions(fields, suggestions, this.value).slice(0, this.size);
  };

  // Method to apply the changed based on set options
  _applyOptions(
    options: Options,
    key: string,
    prevValue: any,
    nextValue: any
  ): void {
    // Trigger mic events
    if (key === 'micStatus' && this.onMicStatusChange) {
      this.onMicStatusChange(nextValue, prevValue);
    }
    // Trigger events
    if (key === 'query' && this.onQueryChange) {
      this.onQueryChange(nextValue, prevValue);
    }
    if (key === 'suggestionsQuery' && this.onSuggestionsQueryChange) {
      this.onSuggestionsQueryChange(nextValue, prevValue);
    }
    if (key === 'value' && this.onValueChange) {
      this.onValueChange(nextValue, prevValue);
    }
    if (key === 'error' && this.onError) {
      this.onError(nextValue);
    }
    if (key === 'suggestionsError' && this.onSuggestionsError) {
      this.onSuggestionsError(nextValue);
    }
    if (key === 'results' && this.onResults) {
      this.onResults(nextValue, prevValue);
    }
    if (key === 'suggestions' && this.onSuggestions) {
      this.onSuggestions(nextValue, prevValue);
    }
    if (key === 'requestStatus' && this.onRequestStatusChange) {
      this.onRequestStatusChange(nextValue, prevValue);
    }
    if (
      key === 'suggestionsRequestStatus' &&
      this.onSuggestionsRequestStatusChange
    ) {
      this.onSuggestionsRequestStatusChange(nextValue, prevValue);
    }
    if (options.triggerQuery) {
      this.triggerQuery();
    }
    if (options.triggerSuggestionsQuery) {
      this.triggerSuggestionsQuery();
    }
    if (options.stateChanges !== false) {
      this.stateChanges.next(
        {
          [key]: {
            prev: prevValue,
            next: nextValue
          }
        },
        key
      );
    }
  }
}

/* ------------------ Static methods ------------------------------ */

// function to generate the default query DSL
Searchbase.defaultQuery = (value, options) => {
  let finalQuery = null;
  let fields;

  if (value) {
    if (Array.isArray(options.dataField)) {
      fields = options.dataField;
    } else {
      fields = [options.dataField];
    }

    if (options.searchOperators) {
      finalQuery = {
        simple_query_string: Searchbase.shouldQuery(value, fields, options)
      };
    } else {
      finalQuery = {
        bool: {
          should: Searchbase.shouldQuery(value, fields, options),
          minimum_should_match: '1'
        }
      };
    }
  }

  if (value === '') {
    finalQuery = null;
  }

  if (finalQuery && options.nestedField) {
    finalQuery = {
      nested: {
        path: options.nestedField,
        query: finalQuery
      }
    };
  }

  return finalQuery;
};

// helper function of default query
Searchbase.shouldQuery = (
  value,
  dataFields,
  options = {
    searchOperators: false,
    queryFormat: 'or',
    fuzziness: 0
  }
) => {
  const fields = dataFields.map((dataField: string | DataField) => {
    if (typeof dataField === 'object') {
      return `${dataField.field}${
        dataField.weight ? `^${dataField.weight}` : ''
      }`;
    }
    return dataField;
  });

  if (options.searchOperators) {
    return {
      query: value,
      fields,
      default_operator: options.queryFormat
    };
  }

  if (options.queryFormat === 'and') {
    return [
      {
        multi_match: {
          query: value,
          fields,
          type: 'cross_fields',
          operator: 'and'
        }
      },
      {
        multi_match: {
          query: value,
          fields,
          type: 'phrase_prefix',
          operator: 'and'
        }
      }
    ];
  }

  return [
    {
      multi_match: {
        query: value,
        fields,
        type: 'best_fields',
        operator: 'or',
        fuzziness: options.fuzziness
      }
    },
    {
      multi_match: {
        query: value,
        fields,
        type: 'phrase_prefix',
        operator: 'or'
      }
    }
  ];
};

// function to generate the query DSL options
Searchbase.generateQueryOptions = options => {
  const finalOptions = {};
  if (options.size !== undefined) {
    finalOptions.size = options.size;
  }
  if (options.from !== undefined) {
    finalOptions.from = options.from;
  }
  if (options.includeFields || options.excludeFields) {
    const source = {};
    if (options.includeFields) {
      source.includes = options.includeFields;
    }
    if (options.excludeFields) {
      source.excludes = options.excludeFields;
    }
    finalOptions._source = source;
  }

  if (options.sortOptions) {
    finalOptions.sort = [
      {
        [options.sortOptions[0].dataField]: {
          order: options.sortOptions[0].sortBy
        }
      }
    ];
  } else if (options.sortBy && options.sortByField) {
    finalOptions.sort = [
      {
        [options.sortByField]: {
          order: options.sortBy
        }
      }
    ];
  }
  return finalOptions;
};

export default Searchbase;

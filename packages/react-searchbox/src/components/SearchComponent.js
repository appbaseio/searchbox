import React from 'react';
import PropTypes from 'prop-types';
import { LIBRARY_ALIAS } from '@appbaseio/searchbase';
import {
  any,
  appbaseConfig as appbaseConfigDef,
  func,
  object,
  string,
  queryTypes,
  queryFormat as queryFormatDef,
  dataField as dataFieldDef,
  sortType,
  sourceFields,
  reactType,
  fuzziness as fuzzinessDef,
  bool,
  number,
  stringRequired
} from '../utils/types';
import {
  getComponent,
  hasCustomRenderer,
  SearchContext
} from '../utils/helper';
import URLParamsProvider from './URLParamsProvider';

class SearchComponent extends React.Component {
  static contextType = SearchContext;

  constructor(props, context) {
    super(props, context);
    this.state = {};
    const {
      id,
      index,
      url,
      credentials,
      headers,
      appbaseConfig,
      transformRequest,
      transformResponse,
      type,
      react,
      queryFormat,
      dataField,
      autocompleteField,
      highlightConfig,
      categoryField,
      categoryValue,
      nestedField,
      from,
      size,
      sortBy,
      aggregationField,
      aggregationSize,
      after,
      includeNullValues,
      includeFields,
      excludeFields,
      fuzziness,
      searchOperators,
      highlight,
      highlightField,
      customHighlight,
      interval,
      aggregations,
      missingLabel,
      showMissing,
      defaultQuery,
      customQuery,
      enableSynonyms,
      selectAllLabel,
      pagination,
      queryString,
      onValueChange,
      onResults,
      onAggregationData,
      onError,
      onRequestStatusChange,
      onQueryChange,
      onMicStatusChange,
      enablePopularSuggestions,
      enablePredictiveSuggestions,
      preserveResults,
      clearOnQueryChange,
      subscribeTo,
      distinctField,
      distinctFieldConfig,
      componentName,
      mongodb,
      enableRecentSuggestions,
      recentSuggestionsConfig,
      popularSuggestionsConfig,
      showDistinctSuggestions,
      maxPredictedWords,
      urlField,
      rankFeature,
      enableRecentSearches,
      applyStopwords,
      maxPopularSuggestions,
      stopwords
    } = this.props;
    let { value, categoryValue: category } = this.props;
    if (
      typeof window !== 'undefined' &&
      window &&
      window.location &&
      window.location.search
    ) {
      const params = new URLSearchParams(window.location.search);
      if (params.has(id)) {
        try {
          value = JSON.parse(params.get(id));
          if (typeof value === 'object' && value.category) {
            category = value.category;
            value = value.value;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          // Do not set value if JSON parsing fails.
        }
      }
    }
    // Register search base component
    context.register(id, {
      index,
      url,
      credentials,
      headers,
      appbaseConfig,
      transformRequest,
      transformResponse,
      value,
      type,
      react,
      queryFormat,
      dataField,
      autocompleteField,
      highlightConfig,
      categoryField,
      categoryValue: category || categoryValue,
      nestedField,
      from,
      size,
      sortBy,
      aggregationField,
      aggregationSize,
      after,
      includeNullValues,
      includeFields,
      excludeFields,
      fuzziness,
      searchOperators,
      highlight,
      highlightField,
      customHighlight,
      interval,
      aggregations,
      missingLabel,
      showMissing,
      defaultQuery,
      customQuery,
      enableSynonyms,
      selectAllLabel,
      pagination,
      queryString,
      onValueChange,
      onResults,
      onAggregationData,
      onError,
      onRequestStatusChange,
      onQueryChange,
      onMicStatusChange,
      enablePopularSuggestions,
      enablePredictiveSuggestions,
      preserveResults,
      clearOnQueryChange,
      distinctField,
      distinctFieldConfig,
      maxPopularSuggestions,
      componentName,
      mongodb,
      enableRecentSuggestions,
      recentSuggestionsConfig,
      popularSuggestionsConfig,
      showDistinctSuggestions,
      maxPredictedWords,
      urlField,
      rankFeature,
      enableRecentSearches,
      applyStopwords,
      stopwords,
      libAlias: LIBRARY_ALIAS.REACT_SEARCHBOX
    });
    if (context.initialState) {
      const initialState = context.initialState[id];
      if (initialState) {
        this.componentInstance.aggregationData.data =
          initialState.aggregationData.data;
        this.componentInstance.aggregationData.setRaw(
          initialState.aggregationData.rawData
        );
        this.componentInstance.categoryValue = initialState.categoryValue;
        this.componentInstance._queryId = initialState.queryId;
        this.componentInstance.value = initialState.value;
        this.componentInstance._lastRequestTimeCustomQuery =
          initialState._lastRequestTimeCustomQuery;
        this.componentInstance._lastRequestTimeDefaultQuery =
          initialState._lastRequestTimeDefaultQuery;
        this.componentInstance.results.data = initialState.results.data;
        this.componentInstance.results.raw = initialState.results.raw;
        this.componentInstance.results.setRaw(initialState.results.rawData);
        if (Array.isArray(JSON.parse(initialState._query))) {
          this.componentInstance._query = JSON.parse(initialState._query)[0];
        } else {
          this.componentInstance._query = initialState._query;
        }
      }
    }

    // Subscribe to state changes
    if (this.hasCustomRenderer) {
      this.componentInstance.subscribeToStateChanges(change => {
        const state = {};
        Object.keys(change).forEach(property => {
          state[property] = change[property].next;
        });
        this.setState(state);
      }, subscribeTo);
    }
  }

  componentDidMount() {
    const { triggerQueryOnInit, customQuery } = this.props;
    if (this.componentInstance) {
      if (triggerQueryOnInit) {
        this.componentInstance.triggerDefaultQuery();
      }
      if (
        // check to prevent customQuery at clientside when leveraging SSR
        (!this.context.initialState && this.componentInstance.value) ||
        customQuery
      ) {
        this.componentInstance.triggerCustomQuery();
      }
    }
  }

  componentWillUnmount() {
    const { id } = this.props;
    // unregister component
    this.context.unregister(id);
  }

  get componentInstance() {
    const { id } = this.props;
    return this.context.getComponent(id);
  }

  get hasCustomRenderer() {
    return hasCustomRenderer(this.props);
  }

  render() {
    const { id, URLParams } = this.props;
    if (this.hasCustomRenderer && this.componentInstance) {
      if (URLParams) {
        return (
          <URLParamsProvider id={id}>
            {getComponent(this.componentInstance.mappedProps, this.props)}
          </URLParamsProvider>
        );
      }
      return getComponent(this.componentInstance.mappedProps, this.props);
    }
    return null;
  }
}

SearchComponent.defaultProps = {
  // Triggers the default query on init
  triggerQueryOnInit: true,
  URLParams: false,
  enablePredictiveSuggestions: false,
  clearOnQueryChange: false,
  componentName: 'SearchComponent'
};

SearchComponent.propTypes = {
  index: string,
  url: string,
  credentials: string,
  headers: object,
  appbaseConfig: appbaseConfigDef,
  transformRequest: func,
  transformResponse: func,
  beforeValueChange: func,
  enablePopularSuggestions: bool,
  maxPopularSuggestions: number,
  enablePredictiveSuggestions: bool,
  clearOnQueryChange: bool,
  URLParams: bool,
  // RS API properties
  id: stringRequired,
  value: any,
  type: queryTypes,
  react: reactType,
  queryFormat: queryFormatDef,
  dataField: dataFieldDef,
  categoryField: string,
  categoryValue: string,
  nestedField: string,
  from: number,
  size: number,
  sortBy: sortType,
  aggregationSize: number,
  after: object,
  includeNullValues: bool,
  includeFields: sourceFields,
  excludeFields: sourceFields,
  fuzziness: fuzzinessDef,
  searchOperators: bool,
  preserveResults: bool,
  highlight: bool,
  highlightField: string,
  customHighlight: object,
  interval: number,
  aggregations: PropTypes.arrayOf(string),
  missingLabel: string,
  showMissing: bool,
  defaultQuery: func,
  customQuery: func,
  enableSynonyms: bool,
  selectAllLabel: string,
  pagination: bool,
  queryString: bool,
  render: func,
  distinctField: string,
  distinctFieldConfig: object,
  // subscribe on changes,
  subscribeTo: PropTypes.arrayOf(string),
  triggerQueryOnInit: bool,
  // event listeners
  // called when value changes
  onValueChange: func,

  // called when results change
  onResults: func,

  // called when composite aggregations change
  onAggregationData: func,

  // called when there is an error while fetching results
  onError: func,

  // called when request status changes
  onRequestStatusChange: func,

  // called when query changes
  onQueryChange: func,

  // called when mic status changes
  onMicStatusChange: func,
  // mongodb specific
  autocompleteField: dataFieldDef,
  highlightConfig: object,
  // meta info about instantiated component
  componentName: PropTypes.oneOf(['SearchBox', 'SearchComponent']),
  mongodb: object,
  recentSuggestionsConfig: object,
  popularSuggestionsConfig: object,
  maxPredictedWords: number,
  urlField: string,
  rankFeature: object,
  enableRecentSearches: bool,
  enableRecentSuggestions: bool,
  applyStopwords: bool,
  stopwords: PropTypes.arrayOf(string)
};

export default SearchComponent;

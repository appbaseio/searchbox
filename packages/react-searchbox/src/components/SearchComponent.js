import React from 'react';
import PropTypes from 'prop-types';
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
      value,
      type,
      react,
      queryFormat,
      dataField,
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
      clearFiltersOnQueryChange
    } = this.props;
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
      clearFiltersOnQueryChange
    });
  }

  componentDidMount() {
    const { subscribeTo, triggerQueryOnInit } = this.props;

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
    if (triggerQueryOnInit) {
      this.componentInstance.triggerDefaultQuery();
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
  clearFiltersOnQueryChange: false
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
  enablePredictiveSuggestions: bool,
  clearFiltersOnQueryChange: bool,
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
  onMicStatusChange: func
};

export default SearchComponent;

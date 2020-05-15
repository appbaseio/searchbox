/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component } from 'react';
import {
  appbaseConfig,
  any,
  bool,
  func,
  fuzziness,
  highlightField,
  number,
  object,
  position,
  queryFormat,
  string,
  suggestions,
  title,
  wholeNumber,
  dataFieldValidator
} from '../utils/types';
import Input from '../styles/Input';
import Title from '../styles/Title';
import {
  debounce as debounceFunc,
  equals,
  getClassName,
  getComponent,
  getQuerySuggestionsComponent,
  getURLParameters,
  hasCustomRenderer,
  hasQuerySuggestionsRenderer,
  isEmpty,
  isFunction,
  withClickIds
} from '../utils/helper';
import Downshift from 'downshift';
import Icons from './Icons';
import SuggestionItem from '../addons/SuggestionItem';
import Searchbase from '@appbaseio/searchbase';
import {
  suggestions as suggestionsCss,
  suggestionsContainer
} from '../styles/Suggestions';
import SuggestionWrapper from '../addons/SuggestionsWrapper';
import causes from '../utils/causes';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    const { value, defaultValue, defaultSuggestions, debounce } = props;
    const currentValue = value || defaultValue || '';

    this.state = {
      currentValue,
      suggestionsList: defaultSuggestions || [],
      querySuggestionsList: [],
      isOpen: false,
      error: null,
      loading: false
    };
    this.triggerSuggestionsQuery = debounceFunc(
      this.triggerSuggestionsQuery,
      debounce
    );
  }

  componentDidMount() {
    this._initSearchBase();
    const { URLParams, currentUrl } = this.props;
    if (URLParams) {
      this.setValue({
        value: this.getSearchTerm(currentUrl),
        isOpen: false
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      dataField,
      headers,
      fuzziness,
      nestedField,
      currentUrl,
      URLParams,
      appbaseConfig
    } = this.props;
    this._applySetter(prevProps.dataField, dataField, 'setDataField');
    this._applySetter(prevProps.headers, headers, 'setHeaders');
    this._applySetter(prevProps.fuzziness, fuzziness, 'setFuzziness');
    this._applySetter(prevProps.nestedField, nestedField, 'setNestedField');
    // eslint-disable-next-line react/prop-types
    if (URLParams && prevProps.currentUrl !== currentUrl) {
      this.setValue({
        value: this.getSearchTerm(currentUrl),
        isOpen: false
      });
    }
    if (
      JSON.stringify(prevProps.appbaseConfig) !== JSON.stringify(appbaseConfig)
    ) {
      if (this.searchBase) this.searchBase.appbaseConfig = appbaseConfig;
    }
  }

  componentWillUnmount() {
    this.searchBase.unsubscribeToStateChanges(this.setStateValue);
  }

  getSearchTerm = (url = '') => {
    const searchParams = getURLParameters(url);
    return searchParams && searchParams[this.props.searchTerm];
  };

  _initSearchBase = () => {
    const {
      app,
      url,
      enableAppbase,
      dataField,
      credentials,
      headers,
      nestedField,
      defaultQuery,
      beforeValueChange,
      queryFormat,
      defaultSuggestions,
      fuzziness,
      searchOperators,
      onQueryChange,
      onValueChange,
      onSuggestions,
      onError,
      onResults,
      aggregationField,
      onAggregationData,
      size,
      appbaseConfig,
      enableQuerySuggestions
    } = this.props;

    try {
      const transformQuery = query => {
        if (defaultQuery) {
          return defaultQuery(query, this.state.currentValue);
        }
        return Promise.resolve(query);
      };

      this.searchBase = new Searchbase({
        index: app,
        url,
        enableAppbase,
        enableQuerySuggestions,
        dataField,
        aggregationField,
        size,
        credentials,
        appbaseConfig,
        headers,
        nestedField,
        transformQuery,
        beforeValueChange,
        queryFormat,
        suggestions: defaultSuggestions,
        fuzziness,
        searchOperators
      });
      this.searchBase.subscribeToStateChanges(this.setStateValue, [
        'suggestions'
      ]);

      this.searchBase.onQueryChange = onQueryChange;
      this.searchBase.onValueChange = (next, prev) => {
        this.setState({ currentValue: next });
        if (onValueChange) onValueChange(next, prev);
      };
      this.searchBase.onSuggestions = onSuggestions;
      this.searchBase.onAggregationData = onAggregationData;
      this.searchBase.onError = error => {
        this.setState({ error });
        if (onError) onError(error);
      };
      this.searchBase.onResults = onResults;
      this.searchBase.onSuggestionsRequestStatusChange = next => {
        this.setState({ loading: next === 'PENDING' });
      };
      this.searchBase.onMicStatusChange = next => {
        this.setState(prevState => {
          const { loading } = prevState;
          return {
            micStatus: next,
            isOpen: next === 'INACTIVE' && !loading
          };
        });
      };
      this.searchBase.onQuerySuggestions = next => {
        this.setState({
          querySuggestionsList: withClickIds(next && next.data) || []
        });
      };
    } catch (e) {
      this.setState({ initError: e });
      console.error(e);
    }
  };

  _applySetter = (prev, next, setterFunc) => {
    if (!equals(prev, next))
      this.searchBase && this.searchBase[setterFunc](next);
  };

  setStateValue = ({ suggestions = {} }) => {
    const {
      time,
      hidden,
      data,
      promoted,
      numberOfResults,
      promotedData,
      customData,
      rawData
    } = suggestions.next || {};
    this.setState({
      suggestionsList: withClickIds(suggestions.next && data) || [],
      promotedData,
      customData,
      rawData,
      resultStats: {
        time,
        hidden,
        promoted,
        numberOfResults
      }
    });
  };

  getComponent = (downshiftProps = {}, isQuerySuggestionsRender = false) => {
    const {
      currentValue,
      suggestionsList,
      error,
      loading,
      resultStats,
      promotedData,
      customData,
      rawData,
      querySuggestionsList
    } = this.state;
    const data = {
      error,
      loading,
      downshiftProps,
      data: suggestionsList,
      value: currentValue,
      triggerClickAnalytics: this.triggerClickAnalytics,
      promotedData,
      customData,
      resultStats,
      rawData,
      querySuggestions: querySuggestionsList
    };
    if (isQuerySuggestionsRender) {
      return getQuerySuggestionsComponent(
        {
          downshiftProps,
          data: querySuggestionsList,
          value: currentValue,
          loading,
          error
        },
        this.props
      );
    }
    return getComponent(data, this.props);
  };

  triggerClickAnalytics = (clickPosition, isSuggestion = true, value) => {
    const { appbaseConfig } = this.props;
    if (!appbaseConfig.recordAnalytics || !this.searchBase) return;
    this.searchBase.recordClick({ [value]: clickPosition }, isSuggestion);
  };

  get hasCustomRenderer() {
    return hasCustomRenderer(this.props);
  }

  withTriggerQuery = func => {
    if (func) {
      return e => func(e, this.triggerQuery);
    }
    return undefined;
  };

  triggerQuery = () => {
    this.searchBase &&
      this.searchBase.setValue(this.props.value, {
        triggerQuery: true
      });
  };

  onInputChange = event => {
    this.setValue({ value: event.target.value, event });
  };

  setValue = ({ value, isOpen = true, ...rest }) => {
    const { onChange, debounce, URLParams, searchTerm } = this.props;
    if (onChange) {
      onChange(value, this.triggerQuery, rest.event);
    } else {
      this.setState({ isOpen });
      if (debounce > 0)
        this.searchBase.setValue(value, { triggerQuery: false });
      this.triggerSuggestionsQuery(value);
      if (URLParams) {
        window.history.replaceState(
          !isEmpty(value) ? { [searchTerm]: value } : null,
          null,
          !isEmpty(value) ? `?${searchTerm}=${value}` : window.location.origin
        );
      }
    }
  };

  onValueSelected = (currentValue = this.state.currentValue, ...cause) => {
    const { onValueSelected } = this.props;
    if (onValueSelected) {
      onValueSelected(currentValue, ...cause);
    }
  };

  triggerSuggestionsQuery = value => {
    this.searchBase &&
      this.searchBase.setValue(value || '', {
        triggerSuggestionsQuery: true
      });
  };

  getBackgroundColor = (highlightedIndex, index) =>
    highlightedIndex === index ? '#eee' : '#fff';

  handleSearchIconClick = () => {
    const { currentValue } = this.state;
    if (currentValue.trim()) {
      this.setValue({ value: currentValue, isOpen: false });
      this.onValueSelected(currentValue, causes.SEARCH_ICON_CLICK);
    }
  };

  clearValue = () => {
    this.setValue({ value: '', isOpen: false });
    this.onValueSelected(null, causes.CLEAR_VALUE);
  };

  onSuggestionSelected = suggestion => {
    this.setValue({ value: suggestion && suggestion.value, isOpen: false });
    this.triggerClickAnalytics(
      suggestion && suggestion._click_id,
      true,
      suggestion.source && suggestion.source._id
    );
    this.onValueSelected(
      suggestion.value,
      causes.SUGGESTION_SELECT,
      suggestion.source
    );
  };

  handleStateChange = changes => {
    const { isOpen, type } = changes;
    if (type === Downshift.stateChangeTypes.mouseUp) {
      this.setState({
        isOpen
      });
    }
  };

  handleFocus = event => {
    this.setState({
      isOpen: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(event, this.triggerQuery);
    }
  };

  renderIcons = () => {
    const {
      iconPosition,
      showClear,
      clearIcon,
      getMicInstance,
      renderMic,
      innerClass,
      showVoiceSearch,
      icon,
      showIcon
    } = this.props;
    const { currentValue, micStatus } = this.state;
    return (
      <Icons
        clearValue={this.clearValue}
        iconPosition={iconPosition}
        showClear={showClear}
        clearIcon={clearIcon}
        currentValue={currentValue}
        handleSearchIconClick={this.handleSearchIconClick}
        icon={icon}
        showIcon={showIcon}
        getMicInstance={getMicInstance}
        renderMic={renderMic}
        innerClass={innerClass}
        enableVoiceSearch={showVoiceSearch}
        onMicClick={() => {
          this.searchBase &&
            this.searchBase.onMicClick(null, { triggerSuggestionsQuery: true });
        }}
        micStatus={micStatus}
      />
    );
  };

  renderNoSuggestion = () => {
    const { renderNoSuggestion, innerClass, renderError } = this.props;
    const {
      loading,
      error,
      isOpen,
      currentValue,
      suggestionsList
    } = this.state;
    if (
      renderNoSuggestion &&
      isOpen &&
      !suggestionsList.length &&
      !loading &&
      currentValue &&
      !(renderError && error)
    ) {
      return (
        <SuggestionWrapper
          className="no-suggestions"
          innerClass={innerClass}
          innerClassName="noSuggestion"
        >
          {typeof renderNoSuggestion === 'function'
            ? renderNoSuggestion(currentValue)
            : renderNoSuggestion}
        </SuggestionWrapper>
      );
    }
    return null;
  };

  renderError = () => {
    const { renderError, innerClass } = this.props;
    const { error, loading, currentValue } = this.state;
    if (error && renderError && currentValue && !loading) {
      return (
        <SuggestionWrapper innerClass={innerClass} innerClassName="error">
          {isFunction(renderError) ? renderError(error) : renderError}
        </SuggestionWrapper>
      );
    }
    return null;
  };

  renderLoader = () => {
    const { loader, innerClass } = this.props;
    const { loading, currentValue } = this.state;
    if (loading && loader && currentValue) {
      return (
        <SuggestionWrapper innerClass={innerClass} innerClassName="loader">
          {loader}
        </SuggestionWrapper>
      );
    }
    return null;
  };

  handleKeyDown = (event, highlightedIndex) => {
    // if a suggestion was selected, delegate the handling
    // to suggestion handler
    if (event.key === 'Enter' && highlightedIndex === null) {
      this.setValue({ value: event.target.value, isOpen: false });
      this.onValueSelected(event.target.value, causes.ENTER_PRESS);
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event, this.triggerQuery);
    }
  };

  render() {
    const {
      style,
      className,
      title,
      innerClass,
      defaultSuggestions,
      autosuggest,
      showIcon,
      showClear,
      iconPosition,
      placeholder,
      onBlur,
      onKeyPress,
      onKeyUp,
      downShiftProps,
      onFocus,
      onKeyDown,
      autoFocus,
      value,
      renderError,
      size
    } = this.props;
    const {
      isOpen,
      currentValue,
      suggestionsList,
      initError,
      querySuggestionsList
    } = this.state;
    if (initError) {
      if (renderError)
        return isFunction(renderError) ? renderError(initError) : renderError;
      return <div>Error initializing SearchBase. Please try again.</div>;
    }
    return (
      <div style={style} className={className}>
        {title && (
          <Title className={getClassName(innerClass, 'title') || null}>
            {title}
          </Title>
        )}
        {defaultSuggestions || autosuggest ? (
          <Downshift
            id="search-box-downshift"
            onChange={this.onSuggestionSelected}
            onStateChange={this.handleStateChange}
            isOpen={isOpen}
            itemToString={i => i}
            {...downShiftProps}
          >
            {({
              getInputProps,
              getItemProps,
              isOpen,
              highlightedIndex,
              getRootProps,
              ...rest
            }) => (
              <div {...getRootProps({ css: suggestionsContainer })}>
                <Input
                  id="search-box"
                  showIcon={showIcon}
                  showClear={showClear}
                  iconPosition={iconPosition}
                  {...getInputProps({
                    className: getClassName(innerClass, 'input'),
                    placeholder: placeholder,
                    value: value || (currentValue === null ? '' : currentValue),
                    onChange: this.onInputChange,
                    onBlur: this.withTriggerQuery(onBlur),
                    onFocus: this.handleFocus,
                    onKeyPress: this.withTriggerQuery(onKeyPress),
                    onKeyUp: this.withTriggerQuery(onKeyUp),
                    onKeyDown: e => this.handleKeyDown(e, highlightedIndex)
                  })}
                />
                {this.renderIcons()}
                {this.hasCustomRenderer && (
                  <div>
                    {this.getComponent({
                      getInputProps,
                      getItemProps,
                      isOpen,
                      highlightedIndex,
                      ...rest
                    })}
                    {this.renderLoader()}
                  </div>
                )}
                {this.renderError()}
                {!this.hasCustomRenderer && isOpen && suggestionsList.length ? (
                  <ul
                    css={suggestionsCss}
                    className={getClassName(innerClass, 'list')}
                  >
                    {hasQuerySuggestionsRenderer(this.props)
                      ? this.getComponent(
                          {
                            getInputProps,
                            getItemProps,
                            isOpen,
                            highlightedIndex,
                            ...rest
                          },
                          true
                        )
                      : querySuggestionsList.map((sugg, index) => (
                          <li
                            {...getItemProps({ item: sugg })}
                            key={`${index + 1}-${sugg.value}`}
                            style={{
                              backgroundColor: this.getBackgroundColor(
                                highlightedIndex,
                                index
                              )
                            }}
                          >
                            <SuggestionItem
                              currentValue={currentValue}
                              suggestion={sugg}
                            />
                          </li>
                        ))}
                    {suggestionsList.slice(0, size).map((item, index) => (
                      <li
                        {...getItemProps({ item })}
                        key={`${index + querySuggestionsList.length + 1}-${
                          item.value
                        }`}
                        style={{
                          backgroundColor: this.getBackgroundColor(
                            highlightedIndex,
                            index + querySuggestionsList.length
                          )
                        }}
                      >
                        <SuggestionItem
                          currentValue={currentValue}
                          suggestion={item}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  this.renderNoSuggestion()
                )}
              </div>
            )}
          </Downshift>
        ) : (
          <div css={suggestionsContainer}>
            <Input
              className={getClassName(innerClass, 'input') || null}
              placeholder={placeholder}
              value={value || (currentValue === null ? '' : currentValue)}
              onChange={this.onInputChange}
              onBlur={this.withTriggerQuery(onBlur)}
              onFocus={this.withTriggerQuery(onFocus)}
              onKeyPress={this.withTriggerQuery(onKeyPress)}
              onKeyDown={this.withTriggerQuery(onKeyDown)}
              onKeyUp={this.withTriggerQuery(onKeyUp)}
              autoFocus={autoFocus}
              iconPosition={iconPosition}
              showIcon={showIcon}
              showClear={showClear}
            />
            {this.renderIcons()}
          </div>
        )}
      </div>
    );
  }
}

SearchBox.propTypes = {
  app: string.isRequired,
  url: string,
  enableAppbase: bool,
  enableQuerySuggestions: bool,
  credentials: string.isRequired,
  headers: object,
  dataField: dataFieldValidator,
  aggregationField: string,
  nestedField: string,
  size: number,
  title: string,
  defaultValue: string,
  value: string,
  downShiftProps: object,
  placeholder: string,
  showIcon: bool,
  iconPosition: position,
  icon: any,
  showClear: bool,
  clearIcon: any,
  autosuggest: bool,
  strictSelection: bool,
  defaultSuggestions: suggestions,
  debounce: wholeNumber,
  highlight: bool,
  highlightField,
  customHighlight: func,
  queryFormat,
  fuzziness,
  showVoiceSearch: bool,
  searchOperators: bool,
  render: func,
  renderQuerySuggestions: func,
  renderError: func,
  renderNoSuggestion: title,
  getMicInstance: func,
  renderMic: func,
  onChange: func,
  onValueChange: func,
  onValueSelected: func,
  onSuggestions: func,
  onAggregationData: func,
  onError: func,
  onResults: func,
  innerClass: object,
  style: object,
  defaultQuery: func,
  beforeValueChange: func,
  onQueryChange: func,
  className: string,
  loader: object,
  onBlur: func,
  onKeyPress: func,
  onKeyUp: func,
  onFocus: func,
  onKeyDown: func,
  autoFocus: bool,
  searchTerm: string,
  URLParams: bool,
  appbaseConfig: appbaseConfig
};

SearchBox.defaultProps = {
  size: 10,
  url: 'https://scalr.api.appbase.io',
  enableAppbase: false,
  enableQuerySuggestions: false,
  placeholder: 'Search',
  showIcon: true,
  iconPosition: 'right',
  showClear: false,
  autosuggest: true,
  strictSelection: false,
  debounce: 0,
  highlight: false,
  queryFormat: 'or',
  showVoiceSearch: false,
  searchOperators: false,
  className: '',
  autoFocus: false,
  downShiftProps: {},
  URLParams: false,
  searchTerm: 'search',
  appbaseConfig: {
    recordAnalytics: false
  }
};

export default SearchBox;

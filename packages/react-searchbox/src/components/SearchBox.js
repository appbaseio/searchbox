/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import {
  appbaseConfig as appbaseConfigDef,
  any,
  bool,
  func,
  fuzziness as fuzzinessDef,
  highlightField,
  number,
  object,
  position,
  queryFormat,
  string,
  suggestions as suggestionsDef,
  title as titleDef,
  wholeNumber,
  dataFieldValidator
} from '../utils/types';
import SearchComponent from './SearchComponent';
import Input from '../styles/Input';
import Title from '../styles/Title';
import {
  debounce as debounceFunc,
  equals,
  getClassName,
  getComponent,
  getPopularSuggestionsComponent,
  hasCustomRenderer,
  hasPopularSuggestionsRenderer,
  isFunction,
  SearchContext
} from '../utils/helper';
import Downshift from 'downshift';
import Icons from './Icons';
import SuggestionItem from '../addons/SuggestionItem';
import {
  suggestions as suggestionsCss,
  suggestionsContainer
} from '../styles/Suggestions';
import SuggestionWrapper from '../addons/SuggestionsWrapper';
import causes from '../utils/causes';

class SearchBox extends React.Component {
  static contextType = SearchContext;

  constructor(props, context) {
    super(props, context);
    const { value, defaultValue } = props;
    let currentValue = value || defaultValue || '';

    this.state = {
      isOpen: false
    };
    // Set the value in searchbase instance
    if (currentValue) {
      this.componentInstance.setValue(currentValue, {
        triggerDefaultQuery: false,
        triggerCustomQuery: true,
        stateChanges: true
      });
    }
  }

  componentDidMount() {
    const { enableRecentSearches } = this.props;
    if (enableRecentSearches) {
      this.componentInstance.getRecentSearches();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      dataField,
      headers,
      fuzziness,
      nestedField,
      currentUrl,
      appbaseConfig
    } = this.props;
    this._applySetter(prevProps.dataField, dataField, 'setDataField');
    this._applySetter(prevProps.headers, headers, 'setHeaders');
    this._applySetter(prevProps.fuzziness, fuzziness, 'setFuzziness');
    this._applySetter(prevProps.nestedField, nestedField, 'setNestedField');
    // eslint-disable-next-line react/prop-types
    if (prevProps.currentUrl !== currentUrl) {
      this.setValueFromURL();
    }
    if (
      JSON.stringify(prevProps.appbaseConfig) !== JSON.stringify(appbaseConfig)
    ) {
      if (this.componentInstance)
        this.componentInstance.appbaseConfig = appbaseConfig;
    }
  }

  get componentInstance() {
    const { id } = this.props;
    return this.context.getComponent(id);
  }

  get popularSuggestionsList() {
    const suggestions = this.componentInstance.suggestions;
    return (suggestions || []).filter(
      suggestion => suggestion._popular_suggestion
    );
  }

  get suggestionsList() {
    const { defaultSuggestions } = this.props;
    if (!this.componentInstance.value && defaultSuggestions) {
      return defaultSuggestions;
    }
    const suggestions = this.componentInstance.suggestions;
    return (suggestions || []).filter(
      suggestion => !suggestion._popular_suggestion
    );
  }

  get stats() {
    const total = this.componentInstance.results.numberOfResults;
    const { time, hidden, promotedData } = this.componentInstance.results;
    const size = this.props.size || 10;
    return {
      numberOfResults: total,
      ...(size > 0 ? { numberOfPages: Math.ceil(total / size) } : null),
      time,
      hidden,
      promoted: promotedData && promotedData.length
    };
  }

  _applySetter = (prev, next, setterFunc) => {
    if (!equals(prev, next))
      this.componentInstance && this.componentInstance[setterFunc](next);
  };

  getComponent = (downshiftProps = {}, isPopularSuggestionsRender = false) => {
    const { error, loading } = this.props;
    const data = {
      error,
      loading,
      downshiftProps,
      data: this.suggestionsList,
      value: this.componentInstance.value,
      triggerClickAnalytics: this.triggerClickAnalytics,
      promotedData: this.componentInstance.results.promotedData,
      customData: this.componentInstance.results.customData,
      resultStats: this.stats,
      rawData: this.componentInstance.results.rawData,
      popularSuggestions: this.popularSuggestionsList
    };
    if (isPopularSuggestionsRender) {
      return getPopularSuggestionsComponent(
        {
          downshiftProps,
          data: this.popularSuggestionsList,
          value: this.componentInstance.value,
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
    if (
      !(appbaseConfig && appbaseConfig.recordAnalytics) ||
      !this.componentInstance
    )
      return;
    this.componentInstance.recordClick(
      { [value]: clickPosition },
      isSuggestion
    );
  };

  get hasCustomRenderer() {
    return hasCustomRenderer(this.props);
  }

  withTriggerQuery = cb => {
    if (cb) {
      return e => cb(e, this.triggerQuery);
    }
    return undefined;
  };

  triggerQuery = () => {
    this.componentInstance &&
      this.componentInstance.setValue(this.props.value, {
        triggerCustomQuery: true,
        stateChanges: true
      });
  };

  triggerCustomQuery = () => {
    if (this.componentInstance) {
      this.componentInstance.triggerCustomQuery();
    }
  };

  triggerDefaultQuery = () => {
    this.componentInstance && this.componentInstance.triggerDefaultQuery();
  };

  onInputChange = event => {
    this.setValue({ value: event.target.value, event });
  };

  setValue = ({ value, isOpen = true, ...rest }) => {
    const { onChange, debounce, enableRecentSearches } = this.props;
    if (enableRecentSearches && !value && this.componentInstance.value) {
      this.componentInstance.getRecentSearches();
    }
    if (onChange) {
      onChange(value, this.triggerQuery, rest.event);
    } else {
      this.setState({ isOpen });
      if (debounce > 0) {
        this.componentInstance.setValue(value, {
          triggerDefaultQuery: false,
          triggerCustomQuery: false,
          stateChanges: true
        });
        debounceFunc(this.triggerDefaultQuery, debounce);
        if (rest.triggerCustomQuery) {
          this.triggerCustomQuery();
        }
      } else {
        this.componentInstance.setValue(value || '', {
          triggerCustomQuery: rest.triggerCustomQuery,
          triggerDefaultQuery: true,
          stateChanges: true
        });
      }
    }
  };

  onValueSelected = (currentValue = this.componentInstance.value, ...cause) => {
    const { onValueSelected } = this.props;
    if (onValueSelected) {
      onValueSelected(currentValue, ...cause);
    }
  };

  getBackgroundColor = (highlightedIndex, index) =>
    highlightedIndex === index ? '#eee' : '#fff';

  handleSearchIconClick = () => {
    const currentValue = this.componentInstance.value;
    if (currentValue.trim()) {
      this.setValue({
        value: currentValue,
        isOpen: false,
        triggerCustomQuery: true
      });
      this.onValueSelected(currentValue, causes.SEARCH_ICON_CLICK);
    }
  };

  clearValue = () => {
    this.setValue({ value: '', isOpen: false, triggerCustomQuery: true });
    this.onValueSelected(null, causes.CLEAR_VALUE);
  };

  onSuggestionSelected = suggestion => {
    this.setValue({
      value: suggestion && suggestion.value,
      isOpen: false,
      triggerCustomQuery: true
    });
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
      showIcon,
      micStatus
    } = this.props;
    const currentValue = this.componentInstance.value;
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
          this.componentInstance && this.componentInstance.onMicClick(null);
        }}
        micStatus={micStatus}
      />
    );
  };

  renderNoSuggestion = () => {
    const {
      renderNoSuggestion,
      innerClass,
      renderError,
      loading,
      error
    } = this.props;
    const { isOpen } = this.state;
    const currentValue = this.componentInstance.value;
    if (
      renderNoSuggestion &&
      isOpen &&
      !this.suggestionsList.length &&
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
    const { renderError, innerClass, error, loading } = this.props;
    const currentValue = this.componentInstance.value;
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
    const { loader, innerClass, loading } = this.props;
    const currentValue = this.componentInstance.value;
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
      this.setValue({
        value: event.target.value,
        isOpen: false,
        triggerCustomQuery: true
      });
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
      size,
      recentSearches
    } = this.props;
    const currentValue = this.componentInstance.value || '';
    const hasSuggestions = defaultSuggestions || recentSearches;
    return (
      <div style={style} className={className}>
        {title && (
          <Title className={getClassName(innerClass, 'title') || null}>
            {title}
          </Title>
        )}
        {hasSuggestions || autosuggest ? (
          <Downshift
            id="search-box-downshift"
            onChange={this.onSuggestionSelected}
            onStateChange={this.handleStateChange}
            isOpen={this.state.isOpen}
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
                {!this.hasCustomRenderer &&
                isOpen &&
                this.suggestionsList.length ? (
                  <ul
                    css={suggestionsCss}
                    className={getClassName(innerClass, 'list')}
                  >
                    {this.suggestionsList.slice(0, size).map((item, index) => (
                      <li
                        {...getItemProps({ item })}
                        key={`${index + 1}-${item.value}`}
                        style={{
                          backgroundColor: this.getBackgroundColor(
                            highlightedIndex,
                            index
                          )
                        }}
                      >
                        <SuggestionItem
                          currentValue={currentValue}
                          suggestion={item}
                        />
                      </li>
                    ))}
                    {!currentValue
                      ? recentSearches.map((sugg, index) => (
                          <li
                            {...getItemProps({ item: sugg })}
                            key={`${index + this.suggestionsList + 1}-${
                              sugg.value
                            }`}
                            style={{
                              backgroundColor: this.getBackgroundColor(
                                highlightedIndex,
                                index + this.suggestionsList
                              )
                            }}
                          >
                            <SuggestionItem
                              currentValue={currentValue}
                              suggestion={sugg}
                            />
                          </li>
                        ))
                      : null}
                    {hasPopularSuggestionsRenderer(this.props)
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
                      : this.popularSuggestionsList.map((sugg, index) => (
                          <li
                            {...getItemProps({ item: sugg })}
                            key={`${index + this.suggestionsList + 1}-${
                              sugg.value
                            }`}
                            style={{
                              backgroundColor: this.getBackgroundColor(
                                highlightedIndex,
                                index + this.suggestionsList
                              )
                            }}
                          >
                            <SuggestionItem
                              currentValue={currentValue}
                              suggestion={sugg}
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
  enablePopularSuggestions: bool,
  dataField: dataFieldValidator,
  aggregationField: string,
  aggregationSize: number,
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
  defaultSuggestions: suggestionsDef,
  debounce: wholeNumber,
  highlight: bool,
  highlightField,
  customHighlight: func,
  queryFormat,
  fuzziness: fuzzinessDef,
  showVoiceSearch: bool,
  searchOperators: bool,
  render: func,
  renderPopularSuggestions: func,
  renderError: func,
  renderNoSuggestion: titleDef,
  getMicInstance: func,
  renderMic: func,
  onChange: func,
  onValueChange: func,
  onValueSelected: func,
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
  URLParams: bool,
  appbaseConfig: appbaseConfigDef,
  showDistinctSuggestions: bool,
  queryString: bool,

  // internal props
  error: any,
  loading: bool,
  results: object
};

SearchBox.defaultProps = {
  enableRecentSearches: false,
  placeholder: 'Search',
  showIcon: true,
  iconPosition: 'right',
  showClear: false,
  autosuggest: true,
  strictSelection: false,
  debounce: 0,
  showVoiceSearch: false,
  className: '',
  autoFocus: false,
  downShiftProps: {},
  URLParams: false,
  showDistinctSuggestions: true,
  enablePopularSuggestions: false,
  recentSearches: []
};

export default props => (
  <SearchComponent
    triggerQueryOnInit={false}
    value="" // Init value as empty
    {...props}
    subscribeTo={[
      'micStatus',
      'error',
      'requestPending',
      'results',
      'value',
      'recentSearches'
    ]}
  >
    {({ error, loading, results, value, recentSearches }) => (
      <SearchBox
        {...props}
        error={error}
        loading={loading}
        results={results}
        recentSearches={recentSearches}
      />
    )}
  </SearchComponent>
);

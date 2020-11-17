import React from 'react';
import {
  any,
  bool,
  func,
  number,
  object,
  string,
  arrayOf,
  array,
  oneOfType
} from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Modal,
  Pressable
} from 'react-native';
import {
  appbaseConfig as appbaseConfigDef,
  fuzziness as fuzzinessDef,
  highlightField,
  position,
  queryFormat,
  title as titleDef,
  wholeNumber,
  dataField as dataFieldDef
} from '../../utils/types';
import Icon from './SearchBar/Icon';
import { renderNode } from './SearchBar/helpers';
import defaultTheme from './SearchBar/helpers/theme';
import SearchComponent from '../SearchComponent';

import {
  debounce as debounceFunc,
  equals,
  getComponent,
  getPopularSuggestionsComponent,
  hasCustomRenderer,
  hasPopularSuggestionsRenderer,
  isFunction,
  SearchContext
} from '../../utils/helper';
import SearchBar from './SearchBar';
import causes from '../../utils/causes';

// TODO: Change for android
const defaultGoBackIcon = theme => ({
  type: 'ionicon',
  size: 24,
  name: 'ios-arrow-back'
});

class SearchBox extends React.Component {
  static contextType = SearchContext;

  constructor(props, context) {
    super(props, context);
    const { value, defaultValue } = props;
    let currentValue = value || defaultValue || '';

    this.state = {
      showModal: false
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

  componentDidUpdate(prevProps) {
    const {
      dataField,
      headers,
      fuzziness,
      nestedField,
      appbaseConfig
    } = this.props;
    this._applySetter(prevProps.dataField, dataField, 'setDataField');
    this._applySetter(prevProps.headers, headers, 'setHeaders');
    this._applySetter(prevProps.fuzziness, fuzziness, 'setFuzziness');
    this._applySetter(prevProps.nestedField, nestedField, 'setNestedField');
    if (
      JSON.stringify(prevProps.appbaseConfig) !== JSON.stringify(appbaseConfig)
    ) {
      if (this.componentInstance)
        this.componentInstance.appbaseConfig = appbaseConfig;
    }
  }

  closeModal = () => {
    const { showModal } = this.state;
    if (showModal) {
      this.setState({
        showModal: false
      });
    }
  };

  openModal = () => {
    const { showModal } = this.state;
    if (!showModal) {
      this.setState({
        showModal: true
      });
    }
  };

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

  getComponent = (isPopularSuggestionsRender = false) => {
    const { error, loading } = this.props;
    const data = {
      error,
      loading,
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

  onInputChange = value => {
    this.setValue({ value });
  };

  setValue = ({ value, isOpen = true, ...rest }) => {
    const { onChange, debounce } = this.props;
    if (onChange) {
      onChange(value, this.triggerCustomQuery);
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

  clearValue = () => {
    this.setValue({ value: '', isOpen: false, triggerCustomQuery: true });
    this.onValueSelected(null, causes.CLEAR_VALUE);
  };

  onSuggestionSelected = suggestion => {
    this.setValue({
      value: suggestion && suggestion.value,
      triggerCustomQuery: true
    });
    this.closeModal();
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

  renderNoSuggestion = () => {
    const { renderNoSuggestion, loading, error } = this.props;
    const currentValue = this.componentInstance.value;
    if (
      renderNoSuggestion &&
      !this.suggestionsList.length &&
      !loading &&
      currentValue &&
      !error
    ) {
      return typeof renderNoSuggestion === 'function'
        ? renderNoSuggestion(currentValue)
        : renderNoSuggestion;
    }
    return null;
  };

  handleSubmitEditing = e => {
    // if a suggestion was selected, delegate the handling
    // to suggestion handler
    this.setValue({
      value: e.nativeEvent.text,
      triggerCustomQuery: true
    });
    this.closeModal();
    this.onValueSelected(e.nativeEvent.text, causes.ENTER_PRESS);
  };

  renderSearchInput({ isOpenWithModal = false, ...rest } = {}) {
    const { placeholder, theme, loading, searchBarProps } = this.props;
    const currentValue = this.componentInstance.value || '';
    return (
      <SearchBar
        onChangeText={this.onInputChange}
        onSubmitEditing={this.handleSubmitEditing}
        onClear={this.clearValue}
        placeholder={placeholder}
        value={currentValue}
        autoFocus={isOpenWithModal}
        theme={theme}
        showLoading={loading}
        returnKeyType="search"
        {...rest}
        {...searchBarProps}
      />
    );
  }

  renderAutoSuggestView() {
    const {
      theme,
      goBackIcon = defaultGoBackIcon(theme),
      size,
      searchHeaderStyle
    } = this.props;
    return (
      <Modal
        supportedOrientations={null}
        transparent={false}
        visible={this.state.showModal}
        onRequestClose={this.closeModal}
      >
        <SafeAreaView style={styles.flex1}>
          <View style={styles.flex1}>
            <View
              style={StyleSheet.flatten([
                styles.searchHeaderStyle(theme),
                searchHeaderStyle
              ])}
            >
              {renderNode(Icon, goBackIcon, {
                theme,
                ...defaultGoBackIcon(theme),
                onPress: this.closeModal
              })}
            </View>
            {this.renderSearchInput({
              isOpenWithModal: true
            })}
            {this.hasCustomRenderer ? (
              <View>{this.getComponent()}</View>
            ) : (
              <View>
                {this.renderNoSuggestion()}
                {hasPopularSuggestionsRenderer(this.props) ? (
                  this.getComponent(true)
                ) : (
                  <FlatList
                    data={this.popularSuggestionsList}
                    keyExtractor={item => item.label}
                    ItemSeparatorComponent={this.renderItemSeparator}
                    renderItem={this.renderSuggestionItem}
                  />
                )}
                <FlatList
                  data={this.suggestionsList.slice(0, size)}
                  keyExtractor={item => item.label}
                  ItemSeparatorComponent={this.renderItemSeparator}
                  renderItem={this.renderSuggestionItem}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  renderSuggestionItem = ({ item }) => {
    const { renderItem } = this.props;
    if (renderItem) {
      return renderItem(item);
    }
    return (
      <Text
        style={styles.itemStyle}
        onPress={() => this.onSuggestionSelected(item)}
      >
        {item.label}
      </Text>
    );
  };

  renderItemSeparator = () => {
    const { separatorStyle, theme } = this.props;
    return (
      // Flat List Item Separator
      <View
        style={StyleSheet.flatten([
          styles.itemSeparator(theme),
          separatorStyle
        ])}
      />
    );
  };

  render() {
    const { showModal } = this.state;
    const { style, autosuggest } = this.props;
    return (
      <SafeAreaView style={styles.flex1}>
        <View style={style}>
          {!autosuggest ? this.renderSearchInput() : null}
          {showModal ? (
            this.renderAutoSuggestView()
          ) : (
            <Pressable onPress={this.openModal}>
              {this.renderSearchInput({
                pointerEvents: 'none'
              })}
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

SearchBox.propTypes = {
  enablePopularSuggestions: bool,
  dataField: dataFieldDef,
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
  defaultSuggestions: arrayOf(object),
  debounce: wholeNumber,
  highlight: bool,
  highlightField,
  customHighlight: func,
  queryFormat,
  fuzziness: fuzzinessDef,
  showVoiceSearch: bool,
  searchOperators: bool,
  render: func,
  renderItem: func,
  renderPopularSuggestions: func,
  renderNoSuggestion: titleDef,
  getMicInstance: func,
  renderMic: func,
  onChange: func,
  onValueChange: func,
  onValueSelected: func,
  onAggregationData: func,
  onError: func,
  onResults: func,
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
  appbaseConfig: appbaseConfigDef,
  showDistinctSuggestions: bool,
  queryString: bool,
  searchBarProps: object,
  separatorStyle: oneOfType([object, array]),
  searchHeaderStyle: oneOfType([object, array]),
  // internal props
  error: any,
  loading: bool,
  results: object
};

SearchBox.defaultProps = {
  enablePopularSuggestions: false,
  theme: defaultTheme,
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
  showDistinctSuggestions: true
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle: {
    padding: 10
  },
  itemSeparator: theme => ({
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8'
  }),
  searchHeaderStyle: theme => ({
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10
  }),
  flex1: {
    flex: 1
  }
});

export default props => (
  <SearchComponent
    triggerQueryOnInit={false}
    value="" // Init value as empty
    {...props}
    subscribeTo={['micStatus', 'error', 'requestPending', 'results', 'value']}
  >
    {({ error, loading, results, value }) => {
      return (
        <SearchBox
          {...props}
          error={error}
          loading={loading}
          results={results}
        />
      );
    }}
  </SearchComponent>
);

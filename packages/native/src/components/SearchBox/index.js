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
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Linking
} from 'react-native';
import {
  appbaseConfig as appbaseConfigDef,
  fuzziness as fuzzinessDef,
  queryFormat,
  title as titleDef,
  wholeNumber,
  dataField as dataFieldDef
} from '../../utils/types';
import Icon from './SearchBar/Icon';
import { renderNode, nodeType } from './SearchBar/helpers';
import defaultTheme from './SearchBar/helpers/theme';
import SearchComponent from '../SearchComponent';

import {
  debounce as debounceFunc,
  equals,
  getComponent,
  hasCustomRenderer,
  SearchContext,
  isFunction,
  queryTypes,
  suggestionTypes
} from '../../utils/helper';
import SearchBar from './SearchBar';
import causes from '../../utils/causes';

// TODO: Change for android
const defaultGoBackIcon = theme => ({
  type: 'ionicon',
  size: 24,
  name: 'ios-arrow-back'
});

const defaultRecentSearchIcon = theme => ({
  type: 'material',
  size: 24,
  name: 'history'
});

const defaultPromotedResultIcon = theme => ({
  type: 'material',
  size: 24,
  name: 'star'
});

const defaultPopularSuggestionIcon = theme => ({
  type: 'material',
  size: 24,
  name: 'trending-up'
});

const defaultAutoFillIcon = theme => ({
  type: 'feather',
  size: 24,
  name: 'arrow-up-left'
});

class SearchBox extends React.Component {
  static contextType = SearchContext;

  constructor(props, context) {
    super(props, context);
    const { value, defaultValue } = props;
    let currentValue = value || defaultValue || '';

    this.state = {
      showModal: false,
      autoFillInProgress: false
    };
    // Set the value in searchbase instance
    if (currentValue) {
      this.componentInstance.setValue(currentValue, {
        triggerDefaultQuery: false,
        triggerCustomQuery: true,
        stateChanges: true
      });
    }
    if (this.componentInstance) {
      const onResults = () => {
        this.scrollToTop();
      };
      if (this.componentInstance.onResults) {
        this.componentInstance.onResults = () => {
          onResults();
          this.componentInstance.onResults();
        };
      } else {
        this.componentInstance.onResults = onResults;
      }
    }
    this.searchbarRef = React.createRef();
    this.flatListRef = React.createRef();
  }

  componentDidMount() {
    const { aggregationField } = this.props;
    if (aggregationField) {
      console.warn(
        'Warning(SearchBox): The `aggregationField` prop has been marked as deprecated, please use the `distinctField` prop instead.'
      );
    }
  }

  componentDidUpdate(prevProps) {
    const {
      dataField,
      headers,
      fuzziness,
      nestedField,
      appbaseConfig,
      enableRecentSuggestions
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

    if (enableRecentSuggestions && this.suggestionsList?.length === 0) {
      this.triggerDefaultQuery();
    }
  }

  closeModal = () => {
    const { showModal, autoFillInProgress } = this.state;
    if (showModal) {
      this.clearState(() => {
        if (autoFillInProgress) {
          // Clear stale query
          this.setValue({
            value: ''
          });
        }
      });
    }
  };

  openModal = () => {
    const { showModal } = this.state;
    if (!showModal) {
      this.setState(
        {
          showModal: true
        },
        this.setFocus
      );
    }
  };

  get componentInstance() {
    const { id } = this.props;
    return this.context.getComponent(id);
  }

  get suggestionsList() {
    const { defaultSuggestions } = this.props;
    if (!this.componentInstance.value && defaultSuggestions) {
      return defaultSuggestions;
    }
    const suggestions = this.componentInstance.mongodb
      ? this.componentInstance.suggestions
      : this.componentInstance?.results?.data ?? [];
    return suggestions;
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

  get totalSuggestions() {
    return [...this.suggestionsList];
  }

  _applySetter = (prev, next, setterFunc) => {
    if (!equals(prev, next))
      this.componentInstance && this.componentInstance[setterFunc](next);
  };

  getComponent = () => {
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
      rawData: this.componentInstance.results.rawData
    };
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

  scrollToTop = () => {
    this.flatListRef.current &&
      this.flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  isControlled = () => {
    const { value, onChange } = this.props;
    if (value !== undefined && onChange) {
      return true;
    }
    return false;
  };

  setValue = ({
    value,
    clearResults = true,
    category = undefined,
    ...rest
  }) => {
    let triggerDefaultQuery = true;
    const { autoFillInProgress } = this.state;
    const { onChange, debounce, autosuggest } = this.props;
    if (!autosuggest) {
      triggerDefaultQuery = false;
    } else if (rest.triggerDefaultQuery !== undefined) {
      triggerDefaultQuery = rest.triggerDefaultQuery;
    }
    if (autoFillInProgress) {
      this.setState({
        autoFillInProgress: false
      });
    }

    // to set the category value - silent  update

    this.componentInstance.setCategoryValue(category, {
      triggerDefaultQuery: false,
      triggerCustomQuery: false
    });

    if (this.isControlled()) {
      this.componentInstance.setValue(value, {
        triggerDefaultQuery: !!rest.triggerDefaultQuery,
        triggerCustomQuery: !!rest.triggerCustomQuery
      });
      onChange(value, this.componentInstance);
    } else {
      if (!value && clearResults) {
        // Clear suggestions for empty value
        this.componentInstance.clearResults();
      }
      if (debounce > 0) {
        this.componentInstance.setValue(value, {
          triggerDefaultQuery: false,
          triggerCustomQuery: false,
          stateChanges: true
        });
        // only fetch suggestions for value
        if (value && triggerDefaultQuery) {
          debounceFunc(this.triggerDefaultQuery, debounce);
        }
        if (!autosuggest) {
          debounceFunc(this.triggerCustomQuery, debounce);
        }
        if (rest.triggerCustomQuery) {
          this.triggerCustomQuery();
        }
      } else {
        this.componentInstance.setValue(value || '', {
          triggerCustomQuery: rest.triggerCustomQuery,
          // only fetch suggestions for value
          triggerDefaultQuery: !!value && triggerDefaultQuery,
          stateChanges: true
        });
        if (!autosuggest) {
          this.triggerCustomQuery();
        }
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
    this.setValue({ value: '', triggerCustomQuery: true });
    this.onValueSelected(null, causes.CLEAR_VALUE);
  };

  onSuggestionSelected = suggestion => {
    if (
      suggestion.url &&
      // check valid url: https://stackoverflow.com/a/43467144/10822996
      new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ).test(suggestion.url)
    ) {
      Linking.openURL(suggestion.url);
      return;
    }
    const suggestionValue = suggestion.value;
    this.setValue({
      value: suggestionValue,
      triggerCustomQuery: true,
      category: suggestion._category
    });
    // Keyboard.dissmiss();
    this.closeModal();
    this.triggerClickAnalytics(
      suggestion && suggestion._click_id,
      true,
      suggestion.source && suggestion.source._id
    );
    this.onValueSelected(
      suggestionValue,
      causes.SUGGESTION_SELECT,
      suggestion.source
    );
  };

  renderNoSuggestion = () => {
    const { renderNoSuggestion, loading, error } = this.props;
    const currentValue = this.componentInstance.value;
    if (
      renderNoSuggestion &&
      !this.totalSuggestions.length &&
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

  clearState = (cb = () => null) => {
    this.setState(
      {
        showModal: false,
        autoFillInProgress: false
      },
      cb
    );
  };

  handleSubmitEditing = e => {
    const text = e.nativeEvent.text;
    // if a suggestion was selected, delegate the handling
    // to suggestion handler
    this.clearState(() =>
      this.setValue({
        value: text,
        triggerCustomQuery: true
      })
    );
    this.onValueSelected(text, causes.ENTER_PRESS);
  };

  setFocus() {
    setTimeout(() => {
      if (this.searchbarRef.current) {
        this.searchbarRef.current.focus();
      }
    }, 40);
  }

  handleAutoFill = item => {
    this.setState(
      {
        autoFillInProgress: true
      },
      () => {
        this.componentInstance.setValue(
          item?._category ? item.label : item.value
        );
        this.setState({ autoFillInProgress: false });
      }
    );
  };

  withTriggerQuery = cb => {
    if (cb) {
      return e => cb(this.componentInstance, e);
    }
    return undefined;
  };

  renderSearchInput({ isOpenWithModal = false, ...rest } = {}) {
    const {
      placeholder,
      theme,
      loading,
      style,
      searchBarProps,
      onBlur,
      onKeyPress,
      onFocus
    } = this.props;
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
        ref={this.searchbarRef}
        style={style}
        onBlur={this.withTriggerQuery(onBlur)}
        onFocus={this.withTriggerQuery(onFocus)}
        onKeyPress={this.withTriggerQuery(onKeyPress)}
        {...rest}
        {...searchBarProps}
      />
    );
  }

  renderAutoSuggestView() {
    const {
      theme,
      goBackIcon = defaultGoBackIcon(theme),
      searchHeaderStyle,
      suggestionsContainerStyle
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
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={StyleSheet.flatten([
                  styles.flex1,
                  suggestionsContainerStyle
                ])}
              >
                {this.getComponent()}
              </KeyboardAvoidingView>
            ) : (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={StyleSheet.flatten([
                  styles.flex1,
                  suggestionsContainerStyle
                ])}
              >
                {this.renderError()}
                {this.renderNoSuggestion()}
                {this.totalSuggestions.length ? (
                  <FlatList
                    ref={this.flatListRef}
                    data={this.totalSuggestions}
                    keyboardShouldPersistTaps={'handled'}
                    keyExtractor={item => item.label}
                    ItemSeparatorComponent={this.renderItemSeparator}
                    renderItem={this.renderSuggestionItem}
                  />
                ) : null}
              </KeyboardAvoidingView>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  renderSuggestionItem = ({ item }) => {
    const {
      renderItem,
      theme,
      autoFillIcon = defaultAutoFillIcon(theme),
      showAutoFill,
      recentSearchIcon = defaultRecentSearchIcon(theme),
      popularSuggestionIcon = defaultPopularSuggestionIcon(theme)
    } = this.props;
    const { isPredictiveSuggestion } = item;
    let isCategorySuggestion = !!item._category;
    let normalText = '';
    let highlightedText = '';
    if (renderItem) {
      return renderItem(item);
    }
    if (isCategorySuggestion) {
      normalText = item.label.split('in')[0];
      highlightedText =
        'in ' + item?.label?.split('in')?.[1]
          ? 'in ' + item.label.split('in')[1]
          : '';
    } else if (isPredictiveSuggestion) {
      normalText = /[^<]*/.exec(item.label)[0];
      highlightedText = />[^<]*/.exec(item.label)[0].replaceAll('>', '');
    }

    const getIcon = iconType => {
      switch (iconType) {
        case suggestionTypes.Recent:
          return recentSearchIcon;
        case suggestionTypes.Popular:
          return popularSuggestionIcon;
        case suggestionTypes.Promoted:
          return defaultPromotedResultIcon(theme);
        default:
          return null;
      }
    };

    const renderSuggestionLabel = labelText => {
      return labelText
        ?.split(/(<\w+\s+(?!term).*?>.*?().*?<\/[a-zA-Z]*>)/g)
        ?.filter(i => i)
        ?.map((text, index) => {
          return (
            <Text
              key={`${text} ${index}`}
              style={
                text.match(/(<\w+\s+(?!term).*?>.*?().*?<\/[a-zA-Z]*>)/g)
                  ? { fontWeight: '700' }
                  : {}
              }
              numberOfLines={1}
            >
              {text.replace(/<[^>]+>/g, '')}
            </Text>
          );
        });
    };

    return (
      <View style={styles.itemStyle}>
        <View style={styles.iconStyle}>
          {renderNode(Icon, getIcon(item._suggestion_type), {
            theme,
            onPress: () => this.onSuggestionSelected(item),
            ...getIcon(item._suggestion_type)
          })}
        </View>

        <TouchableOpacity
          style={{ display: 'flex', flexDirection: 'row', flex: 1 }}
          onPress={() => this.onSuggestionSelected(item)}
        >
          {isPredictiveSuggestion || isCategorySuggestion ? (
            <>
              <Text>{normalText}</Text>
              <Text style={{ fontWeight: '700' }} numberOfLines={1}>
                {highlightedText}
              </Text>
            </>
          ) : (
            renderSuggestionLabel(item.label)
          )}
        </TouchableOpacity>

        <View styles={styles.autoFillIcon}>
          {showAutoFill
            ? renderNode(Icon, autoFillIcon, {
                theme,
                onPress: () => this.handleAutoFill(item),
                ...defaultAutoFillIcon(theme)
              })
            : null}
        </View>
      </View>
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

  renderError = () => {
    const { renderError, error, loading } = this.props;
    if (error && renderError && !loading) {
      return isFunction(renderError) ? renderError(error) : renderError;
    }
    return null;
  };

  render() {
    const { showModal } = this.state;
    const { autosuggest } = this.props;
    if (!autosuggest) {
      return this.renderSearchInput();
    }
    return showModal
      ? this.renderAutoSuggestView()
      : autosuggest && (
          <Pressable onPress={this.openModal}>
            {this.renderSearchInput({
              pointerEvents: 'none'
            })}
          </Pressable>
        );
  }
}

SearchBox.propTypes = {
  // RS API
  dataField: dataFieldDef,
  autocompleteField: dataFieldDef,
  highlightConfig: object,
  aggregationField: string,
  aggregationSize: number,
  nestedField: string,
  size: number,
  debounce: wholeNumber,
  // TODO: Implement later
  // highlight: bool,
  // highlightField,
  // customHighlight: func,
  queryFormat,
  fuzziness: fuzzinessDef,
  searchOperators: bool,
  onValueSelected: func,
  onAggregationData: func,
  onError: func,
  onResults: func,
  defaultQuery: func,
  customQuery: func,
  onQueryChange: func,
  appbaseConfig: appbaseConfigDef,
  showDistinctSuggestions: bool,
  queryString: bool,
  onChange: func,
  // Customize Suggestions
  defaultSuggestions: arrayOf(object),
  autosuggest: bool,
  showAutoFill: bool,
  enablePopularSuggestions: bool,
  enableRecentSearches: bool,
  distinctField: string,
  distinctFieldConfig: object,
  // icons
  autoFillIcon: nodeType,
  recentSearchIcon: nodeType,
  goBackIcon: nodeType,
  // Customize UI
  defaultValue: string,
  value: string,
  placeholder: string,
  render: func,
  renderItem: func,
  renderNoSuggestion: titleDef,
  renderError: titleDef,
  style: object,
  searchBarProps: object,
  separatorStyle: oneOfType([object, array]),
  searchHeaderStyle: oneOfType([object, array]),
  suggestionsContainerStyle: oneOfType([object, array]),
  // Voice Search
  // TODO: Implement voice search
  // showVoiceSearch: bool,
  // getMicInstance: func,
  // renderMic: func,
  // internal props
  error: any,
  loading: bool,
  results: object,
  recentSearches: array,
  mongodb: object,
  enablePredictiveSuggestions: bool,
  recentSuggestionsConfig: object,
  popularSuggestionsConfig: object,
  maxPredictedWords: number,
  urlField: string,
  rankFeature: object,
  categoryField: string,
  categoryValue: string,
  enableRecentSuggestions: bool
};

SearchBox.defaultProps = {
  enablePopularSuggestions: false,
  enableRecentSearches: false,
  showAutoFill: true,
  theme: defaultTheme,
  placeholder: 'Search',
  showIcon: true,
  autosuggest: true,
  debounce: 0,
  showVoiceSearch: false,
  className: '',
  autoFocus: false,
  downShiftProps: {},
  showDistinctSuggestions: true,
  enablePredictiveSuggestions: false,
  value: undefined,
  enableRecentSuggestions: false,
  recentSuggestionsConfig: undefined,
  popularSuggestionsConfig: undefined,
  maxPredictedWords: 2,
  urlField: '',
  rankFeature: undefined,
  categoryField: '',
  categoryValue: ''
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    flex: 1,
    padding: 10
  },
  autoFillIcon: {
    justifyContent: 'flex-end'
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
  },
  iconStyle: {
    marginRight: 10
  }
});

export default props => (
  <SearchComponent
    componentName="SearchBox"
    triggerQueryOnInit={
      props.enableRecentSearches || props.enableRecentSuggestions
    }
    value="" // Init value as empty
    type={queryTypes.Suggestion}
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

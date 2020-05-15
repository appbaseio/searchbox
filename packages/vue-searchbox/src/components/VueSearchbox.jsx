import { types } from "../utils/types";
import Input from "../styles/Input";
import Searchbase from "@appbaseio/searchbase";
import DownShift from "./DownShift.jsx";
import {
  equals,
  getClassName,
  debounce as debounceFunc,
  isEmpty,
  getURLParameters,
  withClickIds
} from "../utils/helper";
import { suggestions, suggestionsContainer } from "../styles/Suggestions";
import SuggestionItem from "../addons/SuggestionItem.jsx";
import Title from "../styles/Title";
import Icons from "./Icons.jsx";
import causes from '../utils/causes';

const VueSearchbox = {
  name: "VueSearchbox", // vue component name
  props: {
    app: types.app,
    url: types.url,
    enableAppbase: types.enableAppbase,
    credentials: types.credentials,
    headers: types.headers,
    dataField: types.dataField,
    aggregationField: types.aggregationField,
    nestedField: types.nestedField,
    size: types.size,
    title: types.title,
    defaultValue: types.defaultValue,
    placeholder: types.placeholder,
    showIcon: types.showIcon,
    iconPosition: types.iconPosition,
    icon: types.icon,
    showClear: types.showClear,
    clearIcon: types.clearIcon,
    autosuggest: types.autosuggest,
    strictSelection: types.strictSelection,
    defaultSuggestions: types.defaultSuggestions,
    debounce: types.debounce,
    highlight: types.highlight,
    highlightField: types.highlightField,
    customHighlight: types.customHighlight,
    queryFormat: types.queryFormat,
    fuzziness: types.fuzziness,
    showVoiceSearch: types.showVoiceSearch,
    searchOperators: types.searchOperators,
    render: types.render,
    renderError: types.renderError,
    renderNoSuggestion: types.renderNoSuggestion,
    renderAllSuggestions: types.renderAllSuggestions,
    renderMic: types.renderMic,
    innerClass: types.innerClass,
    defaultQuery: types.defaultQuery,
    beforeValueChange: types.beforeValueChange,
    className: types.className,
    loader: types.loader,
    autoFocus: types.autoFocus,
    currentURL: types.currentURL,
    searchTerm: types.searchTerm,
    URLParams: types.URLParams,
    appbaseConfig: types.appbaseConfig
  },
  data() {
    const { value, defaultValue, defaultSuggestions } = this.$props;
    const currentValue = value || defaultValue || "";

    this.state = {
      currentValue,
      suggestionsList: defaultSuggestions || [],
      isOpen: false,
      error: null,
      loading: false,
      initError: null,
      micStatus: undefined
    };
    return this.state;
  },
  created() {
    this._initSearchBase();
    this.triggerSuggestionsQuery = debounceFunc(
      this.triggerSuggestionsQuery,
      this.debounce
    );
    if (this.URLParams) {
      this.setValue({
        value: this.getSearchTerm(this.currentURL),
        isOpen: false
      });
    }
  },
  watch: {
    $props: {
      immediate: true,
      handler() {
        this.validateDataField();
      },
    },
    dataField: function(next, prev) {
      return this._applySetter(prev, next, "setDataField");
    },
    headers: function(next, prev) {
      return this._applySetter(prev, next, "setHeaders");
    },
    fuzziness: function(next, prev) {
      return this._applySetter(prev, next, "setFuzziness");
    },
    nestedField: function(next, prev) {
      return this._applySetter(prev, next, "setNestedField");
    },
    currentURL: function(next, prev) {
      const { URLParams } = this.$props;
      if (URLParams && prev !== next) {
        this.setValue({
          value: this.getSearchTerm(next),
          isOpen: false
        });
      }
    },
    appbaseConfig: function(next, prev) {
      if (JSON.stringify(next) !== JSON.stringify(prev)) {
        if (this.searchBase) this.searchBase.appbaseConfig = next;
      }
    }
  },
  beforeDestroy() {
    this.searchBase &&
      this.searchBase.unsubscribeToStateChanges(this.setStateValue);
  },
  methods: {
    validateDataField() {
      const propName = 'dataField';
      const componentName = VueSearchbox.name;
      const props = this.$props;
      const requiredError = `${propName} supplied to ${componentName} is required. Validation failed.`;
      const propValue = props[propName];
      if (!this.enableAppbase) {
        if (!propValue) {
          console.error(requiredError);
          return;
        }
        if (typeof propValue !== 'string' && !Array.isArray(propValue)) {
          console.error(
            `Invalid ${propName} supplied to ${componentName}. Validation failed.`,
          );
          return;
        }
        if (Array.isArray(propValue) && propValue.length === 0) {
          console.error(requiredError);
        }
      }
    },
    _initSearchBase() {
      const {
        app,
        url,
        enableAppbase,
        dataField,
        credentials,
        headers,
        nestedField,
        size,
        defaultQuery,
        beforeValueChange,
        queryFormat,
        defaultSuggestions,
        fuzziness,
        searchOperators,
        aggregationField,
        appbaseConfig,
      } = this.$props;

      try {
        const transformQuery = query => {
          if (defaultQuery) return defaultQuery(query, this.$data.currentValue);
          return Promise.resolve(query);
        };

        this.searchBase = new Searchbase({
          index: app,
          url,
          enableAppbase,
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
          "suggestions"
        ]);

        this.searchBase.onQueryChange = (...args) => {
          this.$emit("queryChange", ...args);
        };
        this.searchBase.onSuggestions = (...args) => {
          this.$emit("suggestions", ...args);
        };
        this.searchBase.onAggregationData = (...args) => {
          this.$emit("aggregations", ...args);
        };
        this.searchBase.onError = error => {
          this.error = error;
          this.$emit("error", error);
        };
        this.searchBase.onSuggestionsRequestStatusChange = next => {
          this.loading = next === "PENDING";
        };
        this.searchBase.onMicStatusChange = next => {
          this.micStatus = next;
          this.isOpen = next === "INACTIVE" && !this.loading;
        };
        this.searchBase.onValueChange = nextValue => {
          this.currentValue = nextValue;
          this.$emit("valueChange", nextValue);
        };
      } catch (e) {
        this.initError = e;
        console.error(e);
      }
    },
    _applySetter(prev, next, setterFunc) {
      if (!equals(prev, next))
        this.searchBase && this.searchBase[setterFunc](next);
    },
    setAnalytics(config) {
      if (!this.searchBase) return;
      const { emptyQuery, userId, customEvents } = config;
      const { analyticsInstance } = this.searchBase;
      emptyQuery
        ? analyticsInstance.enableEmptyQuery()
        : analyticsInstance.disableEmptyQuery();
      analyticsInstance.setUserID(userId).setCustomEvents(customEvents);
    },
    triggerClickAnalytics(clickPosition, isSuggestion = true, value) {
      const { appbaseConfig } = this.$props;
      if (!appbaseConfig.recordAnalytics || !this.searchBase) return;
      this.searchBase.recordClick({ [value]: clickPosition }, isSuggestion);
    },
    setStateValue({ suggestions = {} }) {
      const { time, hidden, data, promoted, numberOfResults, promotedData, customData, rawData } =
        suggestions.next || {};
      this.suggestionsList = withClickIds(suggestions.next && data) || [];
      this.promotedData = promotedData;
      this.customData = customData;
      this.rawData = rawData;
      this.resultStats = {
        time,
        hidden,
        promoted,
        numberOfResults
      };
    },
    onValueSelectedHandler(currentValue = this.$data.currentValue, ...cause) {
      this.$emit('valueSelected', currentValue, ...cause);
    },
    getSearchTerm(url = "") {
      const searchParams = getURLParameters(url);
      return searchParams && searchParams[this.searchTerm];
    },
    onInputChange(event) {
      this.setValue({ value: event.target.value, event });
    },
    onSuggestionSelected(suggestion) {
      this.setValue({ value: suggestion && suggestion.value, isOpen: false });
      this.triggerClickAnalytics(suggestion && suggestion._click_id, true, suggestion.source && suggestion.source._id);
      this.onValueSelectedHandler(
        suggestion.value,
        causes.SUGGESTION_SELECT,
        suggestion.source,
      );
    },
    setValue({ value, isOpen = true }) {
      const { debounce, searchTerm, URLParams } = this.$props;
      this.isOpen = isOpen;
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
    },
    triggerSuggestionsQuery(value) {
      this.searchBase &&
        this.searchBase.setValue(value || "", {
          triggerSuggestionsQuery: true
        });
    },
    handleFocus(event) {
      this.isOpen = true;
      this.$emit("focus", event);
    },
    handleStateChange(changes) {
      const { isOpen } = changes;
      this.isOpen = isOpen;
    },
    handleKeyDown(event, highlightedIndex) {
      // if a suggestion was selected, delegate the handling
      // to suggestion handler
      if (event.key === "Enter" && highlightedIndex === null) {
        this.setValue({ value: event.target.value, isOpen: false });
        this.onValueSelectedHandler(event.target.value, causes.ENTER_PRESS);
      }

      this.$emit("keyDown", event);
    },
    handleMicClick() {
      this.searchBase &&
        this.searchBase.onMicClick(null, {
          triggerSuggestionsQuery: true
        });
    },
    renderIcons() {
      const {
        iconPosition,
        showClear,
        clearIcon,
        innerClass,
        showVoiceSearch,
        icon,
        showIcon
      } = this.$props;
      const { currentValue, micStatus } = this.$data;
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
          innerClass={innerClass}
          enableVoiceSearch={showVoiceSearch}
          micStatus={micStatus}
          handleMicClick={this.handleMicClick}
        />
      );
    },
    renderNoSuggestionComponent() {
      const { innerClass, renderError } = this.$props;
      const {
        loading,
        error,
        isOpen,
        currentValue,
        suggestionsList
      } = this.$data;
      const renderNoSuggestion =
        this.$scopedSlots.renderNoSuggestion || this.$props.renderNoSuggestion;
      if (
        renderNoSuggestion &&
        isOpen &&
        !suggestionsList.length &&
        !loading &&
        currentValue &&
        !(renderError && error)
      ) {
        return (
          <div
            class={`no-suggestions ${getClassName(innerClass, "noSuggestion")}`}
          >
            {typeof renderNoSuggestion === "function"
              ? renderNoSuggestion(currentValue)
              : renderNoSuggestion}
          </div>
        );
      }
      return null;
    },
    renderErrorComponent() {
      const { innerClass } = this.$props;
      const renderError =
        this.$scopedSlots.renderError || this.$props.renderError;
      const { error, loading, currentValue } = this.$data;
      if (error && renderError && currentValue && !loading) {
        return (
          <div class={getClassName(innerClass, "error")}>
            {typeof renderError === "function"
              ? renderError(error)
              : renderError}
          </div>
        );
      }
      return null;
    },
    clearValue() {
      this.setValue({ value: "", isOpen: false });
      this.onValueSelectedHandler(null, causes.CLEAR_VALUE);
    },
    handleSearchIconClick() {
      const { currentValue } = this.$data;
      if (currentValue.trim()) {
        this.setValue({ value: currentValue, isOpen: false });
        this.onValueSelectedHandler(currentValue, causes.SEARCH_ICON_CLICK);
      }
    },
    getBackgroundColor(highlightedIndex, index) {
      return highlightedIndex === index ? "#eee" : "#fff";
    }
  },
  render() {
    const {
      className,
      innerClass,
      showIcon,
      showClear,
      iconPosition,
      title,
      defaultSuggestions,
      autosuggest,
      placeholder,
      autoFocus,
      innerRef,
      renderError,
      size,
    } = this.$props;
    const {
      currentValue,
      isOpen,
      suggestionsList,
      initError,
      promotedData,
      customData,
      resultStats,
      rawData
    } = this.$data;
    if (initError) {
      if (renderError)
        return typeof renderError === "function"
          ? renderError(initError)
          : renderError;
      return <div>Error initializing SearchBase. Please try again.</div>;
    }
    const renderAllSuggestions =
      this.$scopedSlots.renderAllSuggestions ||
      this.$props.renderAllSuggestions;
    return (
      <div class={className}>
        {title && (
          <Title class={getClassName(innerClass, "title") || ""}>{title}</Title>
        )}
        {defaultSuggestions || autosuggest ? (
          <DownShift
            id="searchbox-downshift"
            handleChange={this.onSuggestionSelected}
            handleMouseup={this.handleStateChange}
            isOpen={isOpen}
            scopedSlots={{
              default: ({
                getInputEvents,
                getInputProps,

                getItemProps,
                getItemEvents,

                isOpen,
                highlightedIndex
              }) => (
                <div class={suggestionsContainer}>
                  <Input
                    id="search-box"
                    showIcon={showIcon}
                    showClear={showClear}
                    iconPosition={iconPosition}
                    class={getClassName(innerClass, "input")}
                    placeholder={placeholder}
                    {...{
                      on: getInputEvents({
                        onInput: this.onInputChange,
                        onBlur: e => {
                          this.$emit("blur", e);
                        },
                        onFocus: this.handleFocus,
                        onKeyPress: e => {
                          this.$emit("keyPress", e);
                        },
                        onKeyDown: e => this.handleKeyDown(e, highlightedIndex),
                        onKeyUp: e => {
                          this.$emit("keyUp", e);
                        }
                      })
                    }}
                    {...{
                      domProps: getInputProps({
                        value: currentValue ? currentValue : ""
                      })
                    }}
                  />
                  {this.renderIcons()}
                  {renderAllSuggestions &&
                    renderAllSuggestions({
                      currentValue,
                      isOpen,
                      getItemProps,
                      getItemEvents,
                      highlightedIndex,
                      parsedSuggestions: suggestionsList,
                      promotedData,
                      customData,
                      resultStats,
                      rawData
                    })}
                  {this.renderErrorComponent()}
                  {!renderAllSuggestions && isOpen && suggestionsList.length ? (
                    <ul
                      class={`${suggestions} ${getClassName(
                        innerClass,
                        "list"
                      )}`}
                    >
                      {suggestionsList.slice(0, size).map((item, index) => (
                        <li
                          {...{
                            domProps: getItemProps({ item })
                          }}
                          {...{
                            on: getItemEvents({
                              item
                            })
                          }}
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
                    </ul>
                  ) : (
                    this.renderNoSuggestionComponent()
                  )}
                </div>
              )
            }}
          />
        ) : (
          <div class={suggestionsContainer}>
            <Input
              class={getClassName(innerClass, "input") || ""}
              placeholder={placeholder}
              {...{
                on: {
                  blur: e => {
                    this.$emit("blur", e);
                  },
                  keypress: e => {
                    this.$emit("keyPress", e);
                  },
                  input: this.onInputChange,
                  focus: e => {
                    this.$emit("focus", e);
                  },
                  keydown: e => {
                    this.$emit("keyDown", e);
                  },
                  keyup: e => {
                    this.$emit("keyUp", e);
                  }
                }
              }}
              {...{
                domProps: {
                  autofocus: autoFocus,
                  value: currentValue ? currentValue : ""
                }
              }}
              iconPosition={iconPosition}
              showIcon={showIcon}
              showClear={showClear}
              innerRef={innerRef}
            />
            {this.renderIcons()}
          </div>
        )}
      </div>
    );
  }
};

const VueSearchboxWrapper = {
  render() {
    return (
      <VueSearchbox
        {...{ attrs: this.$attrs }}
        currentURL={window.location.href}
      />
    );
  }
};

export default VueSearchboxWrapper;

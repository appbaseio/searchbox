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

const VueSearchbox = {
  name: "VueSearchbox", // vue component name
  props: {
    app: types.app,
    url: types.url,
    credentials: types.credentials,
    analytics: types.analytics,
    headers: types.headers,
    dataField: types.dataField,
    aggregationField: types.aggregationField,
    nestedField: types.nestedField,
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
    analyticsConfig: types.analyticsConfig
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
    analyticsConfig: function(next, prev) {
      if (this.analytics && JSON.stringify(next) !== JSON.stringify(prev)) {
        this.setAnalytics(next);
      }
    }
  },
  beforeDestroy() {
    this.searchBase &&
      this.searchBase.unsubscribeToStateChanges(this.setStateValue);
  },
  methods: {
    _initSearchBase() {
      const {
        app,
        url,
        dataField,
        credentials,
        analytics,
        headers,
        nestedField,
        defaultQuery,
        beforeValueChange,
        queryFormat,
        defaultSuggestions,
        fuzziness,
        searchOperators,
        aggregationField
      } = this.$props;

      try {
        const transformQuery = query => {
          if (defaultQuery) return defaultQuery(query, this.$data.currentValue);
          return Promise.resolve(query);
        };

        this.searchBase = new Searchbase({
          index: app,
          url,
          dataField,
          aggregationField,
          credentials,
          analytics,
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
    triggerClickAnalytics(clickPosition, isSuggestion = true) {
      const { analytics, analyticsConfig } = this.$props;
      if (
        !analytics ||
        !analyticsConfig.suggestionAnalytics ||
        !this.searchBase
      )
        return;
      this.searchBase.analyticsInstance.registerClick(
        clickPosition,
        isSuggestion
      );
    },
    setStateValue({ suggestions = {} }) {
      const { time, hidden, data, promoted, numberOfResults, promotedData } =
        suggestions.next || {};
      this.suggestionsList = withClickIds(suggestions.next && data) || [];
      this.promotedData = promotedData;
      this.resultStats = {
        time,
        hidden,
        promoted,
        numberOfResults
      };
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
      this.triggerClickAnalytics(suggestion && suggestion._click_id);
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
      if (event.key === "Enter" && highlightedIndex === null)
        this.setValue({ value: event.target.value, isOpen: false });

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
    },
    handleSearchIconClick() {
      const { currentValue } = this.$data;
      if (currentValue.trim()) {
        this.setValue({ value: currentValue, isOpen: false });
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
      renderError
    } = this.$props;
    const {
      currentValue,
      isOpen,
      suggestionsList,
      initError,
      promotedData,
      resultStats
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
                      resultStats
                    })}
                  {this.renderErrorComponent()}
                  {!renderAllSuggestions && isOpen && suggestionsList.length ? (
                    <ul
                      class={`${suggestions} ${getClassName(
                        innerClass,
                        "list"
                      )}`}
                    >
                      {suggestionsList.slice(0, 10).map((item, index) => (
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

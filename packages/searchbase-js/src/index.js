import SearchBase from '@appbaseio/searchbase';
import { getRelativePosition, uniqueId, getDOMAttributes } from './utils';

import './styles.css';

const searchDOM = `
  <input class="autocomplete-input" role="combobox" aria-autocomplete="list" autocomplete="off" aria-haspopup="listbox">
  <ul class="autocomplete-suggestions" tole="listbox"></ul>
`;

class SearchbaseJS {
  constructor({ search, renderSuggestion, renderNoSuggestion, ...rest } = {}) {
    /* DOM Initialization */
    if (!search) {
      throw new Error(
        ' You have not specified any search id. Please make sure you pass id attribute.'
      );
    }
    if (typeof search === 'string') {
      this.searchDOM = document.getElementById(search);
      if (!this.searchDOM) {
        throw new Error(
          `The DOM element with id ${search} does not exist. Make sure you have a element with id ${search}.`
        );
      }
      this.searchDOM.classList.add('autocomplete');
      this.searchDOM.innerHTML = searchDOM;
    }

    /* Searchbase Intialization */
    this.searchBaseInstance = new SearchBase({
      ...rest
    });

    this.suggestionsLoading = false;
    this.suggestions = [];

    this.searchBaseInstance.triggerQuery();

    this.searchBaseInstance.subscribeToStateChanges(() => {
      /* Suggestions  */
      this.suggestionsLoading = this.searchBaseInstance.suggestionsRequestPending;
      this.searchDOM.dataset.loading = this.suggestionsLoading;
    });

    this.searchBaseInstance.onSuggestions = suggestions => {
      this.suggestions = suggestions.data;
      this.updateSuggestions();
    };

    /* Binding Methods */
    this.initialize = this.initialize.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOuterClick = this.handleOuterClick.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.handleSuggestionMouseDown = this.handleSuggestionMouseDown.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    this.updateSuggestions = this.updateSuggestions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollToSelectedSuggestion = this.scrollToSelectedSuggestion.bind(
      this
    );

    /* Autocomplete Speifics */
    this.renderNoSuggestion = renderNoSuggestion || null;
    if (typeof renderSuggestion === 'function') {
      this.renderSuggestion = renderSuggestion;
    }
    this.initialize();
  }

  initialize() {
    this.searchDOM.style.position = 'relative';

    this.input = this.searchDOM.querySelector('input');
    this.suggestionList = this.searchDOM.querySelector('ul');

    this.expanded = false;
    this.selectedIndex = -1;

    /* Attributes & Styles */

    this.input.setAttribute('aria-expanded', this.expanded);

    this.suggestionList.style.position = 'absolute';
    this.suggestionList.style.zIndex = '1';
    this.suggestionList.style.width = '100%';
    this.suggestionList.style.boxSizing = 'border-box';

    this.position = getRelativePosition(this.input, this.suggestionList);

    if (!this.suggestionList.id) {
      this.suggestionList.id = uniqueId('autocomplete-suggestion-list-');
    }
    this.input.setAttribute('aria-owns', this.suggestionList.id);

    /* Intiializing Events */
    document.addEventListener('click', this.handleOuterClick);
    this.input.addEventListener('input', this.handleInput);
    this.input.addEventListener('focus', this.handleFocus);
    this.input.addEventListener('keydown', this.handleKeyDown);

    this.suggestionList.addEventListener('click', this.handleSuggestionClick);
    this.suggestionList.addEventListener(
      'mousedown',
      this.handleSuggestionMouseDown
    );
  }

  // eslint-disable-next-line
  getSuggestionValue(suggestion) {
    return suggestion.label;
  }

  /* Rendering */
  renderSuggestion(suggestion, props) {
    return `<li ${props}>${this.getSuggestionValue(suggestion)}</li>`;
  }

  updateSuggestions() {
    this.suggestionList.innerHTML = '';

    if (this.suggestions.length === 0 && this.renderNoSuggestion) {
      this.suggestionList.innerHTML = this.renderNoSuggestion;
    } else {
      /* Make Util Function */
      this.suggestions.forEach((suggestion, index) => {
        const attributes = getDOMAttributes({
          selectedIndex: this.selectedIndex,
          index
        });

        const suggestionHTML = this.renderSuggestion(suggestion, attributes);
        if (typeof suggestionHTML === 'string') {
          this.suggestionList.insertAdjacentHTML('beforeend', suggestionHTML);
        } else {
          this.suggestionList.insertAdjacentElement(
            'beforeend',
            suggestionHTML
          );
        }
      });

      this.searchDOM.dataset.position = this.position;

      if (this.position === 'below') {
        this.suggestionList.style.bottom = null;
        this.suggestionList.style.top = '100%';
      } else {
        this.suggestionList.style.top = null;
        this.suggestionList.style.bottom = '100%';
      }

      this.scrollToSelectedSuggestion();
    }
  }

  scrollToSelectedSuggestion() {
    const selectedSuggestionElement = this.suggestionList.querySelector(
      `[data-suggestion-index="${this.selectedIndex}"]`
    );
    if (!selectedSuggestionElement) {
      return;
    }

    const suggestionsPosition = this.suggestionList.getBoundingClientRect();
    const selectedSuggestionPosition = selectedSuggestionElement.getBoundingClientRect();

    if (selectedSuggestionPosition.top < suggestionsPosition.top) {
      // Element is above viewable area
      this.suggestionList.scrollTop -=
        suggestionsPosition.top - selectedSuggestionPosition.top;
    } else if (selectedSuggestionPosition.bottom > suggestionsPosition.bottom) {
      // Element is below viewable area
      this.suggestionList.scrollTop +=
        selectedSuggestionPosition.bottom - suggestionsPosition.bottom;
    }
  }

  handleArrows(selectedIndex) {
    const totalSuggestions = this.suggestions.length;
    this.selectedIndex =
      ((selectedIndex % totalSuggestions) + totalSuggestions) %
      totalSuggestions;

    // Update suggestions and aria attributes
    this.updateSuggestions();
  }

  hideDropdown() {
    this.expanded = false;
    this.suggestionList.style.visibility = 'hidden';
    this.suggestionList.style.pointerEvents = 'none';
    this.input.setAttribute('aria-expanded', this.expanded);
  }

  showDropdown() {
    this.expanded = true;

    this.suggestionList.style.visibility = 'visible';
    this.suggestionList.style.pointerEvents = 'auto';
    this.input.setAttribute('aria-expanded', this.expanded);
  }

  /* Events Handling */
  handleInput(e) {
    this.searchBaseInstance.setValue(e.target.value, {
      triggerSuggestionsQuery: true
    });
  }

  handleFocus() {
    this.showDropdown();
  }

  handleOuterClick(e) {
    if (!this.searchDOM.contains(e.target)) {
      this.hideDropdown();
    }
  }

  handleSuggestionClick(e) {
    const { target } = e;
    const selectedIndex = target.dataset.suggestionIndex;
    this.selectedIndex = selectedIndex;
    this.handleSubmit();
  }

  handleKeyDown(event) {
    const { key } = event;

    switch (key) {
      case 'Up':
      case 'Down':
      case 'ArrowUp':
      case 'ArrowDown': {
        const selectedIndex =
          key === 'ArrowUp' || key === 'Up'
            ? this.selectedIndex - 1
            : this.selectedIndex + 1;
        event.preventDefault();
        this.handleArrows(selectedIndex);
        break;
      }
      case 'Tab': {
        this.handleSubmit();
        break;
      }
      case 'Enter': {
        this.handleSubmit();
        break;
      }
      case 'Esc':
      case 'Escape': {
        this.hideDropdown();
        break;
      }
      default:
    }
  }

  // eslint-disable-next-line
  handleSuggestionMouseDown(e) {
    e.preventDefault();
  }

  handleSubmit() {
    const selectedSuggestion = this.suggestions[this.selectedIndex];
    const inputValue = this.getSuggestionValue(selectedSuggestion);

    this.input.value = inputValue;
    this.searchBaseInstance.setValue(inputValue, {
      triggerQuery: true
    });
    this.hideDropdown();
  }
}

export default SearchbaseJS;

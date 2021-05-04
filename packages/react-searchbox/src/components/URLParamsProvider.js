import React from 'react';
import { SearchContext, checkValidValue, isEqual } from '../utils/helper';
import { bool, stringRequired } from '../utils/types';

class URLParamsProvider extends React.Component {
  static contextType = SearchContext;

  get componentInstance() {
    const { id } = this.props;
    return this.context.getComponent(id);
  }

  componentDidMount() {
    const { id, triggerDefaultQueryOnInit } = this.props;
    if (window) {
      this.init();
      // Set component value
      if (this.params.has(id)) {
        try {
          this.componentInstance.setValue(JSON.parse(this.params.get(id)), {
            triggerDefaultQuery: !!triggerDefaultQueryOnInit,
            triggerCustomQuery: true,
            stateChanges: true
          });
        } catch (e) {
          console.error(e);
          // Do not set value if JSON parsing fails.
        }
      }

      window.addEventListener('popstate', () => {
        const options = {
          triggerCustomQuery: true,
          triggerDefaultQuery: true,
          stateChanges: true
        };
        this.init();
        if (this.params.has(id)) {
          // Set component value
          try {
            const paramValue = JSON.parse(this.params.get(id));
            if (!isEqual(this.componentInstance.value, paramValue)) {
              this.componentInstance.setValue(paramValue, options);
            }
          } catch (e) {
            console.error(e);
            // Do not set value if JSON parsing fails.
          }
        } else if (this.componentInstance.value) {
          // Remove inactive component
          this.componentInstance.setValue(null, options);
        }
      });

      this.componentInstance.subscribeToStateChanges(
        change => {
          this.init();
          // this ensures the url params change are handled
          // when the url changes, which enables us to
          // make `onpopstate` event handler work with history.pushState updates
          this.checkForURLParamsChange();
          // Set URLParams on value change
          // Only set the valid values
          if (checkValidValue(change.value.next)) {
            // stringify the values
            this.params.set(id, JSON.stringify(change.value.next));
          } else {
            this.params.delete(id);
          }
          // Update URLParam
          this.pushToHistory();
        },
        ['value']
      );
    }
  }

  componentWillUnmount() {
    const { id } = this.props;
    // Remove param on unmount
    this.params.delete(id);
  }

  init = () => {
    this.searchString = window.location.search;
    this.params = new URLSearchParams(this.searchString);
  };

  checkForURLParamsChange = () => {
    // we only compare the search string (window.location.search by default)
    // to see if the route has changed (or) not. This handles the following usecase:
    // search on homepage -> route changes -> search results page with same search query
    if (window) {
      const searchString = window.location.search;

      if (searchString !== this.searchString) {
        let event;
        if (typeof Event === 'function') {
          event = new Event('popstate');
        } else {
          // Correctly fire popstate event on IE11 to prevent app crash.
          event = document.createEvent('Event');
          event.initEvent('popstate', true, true);
        }

        window.dispatchEvent(event);
      }
    }
  };

  pushToHistory() {
    const paramsSting = this.params.toString()
      ? `?${this.params.toString()}`
      : '';
    const base = window.location.href.split('?')[0];
    const newURL = `${base}${paramsSting}`;

    if (window.history.pushState) {
      window.history.pushState({ path: newURL }, '', newURL);
    }
    this.init();
  }

  render() {
    return this.props.children;
  }
}

URLParamsProvider.propTypes = {
  id: stringRequired,
  triggerDefaultQueryOnInit: bool
};

URLParamsProvider.defaultProps = {
  triggerDefaultQueryOnInit: true
};

export default URLParamsProvider;

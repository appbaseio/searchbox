import React from 'react';
import { SearchContext } from '@appbaseio/react-searchbox';
/* eslint-disable */
const COMPONENTS_TO_SUBSCRIBE = ['author-filter', 'search-component'];
class SelectedFilters extends React.Component {
  static contextType = SearchContext;

  state = {};

  componentDidMount() {
    setTimeout(() => {
      const componentIds = COMPONENTS_TO_SUBSCRIBE;
      const components = this.context.getComponents();
      componentIds.forEach((componentId, index) => {
        components[componentId].subscribeToStateChanges(change => {
          const state = {};
          Object.keys(change).forEach(property => {
            state[componentId] = change[property].next;
          });
          this.setState(state);
        }, 'value');
      });
    }, 100);
  }

  renderFilters = () => {
    if (!Object.keys(this.state).length) return null;
    const filtersLabels = Object.keys(this.state);
    const filtersValues = Object.values(this.state);

    const jsxArray = [];
    filtersLabels.forEach((label, index) => {
      let currentFilterValue = '';
      if (Array.isArray(filtersValues[index])) {
        currentFilterValue = filtersValues[index].join(', ');
      } else if (filtersValues[index]) {
        currentFilterValue = filtersValues[index];
      }

      if (!!currentFilterValue)
        return jsxArray.push(
          <button
            onClick={() => this.removeFilter(label)}
            className="filter-btn"
            key={label}
          >
            {' '}
            <h5>{label}&nbsp;|&nbsp;</h5>
            <span title={currentFilterValue}>{currentFilterValue}</span>
          </button>
        );
    });
    if (jsxArray.length) {
      return (
        <div className="selected-filters">
          <h4>Selected Filters:</h4>
          {jsxArray}
          <button onClick={this.clearAll}>Clear All</button>
        </div>
      );
    }
    return null;
  };

  removeFilter = label => {
    const components = this.context.getComponents();
    components[label].setValue('', {
      triggerCustomQuery: true
    });
  };

  clearAll = () => {
    const components = this.context.getComponents();
    Object.keys(components).forEach(key => {
      this.removeFilter(key);
    });
  };

  render() {
    return this.renderFilters();
  }
}

export default SelectedFilters;

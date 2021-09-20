import React from 'react';
import { SearchContext } from '@appbaseio/react-searchbox';

class SelectedFilters extends React.Component {
  static contextType = SearchContext;

  get SelectedFilters() {
    const selectedFilters = {};
    const components = this.context.getComponents();
    const componentIds = Object.keys(components);
    const componentValues = Object.values(components);
    componentValues.forEach((component, index) => {
      if (!!component.value && component.value.length) {
        Object.assign(selectedFilters, {
          [componentIds[index]]: component.value
        });
      }
    });

    return selectedFilters;
  }

  renderFilters = filtersObj => {
    if (!Object.keys(filtersObj).length) return null;
    const filtersLabels = Object.keys(filtersObj);
    const filtersValues = Object.values(filtersObj);
    return filtersLabels.map((label, index) => {
      let currentFilterValue = '';
      if (Array.isArray(filtersValues[index])) {
        currentFilterValue = filtersValues[index].join(', ');
      } else {
        currentFilterValue = filtersValues[index];
      }
      return (
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
    const selectedFilters = this.SelectedFilters;
    return Object.keys(selectedFilters).length ? (
      <div className="selected-filters">
        <h4>Selected Filters:</h4>
        {this.renderFilters(selectedFilters)}{' '}
        <button onClick={this.clearAll}>Clear All</button>
      </div>
    ) : null;
  }
}

export default SelectedFilters;

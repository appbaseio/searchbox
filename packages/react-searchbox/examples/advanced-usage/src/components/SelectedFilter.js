import React from 'react';
import { SearchContext } from '@appbaseio/react-searchbox';

class SelectedFilters extends React.Component {
  static contextType = SearchContext;

  render() {
    const selectedFilters = Array.isArray(
      this.context.getComponent('author-filter').value
    )
      ? this.context.getComponent('author-filter').value
      : [];

    return selectedFilters.length === 0 ? null : (
      <div className="selected-filters">
        <h4>Selected Filters:</h4>
        {selectedFilters.map(filterItem => (
          <span key={filterItem}>{filterItem}</span>
        ))}
      </div>
    );
  }
}

export default SelectedFilters;

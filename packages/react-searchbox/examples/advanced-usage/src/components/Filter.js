import React from 'react';
import { SearchComponent } from '@appbaseio/react-searchbox';
export default () => {
  return (
    <React.Fragment>
      <h3>Author filter</h3>
      <SearchComponent
        id="author-filter"
        type="term"
        dataField="authors.keyword"
        subscribeTo={['aggregationData', 'requestStatus', 'value']}
        react={{
          and: ['search-component']
        }}
        // To initialize with default value
        value={[]}
        render={({ aggregationData, loading, value, setValue }) => {
          return (
            <div className="filter-container">
              {loading ? (
                <div>Loading Filters ...</div>
              ) : (
                aggregationData.data.map(item => (
                  <div className="list-item" key={item._key}>
                    <input
                      type="checkbox"
                      checked={value ? value.includes(item._key) : false}
                      value={item._key}
                      onChange={e => {
                        const values = value || [];
                        if (values && values.includes(e.target.value)) {
                          values.splice(values.indexOf(e.target.value), 1);
                        } else {
                          values.push(e.target.value);
                        }
                        // Set filter value and trigger custom query
                        setValue(values, {
                          triggerDefaultQuery: false,
                          triggerCustomQuery: true,
                          stateChanges: true
                        });
                      }}
                      id={item._key}
                    />
                    <label className="list-item-label" htmlFor={item._key}>
                      {item._key} ({item._doc_count})
                    </label>
                  </div>
                ))
              )}
            </div>
          );
        }}
      />
    </React.Fragment>
  );
};

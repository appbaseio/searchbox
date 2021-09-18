import React from 'react';
import { SearchComponent } from '@appbaseio/react-searchbox';
import SelectedFilters from './SelectedFilter';
export default () => {
  return (
    <SearchComponent
      id="result-component"
      dataField="original_title"
      size={20}
      react={{
        and: ['search-component', 'author-filter']
      }}
    >
      {({ results, loading, size, setValue }) => {
        return (
          <React.Fragment>
            {/* a component to render the selected authors from filter facet with id='author-filter' */}
            <SelectedFilters />

            {/* below code renders the result cards inside a div */}
            <div className="result-list-container">
              {loading ? (
                <div>Loading Results ...</div>
              ) : (
                <div>
                  {!results.data.length ? (
                    <div>No results found</div>
                  ) : (
                    <p>
                      {results.numberOfResults} results found in {results.time}
                      ms
                    </p>
                  )}
                  {results.data.map(item => (
                    <div className="flex book-content text-left" key={item._id}>
                      <img
                        src={item.image}
                        alt="Book Cover"
                        className="book-image"
                      />
                      <div
                        className="flex column justify-center"
                        style={{ marginLeft: 20 }}
                      >
                        <div className="book-header">{item.original_title}</div>
                        <div className="flex column justify-space-between">
                          <div>
                            <div>
                              by{' '}
                              <span className="authors-list">
                                {item.authors}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      }}
    </SearchComponent>
  );
};

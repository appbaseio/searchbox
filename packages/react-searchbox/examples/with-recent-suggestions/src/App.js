import React from 'react';
import { SearchBox, SearchComponent } from '@appbaseio/react-searchbox';
import ReactPaginate from 'react-paginate';

import './styles.css';

const App = () => {
  return (
    <div>
      <div>
        <h2>
          React Searchbox with recent suggestions{' '}
          <span style={{ fontSize: '1rem' }}>
            <a
              href="https://docs.appbase.io/docs/reactivesearch/react-searchbox/apireference/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API reference
            </a>
          </span>
        </h2>
        <SearchBox
          id="search-component"
          dataField={[
            {
              field: 'original_title',
              weight: 1
            },
            {
              field: 'original_title.search',
              weight: 3
            }
          ]}
          title="Search"
          placeholder="Search for Books"
          size={5}
          enableRecentSuggestions
          recentSuggestionsConfig={{
            size: 3,
            minHits: 2,
            index: 'good-books-ds'
          }}
        />
        <SearchComponent
          id="result-component"
          highlight
          dataField="original_title"
          size={10}
          react={{
            and: ['search-component']
          }}
        >
          {({ results, loading, size, setValue, setFrom }) => {
            return (
              <div className="result-list-container">
                {loading ? (
                  <div>Loading Results ...</div>
                ) : (
                  <div>
                    {!results.data.length ? (
                      <div>No results found</div>
                    ) : (
                      <p>
                        {results.numberOfResults} results found in{' '}
                        {results.time}
                        ms
                      </p>
                    )}
                    {results.data.map(item => (
                      <div
                        className="flex book-content text-left"
                        key={item._id}
                      >
                        <img
                          src={item.image}
                          alt="Book Cover"
                          className="book-image"
                        />
                        <div
                          className="flex column justify-center"
                          style={{ marginLeft: 20 }}
                        >
                          <div
                            className="book-header"
                            dangerouslySetInnerHTML={{
                              __html: item.original_title
                            }}
                          />
                          <div className="flex column justify-space-between">
                            <div>
                              <div>
                                by{' '}
                                <span className="authors-list">
                                  {item.authors}
                                </span>
                              </div>
                              <div className="ratings-list flex align-center">
                                <span className="stars">
                                  {Array(item.average_rating_rounded)
                                    .fill('x')
                                    .map((i, index) => (
                                      <i
                                        className="fas fa-star"
                                        key={item._id + `_${index}`}
                                      />
                                    )) // eslint-disable-line
                                  }
                                </span>
                                <span className="avg-rating">
                                  ({item.average_rating} avg)
                                </span>
                              </div>
                            </div>
                            <span className="pub-year">
                              Pub {item.original_publication_year}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <ReactPaginate
                  pageCount={Math.floor(results.numberOfResults / size)}
                  onPageChange={({ selected }) =>
                    setFrom((selected + 1) * size)
                  }
                  previousLabel="previous"
                  nextLabel="next"
                  breakLabel="..."
                  breakClassName="break-me"
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  subContainerClassName="pages pagination"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                />
              </div>
            );
          }}
        </SearchComponent>
      </div>
    </div>
  );
};

export default App;

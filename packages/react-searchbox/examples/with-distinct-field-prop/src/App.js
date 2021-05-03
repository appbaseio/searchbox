import React from 'react';

import {
  SearchBox,
  SearchBase,
  SearchComponent
} from '@appbaseio/react-searchbox';
import ReactPaginate from 'react-paginate';

import './styles.css';

export default () => (
  <SearchBase
    index="good-books-ds"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
    appbaseConfig={{
      recordAnalytics: true,
      enableQueryRules: true,
      userId: 'jon@appbase.io',
      customEvents: {
        platform: 'ios',
        device: 'iphoneX'
      }
    }}
  >
    <div>
      <h2>
        React Searchbox Demo{' '}
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
        style={{ paddingBottom: 10 }}
      />
      <div>
        <SearchComponent
          id="result-component"
          highlight
          dataField="original_title"
          size={10}
          react={{
            and: ['search-component']
          }}
          distinctField="authors.keyword"
          distinctFieldConfig={{
            inner_hits: {
              name: 'other_books',
              size: 3,
              sort: [{ timestamp: 'asc' }]
            },
            max_concurrent_group_searches: 4
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
                        {results.time}ms
                      </p>
                    )}
                    {results.data.map(item => {
                      const otherBooks = item.inner_hits
                        ? item.inner_hits.other_books.hits.hits
                        : [];
                      const updatedBooks = otherBooks.filter(
                        book =>
                          book._source.original_title !== item.original_title
                      );
                      return (
                        <div
                          className="flex book-content text-left"
                          key={item._id}
                        >
                          <img
                            src={item.image}
                            alt="Book Cover"
                            className="book-image"
                          />
                          <div className="flex column justify-center book-container">
                            <div
                              className="flex column"
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
                          {updatedBooks.length ? (
                            <div className="flex column other-books-container">
                              <div className="flex row other-books-header">
                                <span className="pub-year">
                                  Other books by the same Author(s) :
                                </span>
                              </div>
                              <div className="flex row other-books-sub-container">
                                <div className="flex col">
                                  <div className="flex row">
                                    {updatedBooks.map(book => (
                                      <div className="flex row">
                                        <img
                                          src={
                                            book._source.image_medium
                                              ? book._source.image_medium
                                              : book._source.image
                                          }
                                          alt="Book Cover"
                                          className="other-books-cover"
                                        />
                                        <div className="other-books-title-container">
                                          <h6 className="other-books-title">
                                            {book._source.original_title}
                                          </h6>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
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
  </SearchBase>
);

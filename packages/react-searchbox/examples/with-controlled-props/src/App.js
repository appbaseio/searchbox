import React, { Component } from 'react';
import {
  SearchBox,
  SearchBase,
  SearchComponent
} from '@appbaseio/react-searchbox';
import ReactPaginate from 'react-paginate';

import './styles.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  render() {
    return (
      <div>
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
              React Searchbox Demo{`${this.state.text}`}
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
              value={this.state.text}
              onChange={(value, searchComponent, e) => {
                // Perform actions after updating the value
                this.setState(
                  {
                    text: value
                  },
                  () => {
                    // To fetch suggestions
                    // searchComponent.triggerDefaultQuery();
                    // To update results
                    searchComponent.triggerCustomQuery();
                  }
                );
              }}
              // onBlur={(searchComponent, e) => {
              //   // To update results
              //   searchComponent.triggerCustomQuery();
              // }}
              // onKeyPress={(searchComponent, e) => {
              //   console.log('key pressed ==>> ', e.key);
              //   if (e.key === 'Enter') {
              //     // To update results
              //     searchComponent.triggerCustomQuery();
              //   }
              // }}
              // onValueSelected={value => {
              //   console.log('onValueSelected called ==>> ', value);
              // }}
              // onKeyDown={(searchComponent, e) => {
              //   console.log('onKeyDown called ==>> ', searchComponent, e);
              // }}
              // onKeyUp={(searchComponent, e) => {
              //   console.log('onKeyUp called ==>> ', searchComponent, e);
              // }}
              // onFocus={(searchComponent, e) => {
              //   console.log('onFocus called ==>> ', searchComponent, e);
              // }}
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
        </SearchBase>
      </div>
    );
  }
}

export default App;

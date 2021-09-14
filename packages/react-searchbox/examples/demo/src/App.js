import React from 'react';

import {
  SearchBox,
  SearchBase,
  SearchComponent
} from '@appbaseio/react-searchbox-mongodb';
import ReactPaginate from 'react-paginate';

import './styles.css';

export default () => (
  <SearchBase
    url="http://localhost:8080/_reactivesearch"
    index="default"
    mongodb={{
      db: 'ded',
      collection: 'collection'
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
            field: 'name',
            weight: 1
          }
        ]}
        title="Search"
        placeholder="Search for Books"
        autosuggest={true}
        showClear
        URLParams
        className="custom-class"
        size={5}
        maxPopularSuggestions={2}
        maxRecentSearches={3}
        // enablePopularSuggestions
        // enableRecentSearches
        iconPosition="left"
        style={{ paddingBottom: 10 }}
      />
      <div className="row">
        <div className="col">
          <SearchComponent
            id="author-filter"
            type="term"
            dataField="property_type"
            URLParams
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
        </div>

        <div className="col">
          <SearchComponent
            id="result-component"
            highlight
            dataField="original_title"
            size={10}
            react={{
              and: ['search-component', 'author-filter']
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
                      {results.data.map(item => (
                        <div
                          className="book-content text-left"
                          key={item._id}
                          style={{ padding: 10 }}
                        >
                          <h1>{item.name}</h1>
                          <p>{item.description}</p>

                          <span
                            style={{
                              background: '#efefef',
                              padding: 3,
                              borderRadius: 3,
                              marginTop: 10,
                              marginBottom: 10,
                              width: 'auto'
                            }}
                          >
                            #{item.property_type}
                          </span>
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
    </div>
  </SearchBase>
);

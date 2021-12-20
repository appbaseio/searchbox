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
    url="https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/public-demo-skxjb/service/http_endpoint/incoming_webhook/reactivesearch"
    mongodb={{
      db: 'sample_airbnb',
      collection: 'listingsAndReviews',
      index: 'custom'
    }}
  >
    <div>
      <h2>
        React Searchbox with Atlas Search Demo{' '}
        <span style={{ fontSize: '1rem' }}>
          <a
            href="https://docs.appbase.io/docs/reactivesearch/atlas-search/overview/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get started over here
          </a>
        </span>
      </h2>

      <SearchBox
        id="search-component"
        dataField={[
          {
            field: 'name',
            weight: 3
          }
        ]}
        autocompleteField={[
          {
            field: 'name',
            weight: 3
          }
        ]}
        title="Search"
        placeholder="Search for apartments"
      />

      <SearchComponent
        id="result-component"
        highlight
        dataField="name"
        size={5}
        includeFields={['name', 'description', 'property_type']}
        react={{
          and: ['search-component']
        }}
        index="custom"
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
                      {results.numberOfResults} results found in {results.time}
                      ms
                    </p>
                  )}
                  {results.data.map(item => (
                    <div
                      className="book-content text-left"
                      key={item._id}
                      style={{ padding: 10 }}
                    >
                      <h1>{item.name}</h1>
                      <p>
                        {item.description.substring(
                          0,
                          Math.min(160, item.description.length)
                        )}
                      </p>

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
                onPageChange={({ selected }) => setFrom(selected * size)}
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
);

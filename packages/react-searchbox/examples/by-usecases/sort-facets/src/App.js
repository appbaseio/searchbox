import React from 'react';

import { SearchBase, SearchComponent } from '@appbaseio/react-searchbox';
import ReactPaginate from 'react-paginate';

import './styles.css';

export default () => (
  <SearchBase
    index="default"
    url="https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/public-demo-skxjb/service/http_endpoint/incoming_webhook/reactivesearch"
    mongodb={{
      db: 'sample_airbnb',
      collection: 'listingsAndReviews'
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

      <div className="row">
        <div className="col">
          <SearchComponent
            title="Facet"
            id="facet-component"
            type="term"
            sortBy="asc"
            dataField="property_type"
            URLParams
            aggregationSize={10}
            includeFields={['name']}
            // To initialize with default value
            value={[]}
            render={({ aggregationData, loading, value, setValue }) => {
              return (
                <div className="filter-container">
                  <h3>Facet with 10 items in 'asc' order</h3>
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
            size={5}
            includeFields={['name', 'description', 'property_type']}
            react={{
              and: ['facet-component']
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
      </div>
    </div>
  </SearchBase>
);

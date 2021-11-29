import React from 'react';
import Rheostat from 'rheostat';

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
          <b>How many people you want to accommodate?</b>

          <SearchComponent
            id="facet-component"
            type="range"
            dataField="accommodates"
            URLParams
            aggregations={['min', 'max']}
            size={0}
            // To initialize with default value
            value={{
              start: 0,
              end: 16
            }}
            render={({ results, loading, value, setValue }) => {
              return (
                <div className="filter-container">
                  {loading ? (
                    <div>Loading Filters ...</div>
                  ) : (
                    <div style={{ marginTop: 20 }}>
                      {results.raw && (
                        <Rheostat
                          min={1}
                          max={16}
                          values={[value.start, value.end]}
                          handle={({ style, ...passProps }) => {
                            return (
                              <div
                                {...passProps}
                                style={{
                                  ...style
                                }}
                              >
                                <span
                                  style={{
                                    position: 'absolute',
                                    bottom: -25,
                                    fontWeight: 'bolder',
                                    marginLeft: -10
                                  }}
                                >
                                  {passProps['aria-valuenow']}
                                </span>
                              </div>
                            );
                          }}
                          onChange={newValues => {
                            setValue(
                              {
                                start: newValues.values[0],
                                end: newValues.values[1]
                              },
                              {
                                triggerDefaultQuery: false,
                                triggerCustomQuery: true,
                                stateChanges: true
                              }
                            );
                          }}
                        ></Rheostat>
                      )}
                    </div>
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
            includeFields={[
              'name',
              'description',
              'property_type',
              'accomodates'
            ]}
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
                          &nbsp;
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
                            Accommodates {item.accommodates}
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

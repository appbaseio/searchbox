import {
  SearchBox,
  SearchBase,
  SearchComponent,
  getServerResults
} from '@appbaseio/react-searchbox';

const App = props => {
  return (
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
      {...(props.contextCollector
        ? { contextCollector: props.contextCollector }
        : {})}
      initialState={props.initialState}
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

        <div className="row">
          <div className="col">
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
              autosuggest={true}
              showClear
              URLParams
              className="custom-class"
              size={5}
              enablePopularSuggestions={true}
              popularSuggestionsConfig={{
                size: 3,
                minChars: 2,
                index: 'good-books-ds'
              }}
              enableRecentSuggestions={true}
              recentSuggestionsConfig={{
                size: 3,
                minHits: 2,
                index: 'good-books-ds'
              }}
              iconPosition="left"
              style={{ paddingBottom: 10 }}
            />
            <SearchComponent
              id="author-filter"
              type="term"
              dataField="authors.keyword"
              subscribeTo={['aggregationData', 'requestStatus', 'value']}
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
                                values.splice(
                                  values.indexOf(e.target.value),
                                  1
                                );
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
                          <label
                            className="list-item-label"
                            htmlFor={item._key}
                          >
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
                  </div>
                );
              }}
            </SearchComponent>
          </div>
        </div>
      </div>
    </SearchBase>
  );
};
export async function getServerSideProps(context) {
  let initialState = await getServerResults()(App, context.resolvedUrl);
  return {
    props: { initialState, queryString: context.resolvedUrl } // will be passed to the page component as props
  };
}
export default App;

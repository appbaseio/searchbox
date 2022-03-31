import {
  SearchBox,
  SearchBase,
  SearchComponent,
  getServerResults
} from '@appbaseio/react-searchbox';

const App = props => (
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
  >
    <div>
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
  </SearchBase>
);
export async function getServerSideProps() {
  let context = await getServerResults()(App);
  console.log('inside getServerSideProps');
  return {
    props: {} // will be passed to the page component as props
  };
}
export default App;

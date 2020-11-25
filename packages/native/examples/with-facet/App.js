import React, { useState, useContext } from 'react';
import {
  SearchBase,
  SearchComponent,
  SearchBox,
  SearchContext
} from '@appbaseio/react-native-searchbox';
import {
  MaterialIcons,
  AntDesign,
  Feather,
  Ionicons
} from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Modal
} from 'react-native';

const renderResultItem = ({ item }) => {
  return (
    <View style={styles.itemStyle}>
      <Image
        style={styles.image}
        source={{
          uri: item.image
        }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.textStyle}>{item.original_title}</Text>
        <Text style={styles.textStyle}>by {item.authors}</Text>
        <View style={styles.star}>
          {Array(item.average_rating_rounded)
            .fill('x')
            .map((i, index) => (
              <AntDesign
                key={item._id + `_${index}`}
                name="star"
                size={24}
                color="gold"
              />
            ))}
          <Text style={styles.rating}>({item.average_rating} avg)</Text>
        </View>
        <Text>Pub {item.original_publication_year}</Text>
      </View>
    </View>
  );
};

const renderItemSeparator = () => {
  return (
    // Flat List Item Separator
    <View style={styles.itemSeparator} />
  );
};

const Filters = () => {
  const searchBase = useContext(SearchContext);
  return (
    <View style={styles.filterContainer}>
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
        // Avoid fetching query if component has already been initialized
        triggerQueryOnInit={!searchBase.getComponent('author-filter')}
        destroyOnUnmount={false}
        render={({ aggregationData, loading, value, setValue }) => {
          return (
            <View style={styles.flex1}>
              {loading ? (
                <ActivityIndicator
                  style={styles.loader}
                  size="large"
                  color="#000"
                />
              ) : (
                <View style={styles.flex1}>
                  <Text style={styles.filterLabel}>Select Authors</Text>
                  <FlatList
                    data={aggregationData.data}
                    keyExtractor={item => item._key}
                    ItemSeparatorComponent={renderItemSeparator}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          padding: 10,
                          alignItems: 'center'
                        }}
                      >
                        <CheckBox
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 10
                          }}
                          leftText={'CheckBox'}
                          isChecked={value ? value.includes(item._key) : false}
                          onClick={newValue => {
                            const values = value || [];
                            if (values && values.includes(item._key)) {
                              values.splice(values.indexOf(item._key), 1);
                            } else {
                              values.push(item._key);
                            }
                            // Set filter value and trigger custom query
                            setValue(values, {
                              triggerDefaultQuery: false,
                              stateChanges: true
                            });
                          }}
                        />
                        <Text>
                          {item._key} ({item._doc_count})
                        </Text>
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const Footer = ({ showFilter, setShowFilter }) => {
  const searchBase = useContext(SearchContext);
  const applyFilters = () => {
    const filterInstance = searchBase.getComponent('author-filter');
    if (filterInstance) {
      filterInstance.triggerCustomQuery();
    }
    setShowFilter(false);
  };
  return (
    <View style={styles.footerContainer}>
      {showFilter ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row'
          }}
        >
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText} onPress={applyFilters}>
              Apply
            </Text>
          </View>

          <View style={styles.separator} />
          <View style={styles.footerTextContainer}>
            <Text
              style={styles.footerText}
              onPress={() => setShowFilter(!showFilter)}
            >
              Close
            </Text>
          </View>
        </View>
      ) : (
        <Text
          style={styles.footerText}
          onPress={() => setShowFilter(!showFilter)}
        >
          Filters
        </Text>
      )}
    </View>
  );
};

export default function App() {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <SearchBase
        index="good-books-ds"
        credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
        url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
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
          renderNoSuggestion={() => <Text>No suggestions found</Text>}
          // autosuggest={false}
          enableRecentSearches
          // showAutoFill={false}
          enablePopularSuggestions
          // searchBarProps={{
          //   platform: 'android'
          // }}
          goBackIcon={props => <Ionicons {...props} />}
          autoFillIcon={props => <Feather name="arrow-up-left" {...props} />}
          recentSearchIcon={props => (
            <MaterialIcons name="history" {...props} />
          )}
          searchBarProps={{
            // platform: 'android'
            searchIcon: props => <MaterialIcons name="search" {...props} />,
            clearIcon: props => <MaterialIcons name="clear" {...props} />
          }}
        />
        <SearchComponent
          id="result-component"
          dataField="original_title"
          preserveResults
          size={10}
          react={{
            and: ['search-component', 'author-filter']
          }}
        >
          {({ results, loading, size, from, setValue, setFrom }) => {
            return (
              <View>
                {loading && !results.data.length ? (
                  <ActivityIndicator
                    style={styles.loader}
                    size="large"
                    color="#000"
                  />
                ) : (
                  <View>
                    {!results.data.length ? (
                      <Text style={styles.resultStats}>No results found</Text>
                    ) : (
                      <View style={styles.resultContainer}>
                        <Text style={styles.resultStats}>
                          {results.numberOfResults} results found in{' '}
                          {results.time}ms
                        </Text>
                        <FlatList
                          data={results.data}
                          keyboardShouldPersistTaps={'handled'}
                          keyExtractor={item => item._id}
                          ItemSeparatorComponent={renderItemSeparator}
                          renderItem={renderResultItem}
                          onEndReached={() => {
                            const offset = (from || 0) + size;
                            if (results.numberOfResults > offset) {
                              setFrom((from || 0) + size);
                            }
                          }}
                          onEndReachedThreshold={0.5}
                          ListFooterComponent={
                            loading ? (
                              <ActivityIndicator size="large" color="#000" />
                            ) : null
                          }
                        />
                      </View>
                    )}
                  </View>
                )}
              </View>
            );
          }}
        </SearchComponent>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showFilter}
          onRequestClose={() => {
            setShowFilter(false);
          }}
        >
          <SafeAreaView style={styles.container}>
            <Filters />
            <Footer showFilter={showFilter} setShowFilter={setShowFilter} />
          </SafeAreaView>
        </Modal>
      </SearchBase>
      <Footer showFilter={showFilter} setShowFilter={setShowFilter} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  loader: {
    marginTop: 50
  },
  itemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8'
  },
  image: {
    width: 100,
    marginRight: 10
  },
  itemStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    height: 170
  },
  star: {
    flexDirection: 'row',
    paddingBottom: 5
  },
  textStyle: {
    flexWrap: 'wrap',
    paddingBottom: 5
  },
  resultStats: {
    padding: 10
  },
  rating: {
    marginLeft: 10
  },
  footerContainer: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#000',
    height: 60,
    color: 'yellow'
  },
  footerText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 10
  },
  footerTextContainer: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  separator: {
    height: 40,
    marginVertical: 5,
    borderRightWidth: 1,
    borderRightColor: '#fff'
  },
  filterContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 50,
    paddingRight: 20
  },
  filterLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 10
  },
  flex1: {
    flex: 1
  }
});

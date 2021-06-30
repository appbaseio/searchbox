import React, { useState, useRef } from 'react';
import {
  SearchBase,
  SearchComponent,
  SearchBox
} from '@appbaseio/react-native-searchbox';
import { AntDesign } from '@expo/vector-icons';
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
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const renderResultItem = ({ item }) => (
    <View style={styles.itemStyle}>
      <Image
        style={styles.image}
        source={{
          uri: item.image
        }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.textStyle}>
          {item.original_title}
        </Text>
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

const renderItemSeparator = () => {
  return (
    // Flat List Item Separator
    <View style={styles.itemSeparator} />
  );
};

export default function App() {
  const [dataSource, setDataSource] = useState([]);
  const [resetPagination, setResetPagination] = useState(false);
  const [showAuthorSearchComponent, setShowAuthorSearchComponent] = useState(false);
  const stateRef = useRef();
  stateRef.current = dataSource;
  const stateRefQuery = useRef();
  stateRefQuery.current = resetPagination;
  const setResults = results => {
    if (stateRefQuery.current) {
      // Reset paginated data source
      setDataSource(results.data);
      setResetPagination(false);
    } else {
      setDataSource([...stateRef.current, ...results.data]);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
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
      {!showAuthorSearchComponent ?
      <View key="book-search-component">
          {/* as no index is specified in this component, by default all the queries made will be targetted to the
          index provided in seachbase component */}
          <SearchBox
            id="book-search-component"
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
            onValueSelected={value => {
              setResetPagination(true);
            }}
            placeholder="Search books"
            react={{
              and: ['author-search-component']
            }}
          />
      </View> :
      <View key="author-search-component">
        {/* all queries triggereing from this component will be tragetted to the 'good-books-clone' index in the BE as it is specified
        through the index prop  */}
        <SearchBox
          id="author-search-component"
          dataField={[
            {
              field: 'authors',
              weight: 1
            },
            {
              field: 'authors.search',
              weight: 3
            }
          ]}
          onValueSelected={value => {
            setResetPagination(true);
          }}
          placeholder="Search authors"
          index="good-books-clone"
          react={{
            and: ['book-search-component']
          }}
        />
      </View>}
      <SearchComponent
        id="result-component"
        dataField="original_title"
        size={10}
        react={{
          and: ['book-search-component', 'author-search-component']
        }}
        onResults={setResults}
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
                        data={dataSource}
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
                      <View>

                        </View>
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        }}
      </SearchComponent>
      <TouchableOpacity style={styles.searchButtonContainer} onPress={() => {
        Alert.alert(
          !showAuthorSearchComponent ? 'Switching search index to "good-books-clone"' : 'Switching search index to "good-books-ds"',
        );
          setShowAuthorSearchComponent(!showAuthorSearchComponent);
        }}>
        <Icon name='search' style={styles.searchButtonIcon}/>
        <Text style={styles.searchButtonText}>
          {showAuthorSearchComponent ? 'Books' : 'Authors' }
        </Text>
      </TouchableOpacity>
      </SearchBase>
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
  otherBooksHeader: {
    marginTop: 5
  },
  col: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  otherBooksContainer: {
    flexDirection: 'row',
    maxWidth: 150,
    maxHeight: 60,
    paddingTop: 5,
    paddingBottom: 5
  },
  otherBooksImage: {
    height: 35,
    width: 30,
    marginRight: 6
  },
  otherBooksText: {
    width: 90,
    lineHeight: 35,
    textAlignVertical: 'center'
  },
  searchButtonContainer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 120,
    position: 'absolute',
    bottom: 25,
    right: 20,
    height: 50,
    backgroundColor: 'rgba(52, 52, 52, 0.75)',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  searchButtonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchButtonIcon: {
    fontSize: 20,
    color: '#fff',
  }
});

import React from 'react';
import SearchBox from '@appbaseio/react-searchbox';

const Home = () => {
  return (
    <SearchBox
      app="good-books-ds"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
      dataField={['original_title', 'original_title.search']}
      showVoiceSearch
      searchTerm="search"
      URLParams
    />
  );
};

export default Home;

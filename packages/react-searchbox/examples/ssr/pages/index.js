import React from 'react';
import SearchBox from '@appbaseio/react-searchbox';

const Home = () => {
  return (
    <SearchBox
      app="good-books-ds"
      credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      dataField={['original_title', 'original_title.search']}
      showVoiceSearch
      searchTerm="search"
      URLParams
    />
  );
};

export default Home;

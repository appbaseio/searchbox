import React, { useState, useEffect } from 'react';

const Wrapper = props => {
  const Component = require('@appbaseio/react-searchbox').default;
  return <Component {...props} />;
};

const Home = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  return (
    mount && (
      <Wrapper
        app="good-books-ds"
        credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
        dataField={['original_title', 'original_title.search']}
        showVoiceSearch
        searchTerm="search"
        URLParams
      />
    )
  );
};

export default Home;

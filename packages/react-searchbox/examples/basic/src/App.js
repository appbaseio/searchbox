import React, { Component } from 'react';

import SearchBox from '@appbaseio/react-searchbox';
import './style.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>
          React Searchbox Demo{" "}
          <span style={{ fontSize: "1rem" }}>
            <a
              href="https://docs.appbase.io/docs/reactivesearch/react-searchbox/apireference/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API reference
            </a>
          </span>
        </h2>
        <SearchBox
          app="good-books-ds"
          credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
          url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
          dataField={['original_title', 'original_title.search']}
          showVoiceSearch
          searchTerm="search"
          URLParams
          analytics
          analyticsConfig={{
            searchStateHeader: true,
            suggestionAnalytics: true
          }}
          style={{ width: '50%', margin: '100px' }}
          showClear
        // renderNoSuggestion={() => 'hello world'}
        // showIcon={false}
          iconPosition="left"
        />
      </div>
    );
  }
}

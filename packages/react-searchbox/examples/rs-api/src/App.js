import React, { Component } from 'react';

import SearchBox from '@appbaseio/react-searchbox';
import { FaMicrophone } from 'react-icons/fa';

export default class App extends Component {
  state = { value: '' };

  handleChange = (value, triggerQuery) => {
    this.setState({ value }, () => {
      triggerQuery();
    });
  };

  render() {
    const { value, results } = this.state;
    return (
      <div style={{ width: '50%', margin: '100px' }}>
        <SearchBox
          app="good-books-ds"
          credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
          url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
          enableAppbase
          dataField={['original_title', 'original_title.search']}
          showClear
          value={value}
          onChange={this.handleChange}
          onResults={next => {
            console.log({ next });
            this.setState({ results: next.data });
          }}
        />
        <ul>
          {(results || []).map(result => (
            <li key={result.id}>{result.original_title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

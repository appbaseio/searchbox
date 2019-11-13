import React from 'react';
import ReactDOM from 'react-dom';

import Searchbase from '@appbaseio/searchbase';

// eslint-disable-next-line
class App extends React.Component {
  constructor(props) {
    super(props);
    const index = 'good-book-ds-latest';
    const url = 'https://scalr.api.appbase.io';
    const credentials = 'IPM14ICqp:8e573e86-8802-4a27-a7a1-4c7d0c62c186';

    this.searchBase = new Searchbase({
      index,
      url,
      dataField: 'original_title',
      aggregationField: 'original_title.keyword',
      credentials
    });

    // Pre-load results
    this.searchBase.triggerQuery();

    this.searchBase.onSuggestions = (next, prev) => {
      console.log('sugges', next, prev);
    };
    this.searchBase.onAggregationData = (next, prev) => {
      console.log('on aggs data', next, prev);
    };

    this.searchBase.subscribeToStateChanges(() => {
      this.forceUpdate();
    });
  }

  handleSelect = value => {
    this.searchBase.setValue(value, {
      triggerQuery: true
    });
  };

  handleChange = e => {
    this.searchBase.setValue(e.target.value, {
      triggerSuggestionsQuery: true
    });
  };

  render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.searchBase.value}
          onChange={this.handleChange}
        />

        <section style={{ margin: 20 }}>
          <b>Suggestions</b>
          {this.searchBase.suggestionsRequestPending && (
            <div>Loading suggestions...</div>
          )}
          {this.searchBase.suggestions.data.map(i => {
            return (
              <div onClick={() => this.handleSelect(i.value)} key={i.label}>
                {i.label}
              </div>
            );
          })}
        </section>

        <section style={{ margin: 20 }}>
          <b>Results</b>
          {this.searchBase.requestPending && <div>Loading results...</div>}
          {this.searchBase.results.data.map(i => {
            return <div key={i._id}>{i.name}</div>;
          })}
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

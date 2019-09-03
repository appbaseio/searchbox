import React from 'react';
import ReactDOM from 'react-dom';

import Searchbase from '@appbaseio/searchbase';

class App extends React.Component {
  constructor(props) {
    super(props);
    const index = 'gitxplore-latest-app';
    const url = 'https://scalr.api.appbase.io';
    const credentials = 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38';

    this.searchBase = new Searchbase({
      index,
      url,
      dataField: [
        'name',
        'description',
        'name.raw',
        'fullname',
        'owner',
        'topics'
      ],
      credentials
    });

    // Pre-load results
    this.searchBase.triggerQuery();

    this.searchBase.subscribeToStateChanges(object => {
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

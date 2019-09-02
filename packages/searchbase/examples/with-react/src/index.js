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
      console.log('THINGS GOT CHANGED', object);
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.searchBase.value}
          onChange={this.searchBase.onChange}
        />
        <section style={{ margin: 20 }}>
          <b>Suggestions</b>
          {this.searchBase.suggestionsRequestPending && (
            <div>Loading suggestions...</div>
          )}
          {this.searchBase.suggestions.data.map(i => {
            return <div key={i._id}>{i.name}</div>;
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

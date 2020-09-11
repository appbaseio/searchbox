import React from 'react';
import ReactDOM from 'react-dom';

import { SearchBase } from '@appbaseio/searchbase';

// eslint-disable-next-line
class App extends React.Component {
  constructor(props) {
    super(props);

    const index = 'gitxplore-app';
    const url = 'https://@arc-cluster-appbase-demo-6pjy6z.searchbase.io';
    const credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';

    this.searchBase = new SearchBase({
      index,
      url,
      credentials
    });

    // Register search component => To render the suggestions
    this.searchBase.register('search-component', {
      dataField: [
        'name',
        'description',
        'name.raw',
        'fullname',
        'owner',
        'topics'
      ]
    });

    // Register result component with react dependency on search component => To render the results
    this.searchBase.register('result-component', {
      dataField: 'name',
      react: {
        and: 'search-component'
      }
    });

    // Get the search component controller by component id
    this.searchComponent = this.searchBase.getComponent('search-component');

    this.resultComponent = this.searchBase.getComponent('result-component');

    // Pre-load results
    this.resultComponent.triggerDefaultQuery();
  }

  componentDidMount() {
    this.searchStateChangeHandler = this.searchComponent.subscribeToStateChanges(
      change => {
        console.log('Track State Updates', change);
        this.forceUpdate();
        // or alternatively you can use setState and manage properties in state
      },
      ['requestPending', 'value', 'results']
    );
    this.resultStateChangeHandler = this.resultComponent.subscribeToStateChanges(
      change => {
        console.log('Track State Updates', change);
        this.forceUpdate();
        // or alternatively you can use setState and manage properties in state
      },
      ['requestPending', 'results']
    );
  }

  componentWillUnmount() {
    // Unsubscribe to state changes to prevent further updates
    this.searchComponent.unsubscribeToStateChanges(
      this.searchStateChangeHandler
    );
    this.resultComponent.unsubscribeToStateChanges(
      this.resultStateChangeHandler
    );
  }

  handleSelect = value => {
    // Set the value to fetch the suggestions
    this.searchComponent.setValue(value, {
      // Trigger query for dependent components to update results
      triggerDefaultQuery: false,
      triggerCustomQuery: true
    });
  };

  handleChange = e => {
    // Set the value to fetch the suggestions
    this.searchComponent.setValue(e.target.value);
  };

  render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.searchComponent.value}
          onChange={this.handleChange}
        />

        <section style={{ margin: 20 }}>
          <b>Suggestions</b>
          {this.searchComponent.requestPending ? (
            <div>Loading suggestions...</div>
          ) : (
            this.searchComponent.getSuggestions().map(i => {
              return (
                <div onClick={() => this.handleSelect(i.value)} key={i.label}>
                  {i.label}
                </div>
              );
            })
          )}
        </section>

        <section style={{ margin: 20 }}>
          <b>Results</b>
          {this.resultComponent.requestPending ? (
            <div>Loading results...</div>
          ) : (
            this.resultComponent.results.data.map(i => {
              return <div key={i._id}>{i.name}</div>;
            })
          )}
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

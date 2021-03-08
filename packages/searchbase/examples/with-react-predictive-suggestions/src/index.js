import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { SearchBase } from '@appbaseio/searchbase';

// eslint-disable-next-line
class App extends React.Component {
  constructor(props) {
    super(props);

    const index = 'gitxplore-app';
    const url =
      'https://appbase-demo-ansible-abxiydt-arc.searchbase.io';
    const credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';

    this.searchBase = new SearchBase({
      index,
      url,
      credentials
    });

    // Register search component => To render the suggestions
    this.searchBase.register('search-component', {
      // to enable predictive suggestions
      enablePredictiveSuggestions: true,
      dataField: [
        'name',
        'description',
        'name.raw',
        'fullname',
        'owner',
        'topics'
      ],
      clearFiltersOnQueryChange: true
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
    // const { showSuggestions } = this.state;
    const suggestionsList = (list, showSuggestions) => {
      if (!list.length || !showSuggestions) return null;
      return (
        <div className="suggestion-list">
          {list.map(i => {
            return (
              <div
                className="suggestion-item"
                onClick={() => this.handleSelect(i.value)}
                key={i.label}
                contentEditable='true'
                dangerouslySetInnerHTML={{ __html: i.label }}
              />
            );
          })}
        </div>
      );
    };
    return (
      <div className="App">
        <div className="autocomplete">
          <input
            type="text"
            value={this.searchComponent.value}
            onChange={this.handleChange}
            className="autocomplete-input"
            placeholder="Type to search"
          />
          <section className="suggestion">
            {this.searchComponent.requestPending ? (
              <div className="request-status">Loading suggestions...</div>
            ) : (
              suggestionsList(
                this.searchComponent.suggestions,
                !!this.searchComponent.value
              )
            )}
          </section>
        </div>
        <section>
          <div className="results">
            <p className="header">Results</p>
            {this.resultComponent.requestPending ? (
              <p>Loading results...</p>
            ) : (
              this.resultComponent.results.data.map(i => {
                return <div key={i._id}>{i.name}</div>;
              })
            )}
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import { SearchBase } from '@appbaseio/react-searchbox';

import './styles.css';
import Search from './components/Search';
import Filter from './components/Filter';
import Results from './components/Results';

const App = () => (
  <SearchBase
    index="good-books-ds"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
  >
    <div>
      <Search />
      <div className="row">
        <div className="col">
          <Filter />
        </div>

        <div className="col">
          <Results />
        </div>
      </div>
    </div>
  </SearchBase>
);

ReactDOM.render(<App />, document.getElementById('root'));

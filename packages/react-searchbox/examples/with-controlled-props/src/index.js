import React from 'react';
import ReactDOM from 'react-dom';
import { SearchBase } from '@appbaseio/react-searchbox';
import App from './App';

ReactDOM.render(
  <SearchBase
    index="good-books-ds"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
    appbaseConfig={{
      recordAnalytics: true,
      enableQueryRules: false,
      userId: 'jon@appbase.io',
      customEvents: {
        platform: 'ios',
        device: 'iphoneX'
      }
    }}
  >
    <App />
  </SearchBase>,
  document.getElementById('root')
);

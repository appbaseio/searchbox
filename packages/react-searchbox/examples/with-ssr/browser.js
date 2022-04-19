import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';

const __APP_INITIAL_STATE__ = window.__APP_INITIAL_STATE__;

delete window.__APP_INITIAL_STATE__;

hydrate(
  <App initialState={__APP_INITIAL_STATE__} />,
  document.getElementById('root')
);

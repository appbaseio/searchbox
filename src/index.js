import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import './styles.css';

import createHistory from 'history/createBrowserHistory'; // eslint-disable-line

const Loading = () => <div />;

const HomePage = Loadable({
  loader: () => import('./pages/web/Home'),
  loading: Loading
});

ReactDOM.render(
  <BrowserRouter basename="/searchbox">
    <Switch>
      <Route component={HomePage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

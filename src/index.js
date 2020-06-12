import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import createHistory from 'history/createBrowserHistory'; // eslint-disable-line

const Loading = () => <div />;

const HomePage = Loadable({
  loader: () => import('./pages/web/Home'),
  loading: Loading
});

const ToolsPage = Loadable({
  loader: () => import('./pages/web/Tools'),
  loading: Loading
});


const ToolsPageVue = Loadable({
  loader: () => import('./pages/vue/Tools'),
  loading: Loading
});

const HomePageVue = Loadable({
  loader: () => import('./pages/vue/Home'),
  loading: Loading
});

const ToolsPageVanilla = Loadable({
  loader: () => import('./pages/vanilla/Tools'),
  loading: Loading
});

const HomePageVanilla = Loadable({
  loader: () => import('./pages/vanilla/Home'),
  loading: Loading
});
// const DemoPageNative = Loadable({
// 	loader: () => import('./pages/native/Demo'),
// 	loading: Loading,
// });

// const history = createHistory({
// 	basename: '/reactivesearch',
// });

ReactDOM.render(
  <BrowserRouter basename="/searchbox">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/searchbox" component={HomePage} />
      <Route exact path="/tools" component={ToolsPage} />
      <Route exact path="/searchbox/tools" component={ToolsPage} />

      <Route exact path="/vue" component={HomePageVue} />
      <Route exact path="/searchbox/vue" component={HomePageVue} />
      <Route exact path="/vue/tools" component={ToolsPageVue} />
      <Route exact path="/searchbox/vue/tools" component={ToolsPageVue} />

      <Route exact path="/js/" component={HomePageVanilla} />
      <Route exact path="/searchbox/js" component={HomePageVanilla} />

      <Route exact path="/js/tools" component={ToolsPageVanilla} />
      <Route exact path="/searchbox/js/tools" component={ToolsPageVanilla} />
      <Route path="*" component={HomePage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

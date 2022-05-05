import { join } from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import template from './template';
import { getServerResults } from '@appbaseio/react-searchbox';
import StyleContext from 'isomorphic-style-loader/StyleContext';

const server = express();

server.use('/assets', express.static(join(__dirname, 'assets')));

server.get('/', async (req, res) => {
  // extracting query params
  const queryParams = { ...req.query };
  Object.keys(paramKey => {
    try {
      if (JSON.parse(queryParams[paramKey])) {
        queryParams[paramKey] = JSON.parse(queryParams[paramKey]);
      }
    } catch (error) {
      // not JSON parsable, do nothing
    }
  });

  // 👇  CSS LOADING using isomorphic-style-loader 👇

  const css = new Set(); // CSS for all rendered React components
  const insertCss = (...styles) =>
    styles.forEach(style => css.add(style._getCss()));
  // refer to: https://github.com/kriasoft/isomorphic-style-loader

  // 👇CALCULATING INITIAL STATE👇
  const AppRef = props => {
    return (
      <StyleContext.Provider value={{ insertCss }}>
        <App {...props} />
      </StyleContext.Provider>
    );
  };
  const initialState = await getServerResults()(AppRef, queryParams);

  // 👇 SERVER RENDERING THE PAGE TO SEND BACK AS RESPONSE 👇

  const plainHTML = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <App initialState={initialState} />
    </StyleContext.Provider>
  );

  // 👇 SEND RESPONSE TO CLIENT
  res.send(
    template({
      body: plainHTML,
      title: 'Server Rendered App',
      initialState: JSON.stringify(initialState),
      css: css
    })
  );
});

server.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on: http://localhost:8080');
});

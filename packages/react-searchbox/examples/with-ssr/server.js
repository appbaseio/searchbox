import { join } from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import template from './template';
import { getServerResults } from '@appbaseio/react-searchbox';
const server = express();

server.use('/assets', express.static(join(__dirname, 'assets')));

server.get('/', async (req, res) => {
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

  const initialState = await getServerResults()(App, queryParams.query);

  const plainHTML = renderToString(<App initialState={initialState} />);

  res.send(
    template({
      body: plainHTML,
      title: 'Server Rendered App',
      initialState: JSON.stringify(initialState)
    })
  );
});

server.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on: http://localhost:8080');
});

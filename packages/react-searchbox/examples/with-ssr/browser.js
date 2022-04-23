import React from 'react';
import { hydrate } from 'react-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import App from './App';

const __APP_INITIAL_STATE__ = window.__APP_INITIAL_STATE__;

delete window.__APP_INITIAL_STATE__;
const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};
hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <App initialState={__APP_INITIAL_STATE__} />
  </StyleContext.Provider>,
  document.getElementById('root')
);

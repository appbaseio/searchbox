import React from 'react';
import SearchBoxDefault from './components/SearchBox';
import SearchBase from './components/SearchBase';
import Component from './components/Component';
import { SearchContext } from './utils/helper';
import { Global, css } from '@emotion/core';

class SearchBoxWithStyle extends React.Component {
  state = { mount: false };

  componentDidMount() {
    this.setState({ mount: true });
  }

  render() {
    return (
      <div>
        <Global
          styles={css`
            * {
              margin: 0;
              font-family: inherit;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `}
        />
        {this.state.mount && (
          <SearchBoxDefault currentUrl={window.location.href} {...this.props} />
        )}
      </div>
    );
  }
}

export  {
  SearchContext,
  SearchBoxWithStyle as SearchBox,
  SearchBase,
  Component
};

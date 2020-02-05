import React from 'react';
import SearchBox from './components/SearchBox';
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
          <SearchBox currentUrl={window.location.href} {...this.props} />
        )}
      </div>
    );
  }
}

export default SearchBoxWithStyle;

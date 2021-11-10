import React from 'react';
import { SearchBase as Headless } from '@appbaseio/searchbase';
import { string, func, object } from 'prop-types';
import { appbaseConfig } from '../utils/types';
import { SearchContext } from '../utils/helper';

class SearchBase extends React.Component {
  constructor(props) {
    super(props);
    const headers = {
      ...props.headers,
      'x-search-client': 'Searchbox React Native'
    };
    this.searchbase = new Headless({
      index: props.index,
      url: props.url,
      credentials: props.credentials,
      mongodb: props.mongodb,
      headers,
      appbaseConfig: props.appbaseConfig,
      transformRequest: props.transformRequest,
      transformResponse: props.transformResponse
    });
  }

  /* eslint-disable class-methods-use-this */
  componentDidCatch(error, errorInfo) {
    console.error(
      "An error has occured. You're using SearchBox Version:",
      /* eslint-disable global-require */
      `${process.env.VERSION || require('../../package.json').version}.`,
      'If you think this is a problem with SearchBox, please try updating',
      "to the latest version. If you're already at the latest version, please open",
      'an issue at https://github.com/appbaseio/searchbox/issues',
      error,
      errorInfo
    );
  }

  render() {
    return (
      <SearchContext.Provider value={this.searchbase}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

SearchBase.propTypes = {
  // eslint-disable-next-line react/no-typos
  index: string.isRequired,
  // eslint-disable-next-line react/no-typos
  url: string.isRequired,
  // eslint-disable-next-line react/no-typos
  credentials: string.isRequired,
  headers: object,
  appbaseConfig,
  transformRequest: func,
  transformResponse: func,
  mongodb: object
};

export default SearchBase;

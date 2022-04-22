import React from 'react';
import { SearchBase as Headless, LIBRARY_ALIAS } from '@appbaseio/searchbase';
import {
  appbaseConfig,
  func,
  object,
  stringRequired,
  string
} from '../utils/types';
import { SearchContext } from '../utils/helper';

class SearchBase extends React.Component {
  constructor(props) {
    super(props);
    const headers = {
      ...props.headers,
      ...(!props.mongodb ? { 'x-search-client': 'Searchbox React' } : {})
    };
    this.searchbase = new Headless({
      index: props.index,
      url: props.url,
      credentials: props.credentials,
      mongodb: props.mongodb,
      headers,
      appbaseConfig: props.appbaseConfig,
      transformRequest: props.transformRequest,
      transformResponse: props.transformResponse,
      libAlias: LIBRARY_ALIAS.REACT_SEARCHBOX
    });
    this.searchbase.initialState = props.initialState;
    // server side rendered app to collect context
    if (
      typeof window === 'undefined' &&
      props.contextCollector &&
      !this.calledContextCollector
    ) {
      this.calledContextCollector = true;
      props.contextCollector({ ctx: this.searchbase });
    }
  }

  /* eslint-disable class-methods-use-this */
  componentDidCatch(error, errorInfo) {
    console.error(
      "An error has occured. You're using SearchBox Version:",
      /* eslint-disable global-require */
      `${process.env.VERSION || require('../package.json').version}.`,
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
  index: string,
  url: stringRequired,
  credentials: string,
  headers: object,
  appbaseConfig: appbaseConfig,
  transformRequest: func,
  transformResponse: func,
  mongodb: object,
  contextCollector: func,
  initialState: object
};

export default SearchBase;

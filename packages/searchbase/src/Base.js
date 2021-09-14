// @flow
import { errorMessages, btoa } from './utils';
import type { AppbaseSettings, BaseConfig } from './types';

/**
 * Base class is the abstract class for SearchBase and SearchComponent classes.
 */

class Base {
  // to enable the recording of analytics
  appbaseConfig: AppbaseSettings;

  // custom headers object
  headers: Object;

  // es index name
  index: string;

  // es url
  url: string;

  // auth credentials if any
  credentials: string;

  // mongodb
  mongodb: Object;

  /* ---- callbacks to create the side effects while querying ----- */

  transformRequest: (requestOptions: Object) => Promise<Object>;

  transformResponse: (response: any) => Promise<any>;

  // query search ID
  _queryId: string;

  constructor({
    index,
    url,
    credentials,
    mongodb,
    headers,
    appbaseConfig,
    transformRequest,
    transformResponse
  }: BaseConfig) {
    if (!url) {
      throw new Error(errorMessages.invalidURL);
    }
    this.index = index;
    this.url = url;
    this.credentials = credentials || '';

    this.mongodb = mongodb;

    if (appbaseConfig) {
      this.appbaseConfig = appbaseConfig;
    }

    if (transformRequest) {
      this.transformRequest = transformRequest;
    }
    if (transformResponse) {
      this.transformResponse = transformResponse;
    }

    // Initialize headers
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    if (headers) {
      this.setHeaders(headers);
    }
    if (this.credentials) {
      this.headers = {
        ...this.headers,
        Authorization: `Basic ${btoa(this.credentials)}`
      };
    }
  }

  // To to set the custom headers
  setHeaders(headers: Object): void {
    this.headers = {
      ...this.headers,
      ...headers
    };
  }

  // To set the query ID
  setQueryID(queryID: string) {
    this._queryId = queryID;
  }
}

export default Base;

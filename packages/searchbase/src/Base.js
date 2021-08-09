// @flow
import AppbaseAnalytics from '@appbaseio/analytics';
import { errorMessages, btoa } from './utils';
import type { AppbaseSettings, BaseConfig } from './types';

/**
 * Base class is the abstract class for SearchBase and SearchComponent classes.
 */

class Base {
  // to enable the recording of analytics
  appbaseConfig: AppbaseSettings;

  // auth credentials if any
  credentials: string;

  // custom headers object
  headers: Object;

  // es index name
  index: string;

  // es url
  url: string;

  /* ---- callbacks to create the side effects while querying ----- */

  transformRequest: (requestOptions: Object) => Promise<Object>;

  transformResponse: (response: any) => Promise<any>;

  /* ------ Private properties only for the internal use ----------- */
  // analytics instance
  _analyticsInstance: Object;

  // query search ID
  _queryId: string;

  constructor({
    index,
    url,
    credentials,
    headers,
    appbaseConfig,
    transformRequest,
    transformResponse
  }: BaseConfig) {
    if (!index) {
      throw new Error(errorMessages.invalidIndex);
    }
    if (!url) {
      throw new Error(errorMessages.invalidURL);
    }
    this.index = index;
    this.url = url;
    this.credentials = credentials || '';

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
      'Content-Type': 'application/json',
      'x-search-client': 'Searchbase Headless',
      ...(appbaseConfig && appbaseConfig.enableTelemetry === false
        ? {
            'X-Enable-Telemetry': false
          }
        : {})
    };
    if (this.credentials) {
      this.headers = {
        ...this.headers,
        Authorization: `Basic ${btoa(this.credentials)}`
      };
    }
    if (headers) {
      this.setHeaders(headers);
    }
    // Create analytics index
    this._analyticsInstance = AppbaseAnalytics.init({
      index,
      url,
      credentials
    });
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

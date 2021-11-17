// @flow
import AppbaseAnalytics from '@appbaseio/analytics';
import { btoa, validateSchema, backendAlias, componentsAlias } from './utils';
import type { AppbaseSettings, BaseConfig } from './types';
import SCHEMA from './schema/index';

/**
 * Base class is the abstract class for SearchBase and SearchComponent classes.
 */

class Base {
  // to enable the recording of analytics
  appbaseConfig: AppbaseSettings;

  // auth credentials if any
  credentials: string;

  // mongodb
  mongodb: Object;

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
    mongodb,
    appbaseConfig,
    transformRequest,
    transformResponse
  }: BaseConfig) {
    const backendName = backendAlias[mongodb ? 'MONGODB' : 'ELASTICSEARCH'];
    // eslint-disable-next-line
    const schema = SCHEMA[backendName];
    validateSchema(
      {
        index,
        url,
        credentials,
        headers,
        mongodb,
        appbaseConfig,
        transformRequest,
        transformResponse
      },
      schema,
      backendName,
      componentsAlias.SEARCHBASE
    );

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

    const { enableTelemetry } = appbaseConfig || {};
    // Initialize headers
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(!this.mongodb
        ? {
            'x-search-client': 'Searchbase Headless',
            ...(enableTelemetry === false
              ? {
                  'X-Enable-Telemetry': false
                }
              : {})
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
    if (!this.mongodb) {
      // Create analytics index
      this._analyticsInstance = AppbaseAnalytics.init({
        index,
        url,
        credentials
      });
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

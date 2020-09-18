import { AppbaseSettings, BaseConfig } from './types';

/**
 * Base class is the abstract class for SearchBase and SearchComponent classes.
 */

declare abstract class Base {
  constructor({
    index,
    url,
    credentials,
    headers,
    appbaseConfig,
    transformRequest,
    transformResponse
  }: BaseConfig);

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

  // methods
  // To to set the custom headers
  setHeaders(headers: Object): void;

  // To set the query ID
  setQueryID(queryID: string): void;
}

export default Base;

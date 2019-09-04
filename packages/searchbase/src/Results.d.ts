export interface Results {
  // An array of results obtained from the applied query.
  data: Array<Object>;

  // Raw response returned by ES query
  raw: Object;

  // Results parser
  parseResults: (results: Array<Object>) => Array<Object>;
}

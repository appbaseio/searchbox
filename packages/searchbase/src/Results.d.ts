export default interface Results {
  // An array of results obtained from the applied query.
  data: Array<Object>;

  // Raw response returned by ES query
  raw: Object;

  // Results parser
  parseResults: (results: Array<Object>) => Array<Object>;

  // Method to set data explicitly
  setData: (data: object) => void;

  setRaw: (rawResponse: object) => void;

  // getters
  readonly numberOfResults: number;
  readonly time: number;
  readonly promoted: number;
  readonly hidden: number;
  readonly promotedData: Array<any>;
  readonly rawData: Array<any>;
  readonly customData: Object;
}

export default interface Aggregations {
  // An array of results obtained from the applied query.
  data: Array<Object>;

  // useful when loading data of greater size
  afterKey: Object;

  // Raw response returned by ES query
  raw: Object;

  // Method to set afterKey explicitly
  setAfterKey: (key: Object) => void;

  // Method to set data explicitly
  setData: (aggField: string, data: object, append?: boolean) => void;

  setRaw: (rawResponse: object) => void;

  // getters
  readonly rawData: Array<any>;
}

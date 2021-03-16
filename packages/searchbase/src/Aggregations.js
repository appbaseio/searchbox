// @flow

import { parseCompAggToHits } from './utils';

class Aggregations {
  // An array of composite aggregations obtained from the applied aggs in options.
  data: Array<Object>;

  // useful when loading data of greater size
  afterKey: Object;

  // Raw aggregations returned by ES query
  raw: Object;

  constructor(data?: Array<Object>) {
    this.data = data || [];
  }

  // An object of raw response as-is from elasticsearch query
  get rawData() {
    return this.raw || {};
  }

  setRaw(rawResponse: Object) {
    // set response
    this.raw = rawResponse;
    if (rawResponse.after_key) this.setAfterKey(rawResponse.after_key);
  }

  setAfterKey(key: Object) {
    this.afterKey = key;
  }

  // Method to set data explicitly
  setData(aggField: string, data: Object, append: boolean = false) {
    // parse aggregation buckets
    const parsedData = parseCompAggToHits(aggField, data);
    // Merge data
    if (append) {
      this.data = [...this.data, ...parsedData];
    } else {
      this.data = parsedData;
    }
  }
}

export default Aggregations;

// @flow

import { parseCompAggToHits } from './utils';

class CompositeAggregationResults {
  // An array of composite aggregations obtained from the applied aggs in options.
  data: Array<Object>;

  // useful when loading data of greater size
  afterKey: Object;

  // Raw aggregations returned by ES query
  raw: Object;

  constructor(data?: Array<Object>) {
    this.data = data || [];
  }

  // An array of original hits obtained from the applied query.
  get rawData() {
    return (this.raw && this.raw.buckets) || [];
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
  setData(aggField: string, data: Object) {
    // parse aggregation buckets
    this.data = parseCompAggToHits(aggField, data);
  }
}

export default CompositeAggregationResults;

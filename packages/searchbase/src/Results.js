// @flow

import { parseHits } from './utils';

class Results {
  // An array of results obtained from the applied query.
  data: Array<Object>;

  // Raw response returned by ES query
  raw: Object;

  // Results parser
  parseResults: (results: Array<Object>) => Array<Object>;

  constructor(data: Array<Object>) {
    this.data = data || [];
  }

  // Total number of results found
  get numberOfResults() {
    // calculate from raw response
    if (this.raw && this.raw.hits) {
      return typeof this.raw.hits.total === 'object'
        ? this.raw.hits.total.value
        : this.raw.hits.total;
    }
    return 0;
  }

  // Total time taken by request (in ms)
  get time() {
    // calculate from raw response
    if (this.raw) {
      return this.raw.took;
    }
    return 0;
  }

  // no of hidden results found
  get hidden() {
    if (this.raw && this.raw.hits) {
      return this.raw.hits.hidden || 0;
    }
    return 0;
  }

  // no of promoted results found
  get promoted() {
    if (this.raw && this.raw.promoted) {
      return this.raw.promoted.length;
    }
    return 0;
  }

  // An array of promoted results obtained from the applied query.
  get promotedData() {
    if (this.raw && this.raw.promoted) {
      return this.raw.promoted || [];
    }
    return [];
  }

  // An array of original hits obtained from the applied query.
  get rawData() {
    return this.raw || {};
  }

  // object of custom data applied through queryRules
  // only works when `enableAppbase=true`
  get customData() {
    if (this.raw && this.raw.customData) {
      return this.raw.customData || {};
    }
    return {};
  }

  setRaw = (rawResponse: Object) => {
    // set response
    this.raw = rawResponse;
    if (rawResponse.hits && rawResponse.hits.hits) {
      this.setData(rawResponse.hits.hits);
    }
  };

  // Method to set data explicitly
  setData(data: Object) {
    // parse hits
    let filteredResults = parseHits(data);
    // filter results & remove duplicates if any
    if (this.promotedData.length) {
      const ids = this.promotedData.map(item => item._id).filter(Boolean);
      if (ids) {
        filteredResults = filteredResults.filter(
          item => !ids.includes(item._id)
        );
      }

      filteredResults = [
        ...this.promotedData.map(dataItem => ({
          ...dataItem,
          _promoted: true
        })),
        ...filteredResults
      ];
    }

    // set data
    if (this.parseResults) {
      this.data = this.parseResults(filteredResults);
    } else {
      this.data = filteredResults;
    }
  }
}

export default Results;

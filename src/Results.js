import { parseHits } from './utils';

// @flow

class Results {
  // An array of results obtained from the applied query.
  data: Array<Object>;

  // Raw response returned by ES query
  raw: Object;

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

  // An array of promoted results obtained from the applied query.
  get promotedData() {
    if (this.raw && this.raw.promoted) {
      return this.raw.promoted || [];
    }
    return [];
  }

  // An array of original hits obtained from the applied query.
  get rawData() {
    if (this.raw && this.raw.hits) {
      return (this.raw.hits && this.raw.hits.hits) || [];
    }
    return [];
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
    const filteredResults = parseHits(data);
    // filter results & remove duplicates if any
    if (this.promotedData.length) {
      const ids = this.promotedData.map(item => item._id).filter(Boolean);
      if (ids) {
        filteredResults = filteredResults.filter(item => !ids.includes(item._id));
      }

      filteredResults = [...this.promotedData, ...filteredResults];
    }
    // set data
    this.data = filteredResults;
  }
}

export default Results;

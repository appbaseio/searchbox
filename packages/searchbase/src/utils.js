// @flow

export const highlightResults = (result: Object): Object => {
  const data = { ...result };
  if (data.highlight) {
    Object.keys(data.highlight).forEach(highlightItem => {
      const highlightValue = data.highlight[highlightItem][0];
      data._source = { ...data._source, [highlightItem]: highlightValue };
    });
  }
  return data;
};

export const parseHits = (hits: Array<Object>): Array<Object> => {
  let results: Array<Object> = [];
  if (hits) {
    results = [...hits].map(item => {
      const streamProps = {};

      if (item._updated) {
        streamProps._updated = item._updated;
      } else if (item._deleted) {
        streamProps._deleted = item._deleted;
      }

      const data = highlightResults(item);
      const result = Object.keys(data)
        .filter(key => key !== '_source')
        .reduce(
          (obj: { [key: string]: any }, key: string) => {
            // eslint-disable-next-line
            obj[key] = data[key];
            return obj;
          },
          {
            ...data._source,
            ...streamProps
          }
        );
      return result;
    });
  }
  return results;
};

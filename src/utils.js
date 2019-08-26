// @flow

export const highlightResults = (result: Object): Object => {
  const data = { ...result };
  if (data.highlight) {
    Object.keys(data.highlight).forEach(highlightItem => {
      const highlightValue = data.highlight[highlightItem][0];
      data._source = Object.assign({}, data._source, { [highlightItem]: highlightValue });
    });
  }
  return data;
};

export const parseHits = (hits: Array<Object>): Array<Object> => {
  let results: Array<Object> = [];
  if (hits) {
    results = [...hits].map(item => {
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
            highlight: data.highlight || {},
            ...data._source
          }
        );
      return result;
    });
  }
  return results;
};

export const isReactNative = () =>
  typeof window !== 'undefined' &&
  window.navigator &&
  window.navigator.product &&
  window.navigator.product === 'ReactNative';

export const isEvent = (candidate: any) =>
  !!(candidate && candidate.stopPropagation && candidate.preventDefault);

export function getControlValue(event: any) {
  if (isEvent(event)) {
    return isReactNative() ? event.nativeEvent.text : event.target.value;
  }
  return event;
}

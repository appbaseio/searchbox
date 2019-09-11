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

// flattens a nested array
export const flatten = (arr: Array<any>) =>
  arr.reduce(
    (flat, toFlatten): Array<any> =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  );

// helper function to extract suggestions
export const extractSuggestion = (val: any) => {
  if (typeof val === 'object') {
    if (Array.isArray(val)) {
      return flatten(val);
    }
    return null;
  }
  return val;
};

export const getSuggestions = (
  fields: Array<string> = [],
  suggestions: Array<Object>,
  currentValue: string = ''
) => {
  let suggestionsList = [];
  let labelsList = [];

  const populateSuggestionsList = (val, parsedSource, source) => {
    // check if the suggestion includes the current value
    // and not already included in other suggestions
    const isWordMatch = currentValue
      .trim()
      .split(' ')
      .some(term =>
        String(val)
          .toLowerCase()
          .includes(term)
      );
    if (isWordMatch && !labelsList.includes(val)) {
      const defaultOption = {
        label: val,
        value: val,
        source
      };

      labelsList = [...labelsList, val];
      suggestionsList = [...suggestionsList, defaultOption];
    }
  };

  const parseField = (parsedSource, field, source = parsedSource) => {
    if (typeof parsedSource === 'object') {
      const fieldNodes = field.split('.');
      const label = parsedSource[fieldNodes[0]];
      if (label) {
        if (fieldNodes.length > 1) {
          // nested fields of the 'foo.bar.zoo' variety
          const children = field.substring(fieldNodes[0].length + 1);
          if (Array.isArray(label)) {
            label.forEach(arrayItem => {
              parseField(arrayItem, children, source);
            });
          } else {
            parseField(label, children, source);
          }
        } else {
          const val = extractSuggestion(label);
          if (val) {
            if (Array.isArray(val)) {
              val.forEach(suggestion =>
                populateSuggestionsList(suggestion, parsedSource, source)
              );
            } else {
              populateSuggestionsList(val, parsedSource, source);
            }
          }
        }
      }
    }
  };

  suggestions.forEach(item => {
    const { _score, _index, _type, _id } = item;

    const source = {
      ...item,
      _id,
      _index,
      _score,
      _type
    };
    fields.forEach(field => {
      parseField(source, field);
    });
  });

  return suggestionsList;
};

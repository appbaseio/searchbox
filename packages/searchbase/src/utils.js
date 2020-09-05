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


/**
 *
 * @param {array} fields DataFields passed on Search Components
 * @param {array} suggestions Raw Suggestions received from ES
 * @param {string} currentValue Search Term
 * @param {boolean} showDistinctSuggestions When set to true will only return 1 suggestion per document
 */
export const getSuggestions = (
  fields: Array<string> = [],
  suggestions: Array<Object>,
  currentValue: string = '',
  showDistinctSuggestions: boolean = true
) => {
  let suggestionsList = [];
  let labelsList = [];
  let skipWordMatch = false; //  Use to skip the word match logic, important for synonym

  const populateSuggestionsList = (val, parsedSource, source) => {
    // check if the suggestion includes the current value
    // and not already included in other suggestions
    const isWordMatch =
      skipWordMatch ||
      currentValue
        .trim()
        .split(' ')
        .some(term =>
          String(val)
            .toLowerCase()
            .includes(term)
        );
    // promoted results should always include in suggestions even there is no match
    if ((isWordMatch && !labelsList.includes(val)) || source._promoted) {
      const defaultOption = {
        label: val,
        value: val,
        source
      };
      const option = {
        ...defaultOption
      };
      labelsList = [...labelsList, val];
      suggestionsList = [...suggestionsList, option];

      if (showDistinctSuggestions) {
        return true;
      }
    }

    return false;
  };

  const parseField = (parsedSource, field = '', source = parsedSource) => {
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
              if (showDistinctSuggestions) {
                return val.some(suggestion =>
                  populateSuggestionsList(suggestion, parsedSource, source)
                );
              }
              val.forEach(suggestion =>
                populateSuggestionsList(suggestion, parsedSource, source)
              );
            }
            return populateSuggestionsList(val, parsedSource, source);
          }
        }
      }
    }
    return false;
  };

  const traverseSuggestions = () => {
    if (showDistinctSuggestions) {
      suggestions.forEach(item => {
        fields.some(field => parseField(item, field));
      });
    } else {
      suggestions.forEach(item => {
        fields.forEach(field => {
          parseField(item, field);
        });
      });
    }
  };

  traverseSuggestions();

  if (suggestionsList.length < suggestions.length && !skipWordMatch) {
    /*
			When we have synonym we set skipWordMatch to false as it may discard
			the suggestion if word doesnt match term.
			For eg: iphone, ios are synonyms and on searching iphone isWordMatch
			in  populateSuggestionList may discard ios source which decreases no.
			of items in suggestionsList
		*/
    skipWordMatch = true;
    traverseSuggestions();
  }

  return suggestionsList;
};

export function parseCompAggToHits(
  aggFieldName: string,
  buckets?: Array<Object> = []
): Array<Object> {
  return buckets.map(bucket => {
    // eslint-disable-next-line camelcase
    const { doc_count, key, [aggFieldName]: hitsData } = bucket;
    return {
      _doc_count: doc_count,
      _key: key[aggFieldName],
      ...hitsData.hits.hits[0]
    };
  });
}

import React from 'react';

const SuggestionItem = ({ currentValue, suggestion }) => {
  const { label, value, isPredictiveSuggestion } = suggestion;

  const stringToReplace = currentValue.split(' ').join('|');
  // label has highest precedence
  if (label) {
    if (typeof label === 'string') {
      try {
        return (
          <div
            className="trim"
            dangerouslySetInnerHTML={{
              __html: isPredictiveSuggestion
                ? label
                : label.replace(new RegExp(stringToReplace, 'ig'), matched => {
                    return `<mark class="highlight-class">${matched}</mark>`;
                  })
            }}
          />
        );
      } catch (e) {
        return label;
      }
    }
    return label;
  }
  return value;
};

export default SuggestionItem;

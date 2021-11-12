import React from 'react';

const SuggestionItem = ({ currentValue, suggestion }) => {
  const { label, value } = suggestion;

  const stringToReplace = suggestion._category
    ? 'in ' + suggestion._category
    : currentValue.split(' ').join('|');
  // label has highest precedence
  if (label) {
    if (typeof label === 'string') {
      try {
        return (
          <div
            className="trim"
            dangerouslySetInnerHTML={{
              __html: /<[a-z][\s\S]*>/i.test(suggestion.label) // contains any html from backend, eg: highlight
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

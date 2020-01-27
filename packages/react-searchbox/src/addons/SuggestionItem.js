import React from 'react';

const SuggestionItem = ({ currentValue, suggestion }) => {
  const { label, value } = suggestion;
  const stringToReplace = currentValue.split(' ').join('|');
  if (label) {
    // label has highest precedence
    return typeof label === 'string' ? (
      <div
        className="trim"
        dangerouslySetInnerHTML={{
          __html: label.replace(new RegExp(stringToReplace, 'ig'), matched => {
            return `<mark class="highlight-class">${matched}</mark>`;
          })
        }}
      />
    ) : (
      label
    );
  }
  return value;
};

export default SuggestionItem;

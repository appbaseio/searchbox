import React, { useState, useContext, useEffect, useRef } from 'react';
import { SearchBox, SearchContext } from '@appbaseio/react-native-searchbox';

export default function Search() {
  const [text, setText] = useState('');

  const searchbase = useContext(SearchContext);
  useEffect(() => {
    const searchComponent = searchbase.getComponent('search-component');
    if (searchComponent) {
      // To fetch results
      searchComponent.triggerCustomQuery();
    }
  }, [text]);

  return (
    <SearchBox
      id="search-component"
      autoSuggest={false}
      dataField={[
        {
          field: 'original_title',
          weight: 1
        },
        {
          field: 'original_title.search',
          weight: 3
        }
      ]}
      value={text}
      onChange={value => {
        setText(value);
      }}
    />
  );
}

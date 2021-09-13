import React, { useState, useContext, useEffect, useRef } from 'react';
import { SearchBox, SearchContext } from '@appbaseio/react-native-searchbox';

export default function Search() {
  const [text, setText] = useState('');
  const resetPaginationRefQuery = useRef();

  const searchbase = useContext(SearchContext);
  useEffect(() => {
    const searchComponent = searchbase.getComponent('search-component');
    if (searchComponent) {
      if (resetPaginationRefQuery.current) {
        resetPaginationRefQuery.current = false;
        // To fetch results
        searchComponent.triggerCustomQuery();
      } else {
        // To fetch suggestions
        searchComponent.triggerDefaultQuery();
      }
    }
  }, [searchbase, text]);

  return (
    <SearchBox
      id="search-component"
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
      onValueSelected={value => {
        resetPaginationRefQuery.current = true;
        const searchComponent = searchbase.getComponent('search-component');
        if (searchComponent) {
          setText(value);
        }
      }}
      value={text}
      onChange={value => {
        setText(value);
      }}
    />
  );
}

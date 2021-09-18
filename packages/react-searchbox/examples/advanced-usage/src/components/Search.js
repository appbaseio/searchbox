import React from 'react';
import { SearchBox } from '@appbaseio/react-searchbox';
export default () => {
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
      title="Search"
      placeholder="Search for Books"
      className="custom-class"
      size={5}
      style={{ paddingBottom: 10 }}
    />
  );
};

import React, { useState } from 'react';
import { SearchBox } from '@appbaseio/react-searchbox';
const Search = () => {
  const [queryVal, setQueryVal] = useState('');

  return (
    <React.Fragment>
      {' '}
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
        transformRequest={request => {
          const suggestedWordsList = [];
          let reqBody = JSON.parse(request.body);
          let getSearchComponentQueryIndex = 0;
          reqBody.query.forEach((item, index) => {
            if (item.id === 'search-component') {
              getSearchComponentQueryIndex = index;
            }
          });
          let queryWord = reqBody.query[getSearchComponentQueryIndex].value;
          let url =
            'https://api.datamuse.com/words?sp=' +
            reqBody.query[getSearchComponentQueryIndex].value +
            '&max=2';
          return (
            fetch(url)
              .then(res => res.json())
              .then(data => {
                if (data && data.length > 0) {
                  suggestedWordsList.push(data[0].word);
                  queryWord = suggestedWordsList[0];
                }
                if (suggestedWordsList.length) {
                  reqBody.query[getSearchComponentQueryIndex].value =
                    suggestedWordsList[0];
                }
                let newRequest = {
                  ...request,
                  body: JSON.stringify(reqBody)
                };

                return Promise.resolve(newRequest);
              })
              .catch(err => window.console.error(err))
              // eslint-disable-next-line
              .finally(() => {
                setQueryVal(
                  !queryWord || queryWord === 'undefined' ? '' : queryWord
                );
                if (!suggestedWordsList.length) {
                  return Promise.resolve(request);
                }
              })
          );
        }}
      />
      {queryVal && (
        <div className="row">
          Showing results for&nbsp; <b>{queryVal}</b>
        </div>
      )}
    </React.Fragment>
  );
};

export default Search;

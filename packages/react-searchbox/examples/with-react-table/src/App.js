/* eslint-disable no-nested-ternary */
import React from 'react';

import {
  SearchBox,
  SearchBase,
  SearchComponent
} from '@appbaseio/react-searchbox';
import ReactPaginate from 'react-paginate';
import { useTable, useSortBy } from 'react-table';

import './styles.css';

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const DataTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'authors', accessor: 'authors' },
      { Header: 'Average rating', accessor: 'average_rating' },
      { Header: 'Language', accessor: 'language_code' },
      { Header: 'ISBN', accessor: 'isbn' },
      { Header: 'Ratings', accessor: 'ratings_count' }
    ],
    []
  );
  return <Table columns={columns} data={data} />;
};

export default () => (
  <SearchBase
    index="good-books-ds"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
    appbaseConfig={{
      recordAnalytics: true,
      enableQueryRules: true,
      userId: 'jon@appbase.io',
      customEvents: {
        platform: 'ios',
        device: 'iphoneX'
      }
    }}
  >
    <div>
      <h2>
        React Searchbox Demo{' '}
        <span style={{ fontSize: '1rem' }}>
          <a
            href="https://docs.appbase.io/docs/reactivesearch/react-searchbox/apireference/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API reference
          </a>
        </span>
      </h2>

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
        autosuggest={true}
        defaultSuggestions={[
          {
            label: 'Songwriting',
            value: 'Songwriting'
          },
          {
            label: 'Musicians',
            value: 'Musicians'
          }
        ]}
        size={10}
        debounce={100}
        queryFormat="or"
        fuzziness="AUTO"
        showClear
        showVoiceSearch
        URLParams
        className="custom-class"
        enablePopularSuggestions
        iconPosition="left"
        style={{ paddingBottom: 10 }}
      />
      <div className="row">
        <div className="col">
          <SearchComponent
            id="result-component"
            highlight
            dataField="original_title"
            size={10}
            from={0}
            react={{
              and: ['search-component', 'author-filter']
            }}
          >
            {({ results, loading, size, from, setFrom }) => {
              return (
                <div className="result-list-container">
                  {loading ? <div>Loading Results ...</div> : null}
                  <div>
                    {!loading && !results.data.length ? (
                      <div>No results found</div>
                    ) : (
                      <p class="result-stat">
                        {results.numberOfResults} results found in{' '}
                        {results.time}ms
                      </p>
                    )}
                    {results.data.length ? (
                      <DataTable data={results.data} />
                    ) : null}
                  </div>
                  {results.numberOfResults > size ? (
                    <ReactPaginate
                      pageCount={Math.floor(results.numberOfResults / size)}
                      onPageChange={({ selected }) => setFrom(selected * size)}
                      forcePage={
                        from !== undefined ? Math.ceil(from / size) : 0
                      }
                      disabledClassName="disabled"
                      initialPage={1}
                      previousLabel="previous"
                      nextLabel="next"
                      breakLabel="..."
                      breakClassName="break-me"
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      subContainerClassName="pages pagination"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      activeClassName="active"
                    />
                  ) : null}
                </div>
              );
            }}
          </SearchComponent>
        </div>
      </div>
    </div>
  </SearchBase>
);

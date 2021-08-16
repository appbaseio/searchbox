<h2 align="center">
  <img src="https://i.imgur.com/iiR9wAs.png" alt="searchbase" title="searchbase" width="200" />
  <br />
  React Native Searchbox
  <br />
</h2>
<p align="center" style="font-size: 1.2rem">A lightweight and performance oriented react native library to build search layouts with Elasticsearch.</p>
<hr />

## TOC

1. **[Intro](#1-intro)**
2. **[Features](#2-features)**
3. **[Usage](#3-usage)**
4. **[Installation](#4-installation)**
5. **[Docs Manual](#5-docs-manual)**
6. **[Contributing](#6-contributing)**
7. **[Other Projects You Might Like](#7-other-projects-you-might-like)**

<br />

## 1. Intro

`React Native SearchBox` offers lightweight and performance-focused components to query and display results from your ElasticSearch app (aka index) using declarative props. It is an alternative to using the [DataSearch component](https://docs.appbase.io/docs/reactivesearch/v3/search/datasearch/) from ReactiveSearch.

[⬆ Back to Top](#toc)

## 2. Features

- Design search experiences with best practices
- Searchbox UI component with autosuggestions, recent searches and auto-fill functionalities.
- Customize your components at will
- Follow React principles

[⬆ Back to Top](#toc)

## 3. Usage

### Basic Usage

```js
    <SearchBase
      // Elasticsearch index
      index="good-books-ds"
      // Appbase credentials
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      // Appbase URL
      url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
      // Configure the appbase analytics
      appbaseConfig={{
        recordAnalytics: true,
        enableQueryRules: true,
        userId: 'jon3@appbase.io',
        customEvents: {
          platform: 'ios',
          device: 'iphoneX'
        }
      }}
    >
      <SearchBox
        // A unique identifier for each component
        id="search-component"
        // Data fields to search on
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
      />
   </SearchBase>
```

> Note: Please note that the `SearchBox` component doesn't work with React Native Web because it uses the `Modal` component to display the suggestions that needs some extra plugins.

[⬆ Back to Top](#toc)

## 4. Installation

```bash
npm install @appbaseio/react-native-searchbox
# or
yarn add @appbaseio/react-native-searchbox
```

[⬆ Back to Top](#toc)

## 5. Docs Manual

The official docs for the library are over [here](https://docs.appbase.io/docs/reactivesearch/react-native-searchbox/quickstart/).

[⬆ Back to Top](#toc)

## 6. Contributing

Please check the [contribution guide](https://github.com/appbaseio/searchbox/blob/master/.github/CONTRIBUTING.md)

[⬆ Back to Top](#toc)

## 7. Other Projects You Might Like

- [**reactivesearch**](https://github.com/appbaseio/reactivesearch) React, React Native, and Vue UI components for building data-driven apps with Elasticsearch.

- [**reactivesarch-api**](https://github.com/appbaseio/reactivesearch-api) ReactiveSearch API is a declarative, open-source API for querying Elasticsearch. It also acts as a reverse proxy and API gateway to an Elasticsearch cluster. ReactiveSearch API is best suited for site search, app search and e-commerce search use-cases.


* [**dejavu**](https://github.com/appbaseio/dejavu) allows viewing raw data within an appbase.io (or Elasticsearch) app. **Soon to be released feature:** An ability to import custom data from CSV and JSON files, along with a guided walkthrough on applying data mappings.

* [**mirage**](https://github.com/appbaseio/mirage) ReactiveSearch components can be extended using custom Elasticsearch queries. For those new to Elasticsearch, Mirage provides an intuitive GUI for composing queries.

* [**ReactiveMaps**](https://github.com/appbaseio/reactivesearch/tree/next/packages/maps) is a similar project to Reactive Search that allows building realtime maps easily.

* [**appbase-js**](https://github.com/appbaseio/appbase-js) While building search UIs is dandy with Reactive Search, you might also need to add some input forms. **appbase-js** comes in handy there.

[⬆ Back to Top](#toc)

<a href="https://appbase.io/support/"><img src="https://i.imgur.com/UL6B0uE.png" width="100%" /></a>

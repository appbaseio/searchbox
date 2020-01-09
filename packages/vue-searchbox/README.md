<h2 align="center">
  <img src="https://i.imgur.com/iiR9wAs.png" alt="searchbase" title="searchbase" width="200" />
  <br />
  Vue Searchbox
  <br />
</h2>
<p align="center" style="font-size: 1.2rem">A lightweight vue search library with some common utilities.</p>
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

`Vue SearchBox` offers a lightweight (~22KB: Minified + Gzipped) and performance focused searchbox UI component to query and display results from your ElasticSearch app (aka index) using declarative props. It is an alternative to using the [DataSearch component](https://docs.appbase.io/docs/reactivesearch/vue/search/DataSearch/) from Vue ReactiveSearch.

[⬆ Back to Top](#toc)

## 2. Features

- Design search experiences with best practices
- Customize your components at will
- Follow Vue principles

[⬆ Back to Top](#toc)

## 3. Usage

### Basic Usage

```html
<vue-searchBox
  app="good-books-ds"
  credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
  :dataField="['original_title', 'original_title.search']"
/>
```

### Usage With All Props

```html
<vue-searchBox
  app="good-books-ds"
  credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
  :dataField="[
		{ field: 'original_title', weight: 1 },
		{ field: 'original_title.search', weight: 3 },
	]"
  title="Search"
  defaultValue="Songwriting"
  placeholder="Search for books"
  :autosuggest="true"
  :defaultSuggestions="[
		{ label: 'Songwriting', value: 'Songwriting' },
		{ label: 'Musicians', value: 'Musicians' },
	]"
  :highlight="true"
  highlightField="group_city"
  queryFormat="or"
  fuzziness="AUTO"
  :showClear="true"
  :showVoiceSearch="true"
/>
```

[⬆ Back to Top](#toc)

## 4. Installation

```bash
npm install vue-searchbox
# or
yarn add vue-searchbox
```

[⬆ Back to Top](#toc)

## 5. Docs Manual

The official docs for the library are at [docs/vue-searchbox](https://docs.appbase.io/docs/reactivesearch/vue-searchbox/quickstart/)

[⬆ Back to Top](#toc)

## 6. Contributing

Please check the [contribution guide](./CONTRIBUTING.md)

[⬆ Back to Top](#toc)

## 7. Other Projects You Might Like

- [**reactivesearch**](https://github.com/appbaseio/reactivesearch) React, React Native and Vue UI components for building data-driven apps with Elasticsearch.

- [**arc**](https://github.com/appbaseio/arc) API Gateway for ElasticSearch (Out of the box Security, Rate Limit Features, Record Analytics and Request Logs).

- **searchbox** Similar to `vue-searchbox` we offer a lightweight and performance focused searchbox UI libraries for Vanilla and React.

  - [**Vanilla**](https://github.com/appbaseio/searchbox) - (~16kB Minified + Gzipped)
  - [**React**](https://github.com/appbaseio/react-searchbox) - (~30kB Minified + Gzipped)

* [**dejavu**](https://github.com/appbaseio/dejavu) allows viewing raw data within an appbase.io (or Elasticsearch) app. **Soon to be released feature:** An ability to import custom data from CSV and JSON files, along with a guided walkthrough on applying data mappings.

* [**mirage**](https://github.com/appbaseio/mirage) ReactiveSearch components can be extended using custom Elasticsearch queries. For those new to Elasticsearch, Mirage provides an intuitive GUI for composing queries.

* [**ReactiveMaps**](https://github.com/appbaseio/reactivesearch/tree/next/packages/maps) is a similar project to Reactive Search that allows building realtime maps easily.

* [**appbase-js**](https://github.com/appbaseio/appbase-js) While building search UIs is dandy with Reactive Search, you might also need to add some input forms. **appbase-js** comes in handy there.

[⬆ Back to Top](#toc)

<a href="https://appbase.io/support/"><img src="https://i.imgur.com/UL6B0uE.png" width="100%" /></a>

<h2 align="center">
  <img src="https://i.imgur.com/iiR9wAs.png" alt="searchbase" title="searchbase" width="200" />
  <br />
  Searchbase
  <br />
</h2>

<p align="center" style="font-size: 1.2rem">A lightweight & platform agnostic search solution with some common utilities.</p>
<hr />

## TOC

1. **[Searchbase: Intro](#1-searchbase-intro)**
2. **[Features](#2-features)**
3. **[Live Examples](#3-live-demos)**
4. **[Installation](#4-installation)**
5. **[Docs Manual](#5-docs-manual)**
6. **[Contributing](#6-contributing)**
7. **[Other Projects You Might Like](#7-other-projects-you-might-like)**

<br />

## 1. Searchbase: Intro

Searchbase is a UI independent library which allows you to build search experience expeditiously. The `Searchbase` provides you some basic utilities which can be easily integrated with the UI to display search suggestions or results.

`Searchbase` does the following things for you:

1. Generates the Elasticsearch query for suggestions and search results.
2. Triggers the query and populate the parsed results/suggestions.
3. Provides the common utilities for example, voice search feature.
4. Manages the search state

<br />

[⬆ Back to Top](#toc)

## 2. Features

### Design

- The observer / subscribe design pattern allows creating complex UIs where any number of subscribers can be bind reactively to the search updates.
- You can easily customize the update strategy by subscribing the particular properties changes. It saves you un-necessary re-renders and enhances the search performance.

### Ease of Use

- One step installation with [npm i @appbaseio/searchbase](docs/searchbase/),
- A UMD build that works directly in the browser.

[⬆ Back to Top](#toc)

<br />

## 3. Live Demos

A set of live demos inspired by real world apps, built with ReactiveSearch.

- [Vanilla JS](packages/searchbase/examples/with-vanilla)
- [React](packages/searchbase/examples/with-react)

[⬆ Back to Top](#toc)

<br />

## 4. Installation

Installing Searchbase is just one command.

```javascript
npm install @appbaseio/searchbase
```

<br />

[⬆ Back to Top](#toc)

## 5. Docs Manual

The official docs for the Web library are at [docs/searchbase](https://docs.appbase.io/api/searchbase/quickstart/).

<br />

[⬆ Back to Top](#toc)

## 6. Contributing

Please check the [contribution guide](.github/CONTRIBUTING.md).

<br />

[⬆ Back to Top](#toc)

## 7. Other Projects You Might Like

- [**dejavu**](https://github.com/appbaseio/dejavu) allows viewing raw data within an appbase.io (or Elasticsearch) app. **Soon to be released feature:** An ability to import custom data from CSV and JSON files, along with a guided walkthrough on applying data mappings.

- [**mirage**](https://github.com/appbaseio/mirage) ReactiveSearch components can be extended using custom Elasticsearch queries. For those new to Elasticsearch, Mirage provides an intuitive GUI for composing queries.

- [**ReactiveSearch Dashboard**](https://dashboard.appbase.io/reactivesearch/) All your Reactive Search related apps (created via interactive tutorial, shared by others, etc.) can be accessed from here.
- [**ReactiveMaps**](https://github.com/appbaseio/reactivemaps) is a similar project to Reactive Search that allows building realtime maps easily.

- [**appbase-js**](https://github.com/appbaseio/appbase-js) While building search UIs is dandy with Reactive Search, you might also need to add some input forms. **appbase-js** comes in handy there.

[⬆ Back to Top](#toc)

<a href="https://appbase.io/support/"><img src="https://i.imgur.com/UL6B0uE.png" width="100%" /></a>

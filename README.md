## Searchbox

Searchbox is a lightweight and performance focused search UI component library to query and display results from your ElasticSearch index using declarative props. It's available for React, Vue and Vanilla JS.

<p align="center">
  <a href="https://github.com/appbaseio/searchbase/tree/master/packages/searchbox" style="padding: 10px; display: inline;"><img  width="30%" src="https://docs.appbase.io/images/Searchbox_JS@1x.png" alt="searchbox" title="searchbox" /></a>
  <a href="https://github.com/appbaseio/searchbase/tree/master/packages/react-searchbox" style="padding: 10px; display: inline;"><img   width="30%" src="https://docs.appbase.io/images/Searchbox_React@1x.png" alt="react_searchbox" title="react searchbox" /></a>
  <a href="https://github.com/appbaseio/searchbase/tree/master/packages/vue-searchbox" style="padding: 10px; display: inline;"><img   width="30%" src="https://docs.appbase.io/images/Searchbox_Vue@1x.png" alt="vue searchbox" title="vue searchbox" /></a>
</p>

---

### Getting Started

| Library                                                                                    | Install                                            | Demo                                                                                                                                      | Docs                                                                                   |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [React Searchbox](https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/) | `npm i @appbaseio/react-searchbox`                 | [Basic](https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/react-searchbox/examples/basic)                         | [Quick Start](https://docs.appbase.io/docs/reactivesearch/react-searchbox/quickstart/) |
| [Searchbox](https://docs.appbase.io/docs/reactivesearch/searchbox/Quickstart/)             | `npm i @appbaseio/searchbox @appbaseio/searchbase` | [Searchbar with Style](https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/searchbox/examples/searchbar-with-style) | [Quick Start](https://docs.appbase.io/docs/reactivesearch/searchbox/Quickstart/)       |
| [Vue Searchbox](https://docs.appbase.io/docs/reactivesearch/vue-searchbox/quickstart/)     | `npm i @appbaseio/vue-searchbox`                   | [Basic](https://codesandbox.io/s/github/appbaseio/searchbase/tree/master/packages/vue-searchbox/examples/basic)                           | [Quick Start](https://docs.appbase.io/docs/reactivesearch/vue-searchbox/quickstart/)   |

### Features

We have baked some amazing features in libraries which helps getting insights from searches and also help beautify and enhance search experiences.

| Feature                                                                                                                        | Description                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Autosuggestions](https://opensource.appbase.io/playground/?path=/story/search-components-datasearch--basic)                   | Built-in autosuggest functionality with keyboard accessibility.                                                                                                             |
| [Search highlighting](https://opensource.appbase.io/playground/?path=/story/search-components-datasearch--with-highlight)      | Built-in highlighting on search results.                                                                                                                                    |
| [Fuzzy Search](https://opensource.appbase.io/playground/?path=/story/search-components-datasearch--with-fuzziness-as-a-number) | Useful for showing the correct results for an incorrect search parameter by taking the fuzziness into account.                                                              |
| Query String Support                                                                                                           | URL query string param based on the search query text value.This is useful for sharing URLs with the component state.                                                       |
| [Search Operators](https://opensource.appbase.io/playground/?path=/story/search-components-datasearch--with-searchoperators)   | Use special characters in the search query to enable an advanced search behavior.                                                                                           |
| [Voice Search](https://opensource.appbase.io/playground/?path=/story/search-components-datasearch--with-showvoicesearch)       | Enable voice input for searching.                                                                                                                                           |
| [Search/Click Analytics](https://docs.appbase.io/docs/analytics/Overview/)                                                     | Search analytics allows you to keep track of the users' search activities which helps you to improve your search experience based on the analytics extracted by Appbase.io. |
| [Feature Results](https://docs.appbase.io/docs/search/Rules/)                                                                  | Promote and hide your results for search queries.                                                                                                                           |
| Customization                                                                                                                  | Support custom UI components in order to maintain a consistentency with existing design system.                                                                             |

### Searchbox v/s ReactiveSearch

We recommend using React Searchbox over DataSearch or CategorySearch components of ReactiveSearch when you only need to integrate a searchbox UI component into your app. If you are planning to use other UI filters or result components, it is ideal to use the ReactiveSearch library instead of this standalone component.

**Key Differences**

| Property                         | Searchbox                               | Reactivesearch                                                                               |
| -------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------- |
| Component Support                | Comes with a single `Search` component  | Comes with more than 10+ pre-built components for building complex search experiences.       |
| Bundle Size (minified + gzipped) | 17kb - 32kb                             | > 100KB - Since it supports tree-shaking, the net size depends on the components you import. |
| Supported for                    | `React`, `Vue` `Vanilla JS` & `Android` | `React`, `Vue` & `React Native`                                                              |

### Contributing

Please check the [contribution guide](.github/CONTRIBUTING.md).

### Other Projects You Might Like

- [**ReactiveSearch**](https://github.com/appbaseio/reactivesearch/) React, React Native and Vue UI components for building data-driven apps with Elasticsearch.

- [**arc**](https://github.com/appbaseio/arc) API Gateway for ElasticSearch (Out of the box Security, Rate Limit Features, Record Analytics and Request Logs).

- [**dejavu**](https://github.com/appbaseio/dejavu) allows viewing raw data within an appbase.io (or Elasticsearch) app. **Soon to be released feature:** An ability to import custom data from CSV and JSON files, along with a guided walkthrough on applying data mappings.

- [**mirage**](https://github.com/appbaseio/mirage) ReactiveSearch components can be extended using custom Elasticsearch queries. For those new to Elasticsearch, Mirage provides an intuitive GUI for composing queries.

* [**appbase-js**](https://github.com/appbaseio/appbase-js) While building search UIs is dandy with Reactive Search, you might also need to add some input forms. **appbase-js** comes in handy there.

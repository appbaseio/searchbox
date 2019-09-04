# Searchbase

## Installation

Run the below command to install `Searchbase` in your project.

```bash
yarn add @appbaseio/searchbase
```

To use the umd build, add the following script in your `index.html` file.

```js
<script defer src="https://cdn.jsdelivr.net/npm/@appbaseio/searchbase@1.0.0-alpha/dist/@appbaseio/searchbase.umd.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/@appbaseio/searchbase@1.0.0-alpha/dist/@appbaseio/searchbase.umd.min.js.map"></script>

```

## Basic Usage

### Without suggestions

```js
import SearchBase from '@appbaseio/searchbase';

// Instantiate the search base object
const searchbase = new SearchBase({
  index: 'gitxplore-latest-app',
  credentials: 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38',
  url: 'https://scalr.api.appbase.io',
  dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics']
});

const searchElement = document.getElementById('search');

// Bind the searchbase value to input value
searchElement.value = searchbase.value;
// Update the search input value in
searchElement.addEventListener('input', e => {
  searchbase.setValue(e.target.value);
});
// Build DOM when search results update
searchbase.onResults = results => {
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = '';
  results.data.forEach(element => {
    var node = document.createElement('LI'); // Create a <li> node
    var resultNode = document.createTextNode(element.name); // Create a text node
    node.appendChild(resultNode); // Append the text to <li>
    resultsElement.appendChild(node);
  });
};
```

Add this in your HTML

```html
<input placeholder="type to search" id="search" />

<div id="results"></div>
```

### With suggestions

```js
import SearchBase from '@appbaseio/searchbase';

// Instantiate the search base object
const searchbase = new SearchBase({
  index: 'gitxplore-latest-app',
  credentials: 'LsxvulCKp:a500b460-73ff-4882-8d34-9df8064b3b38',
  url: 'https://scalr.api.appbase.io',
  dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics']
});

const searchElement = document.getElementById('search');

// Bind the searchbase value to input value
searchElement.value = searchbase.value;
// Update the search input value in
searchElement.addEventListener('input', e => {
  searchbase.setValue(e.target.value, {
    triggerSuggestionsQuery: true
  });
});

// Build DOM when search suggestions update
searchbase.onSuggestions = suggestions => {
  const suggestionsElement = document.getElementById('suggestions');
  suggestionsElement.innerHTML = '';
  suggestions.data.forEach(element => {
    var node = document.createElement('LI'); // Create a <li> node
    var suggestionNode = document.createElement('button');
    var t = document.createTextNode(element.label); // Create a text node

    suggestionNode.appendChild(t);
    suggestionNode.onclick = function() {
      searchbase.setValue(element.value);
    };

    node.appendChild(suggestionNode); // Append the text to <li>
    suggestionsElement.appendChild(node);
  });
};

// Build DOM when search results update
searchbase.onResults = results => {
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = '';
  results.data.forEach((element, index) => {
    var node = document.createElement('LI'); // Create a <li> node
    var resultNode = document.createTextNode(element.name); // Create a text node
    node.appendChild(resultNode); // Append the text to <li>
    resultsElement.appendChild(node);
  });
};
// Update input value when a suggestion is selected
searchbase.onValueChange = value => {
  const searchElement = document.getElementById('search');
  if (searchElement) {
    searchElement.value = value;
  }
};
```

Add this in your HTML

```html
<input placeholder="type to search" id="search" />
<div id="suggestions"></div>
<div id="results"></div>
```

## API

### Properties

```ts
index: string;
```

Elasticsearch index name

```ts
url: string;
```

Elasticsearch URL

```ts
credentials: string;
```

Auth credentials if any

```ts
analytics: boolean;
```

To enable the recording of analytics

```ts
value: string;
```

Value of the search input which will be used to build the search query

```ts
headers: Object;
```

Request headers

```ts
suggestions: Results;
```

It is an object which contains the following details of `suggestions` query response.

#### data: Array<Suggestion>

`data` property contains the parsed suggestions results, a `Suggestion` object has the following format:

```js
{
  label: string,
  value: string,
  source?: any
};
```

#### raw: Object

Response returned by ES query in the raw form.

#### numberOfResults: number

Total number of results found

#### time: number

Total time taken by request (in ms)

#### promotedData: Array<Object>

An array of promoted results obtained from the applied query.

#### rawData: Array<Object>

An array of original hits obtained from the applied query.

```ts
results: Results;
```

It is an object which contains the following details of `results` query response.

#### data: Array<Suggestion>

`data` property contains the parsed suggestions results, a `Suggestion` object has the following format:

```js
{
  label: string,
  value: string,
  source?: any
};
```

#### raw: Object

Response returned by ES query in the raw form.

#### numberOfResults: number

Total number of results found

#### time: number

Total time taken by request (in ms)

#### promotedData: Array<Object>

An array of promoted results obtained from the applied query.

#### rawData: Array<Object>

An array of original hits obtained from the applied query.

```ts
suggestionsError: any;
```

Network request error while executing suggestions query.

```ts
error: any;
```

Network request error while executing results query.

```ts
requestStatus: 'INACTIVE' | 'PENDING' | 'ERROR';
```

Request status of the results query

```ts
suggestionsRequestStatus: 'INACTIVE' | 'PENDING' | 'ERROR';
```

Request status of the suggestions query

```ts
dataField: string | Array<string | DataField>;
```

database field(s). DataSearch accepts an Array in addition to String, useful for applying search across multiple fields.

You can also define the field weights by defining the `dataField` as an array of objects in the following format.

```js
{
  field: string,
  weight: number
}
```

```ts
nestedField: string;
```

```ts
queryFormat: QueryFormat;
```

```ts
searchOperators: boolean;
```

```ts
size: number;
```

Number of results to fetch per request.

```ts
from: number;
```

To define from which page to start the results, important to implement pagination.

```ts
fuzziness: string | number;
```

Sets a maximum edit distance on the search parameters, can be 0, 1, 2 or “AUTO”. Useful for showing the correct results for an incorrect search parameter by taking the fuzziness into account. For example, with a substitution of one character, fox can become box. Read more about it in the elastic search [docs](https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html).

```ts
includeFields: Array<string>;
```

fields to be included in search results.

```ts
excludeFields: Array<string>;
```

fields to be excluded in search results.

```ts
sortBy: string;
```

sort the results by either `asc` or `desc` order. It is an alternative to `sortOptions`, both can’t be used together.

```ts
sortByField: string;
```

`dataField` on which to apply the sort

```ts
sortOptions: Array<SortOption>;
```

an alternative to the sortBy prop. Each array element is an object that takes three keys:

label - label to be displayed in the UI.
dataField - data field to use for applying the sorting criteria on.
sortBy - specified as either asc or desc.

### Methods

Methods can be used to do the following things:

1. Modify the search state.
2. Trigger the search query.
3. Transform the query, results or response etc.
4. Subscribe to the state changes

### Note:

Most of the methods accepts `Options` as the second parameter which has the following shape:

```ts
{
triggerQuery?: boolean, // defaults to `true`
triggerSuggestionsQuery?: boolean, // defaults to `false`
stateChanges?: boolean // defaults to `true`
};
```

##### triggerQuery

`true` means executes the `results` query after making the changes

##### triggerSuggestionsQuery

`true` means executes the `suggestions` query after making the changes

##### stateChanges

`true` means invoke the subscribed functions to `subscribeToStateChanges` method i.e trigger the re-render after making changes.

We can divide methods into following categories:

### Setters

```ts
setValue(value: string, options?: Options): void
```

Method to set the value

```ts
setHeaders(headers: Object, options?: Options): void
```

Method to set the custom headers

```ts
setSize(size: number, options?: Options): void
```

Method to set the size option

```ts
setFrom(from: number, options?: Options): void
```

Method to set the from option

```ts
setFuzziness(
fuzziness: number | string,
options?: Options
): void
```

Method to set the fuzziness option

```ts
setIncludeFields(
includeFields: Array<string>,
options?: Options
): void
```

Method to set the includeFields option

```ts
setExcludeFields(
excludeFields: Array<string>,
options?: Options
): void
```

Method to set the excludeFields option

```ts
setSortBy(sortBy: string, options?: Options): void
```

Method to set the sortBy option

```ts
setSortByField(
sortByField: string,
options?: Options
): void
```

Method to set the sortByField option

```ts
setNestedField(
nestedField: string,
options?: Options
): void
```

Method to set the nestedField option

```ts
setDataField(
dataField: string | Array<string | DataField>,
options?: Options
): void
```

Method to set the dataField option

```ts
setResults(results: Array<Object>, options?: Option = defaultOption): void
```

Method to set the custom results

```ts
setSuggestions(
suggestions: Array<Suggestion>,
options?: Option = defaultOption
): void
```

Method to set the custom suggestions

### Events

Events can be used to listen for the updates and perform some action based on the changes, for example:

```js
const searchbase = new Searchbase({
  ...config
});

searchbase.onValueChange = (next, prev) => {
  console.log('Value changed from' + next + 'to' + prev);
};
```

```ts
onValueChange: (next: string, prev: string) => void;
```

Gets called when value changes

```ts
onResults: (next: string, prev: string) => void;
```

Gets called when results change

```ts
onSuggestions: (next: string, prev: string) => void;
```

Gets called when suggestions change

```ts
onError: (error: any) => void;
```

Gets called when there is an error while fetching results

```ts
onSuggestionsError: (error: any) => void;
```

Gets called when there is an error while fetching suggestions

```ts
onRequestStatusChange: (next: string, prev: string) => void;
```

Gets called when request status changes

```ts
onSuggestionsRequestStatusChange: (next: string, prev: string) => void;
```

Gets called when suggestions request status changes

```ts
onQueryChange: (next: string, prev: string) => void;
```

Gets called when query changes

```ts
onSuggestionsQueryChange: (next: string, prev: string) => void;
```

Gets called when suggestions query changes

```ts
onMicStatusChange: (next: string, prev: string) => void;
```

Gets called when mic status changes

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

### With suggestions

## API

### Constructor

### Properties

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

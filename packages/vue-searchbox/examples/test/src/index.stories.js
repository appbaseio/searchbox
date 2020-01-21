import Vue from "vue";
import VueSearchbox from "@appbaseio/vue-searchbox";

export default { title: "SearchBox" };

export const gettingStarted = () => ({
  render: h => (
    <VueSearchbox
      app="good-books-ds"
      credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      dataField={["original_title", "original_title.search"]}
    />
  )
});

export const withAllProps = () => ({
  render: h => (
    <VueSearchbox
      app="good-books-ds"
      credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      dataField={[
        { field: "original_title", weight: 1 },
        { field: "original_title.search", weight: 3 }
      ]}
      title="Search"
      defaultValue="Songwriting"
      placeholder="Search for books"
      autosuggest={true}
      defaultSuggestions={[
        { label: "Songwriting", value: "Songwriting" },
        { label: "Musicians", value: "Musicians" }
      ]}
      queryFormat="or"
      fuzziness="AUTO"
      showClear
      showVoiceSearch
      debounce={300}
    />
  )
});

export const withResponsive = () => ({
  render: h => (
    <div style={{ width: "50%" }}>
      <VueSearchbox
        app="good-books-ds"
        credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
        dataField={["original_title", "original_title.search"]}
      />
    </div>
  )
});

export const withNoSuggestion = () => ({
  render: h => (
    <VueSearchbox
      app="good-books-ds"
      credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      dataField={["original_title", "original_title.search"]}
      renderNoSuggestion={() => 'No Suggestion'}
    />
  )
});

export const withNoAutoSuggest = () => ({
  render: h => (
    <VueSearchbox
      app="good-books-ds"
      credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      dataField={["original_title", "original_title.search"]}
      autosuggest={false}
    />
  )
});

export const withDebounce = () => ({
  render: h => (
    <VueSearchbox
      app="good-books-ds"
      credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      dataField={["original_title", "original_title.search"]}
      debounce={300}
    />
  )
});

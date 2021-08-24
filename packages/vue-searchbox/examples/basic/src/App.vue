<template>
  <div id="app">
    <h2>
      Vue Searchbox Demo
      <span style="font-size: 1rem">
        <a
          href="https://docs.appbase.io/docs/reactivesearch/vue-searchbox/apireference/"
          target="_blank"
          >API reference</a
        >
      </span>
    </h2>
    <!--
      props usage in serach-base component -
        index - refers to the index of elasticsearch cluster
        credentials - basic auth credentials in the format 'username:password'
        url - URL for the Eelasticsearch cluster
        appbaseConfig - to customize the analytics experience when appbase.io is used as a backend
          recordAnalytics - allows recording search analytics (and click analytics)
          enableQueryRules - if false then query rules won't be applied to the search requests
          userId - user id to be used in the records for analytics
          customEvents - these events can be used to filter the analytics stats from the appbase.io dashboard or for custom analytics
    -->
    <search-base
      index="good-books-clone"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
      :appbaseConfig="{
        recordAnalytics: true,
        enableQueryRules: true,
        userId: 'jon@appbase.io',
        customEvents: {
          platform: 'ios',
          device: 'iphoneX',
        },
      }"
    >
      <div>
        <!--
            props usage in search-box component -
              id - unique identifier for the component
              dataField - index field(s) to be connected to the component’s UI view
              title - to set the title of the component to be shown in the UI
              placeholder - text to be shown in the component's input field
              autosuggest - set to false to disable the autosuggest functionality, defaults to true
              renderNoSuggestion - to pass custom JSX or string to be rendered when no suggestions are found
              enablePopularSuggestions - to curate search suggestions based on actual search queries that users are making
              enableRecentSearches - to get top recent searches as the default suggestions
              defaultSuggestions - to preset search suggestions to be shown on focus when no search query text is present
              showVoiceSearch - enables voice search for searchbox
              size - represents the current state of the size of results to be returned by query
              style - to set the custom style for the UI
              class - to provide custom styling class for the component
          -->
        <search-box
          id="search-component"
          :dataField="[
            {
              field: 'original_title',
              weight: 1,
            },
            {
              field: 'original_title.search',
              weight: 3,
            },
          ]"
          title="Search"
          placeholder="Search for Books"
          :autosuggest="true"
          :showVoiceSearch="true"
          class="custom-class"
          :enablePopularSuggestions="true"
          :enableRecentSearches="true"
          :size="5"
          :defaultSuggestions="[
            {
              label: 'Antigone',
              value: 'antigone',
            },
            {
              label: 'The Alienist',
              value: 'The Alienist',
            },
          ]"
        >
          <div slot="renderNoSuggestion">No Suggestions Found!!</div>
        </search-box>
        <div>
          <search-component
            id="result-component"
            :dataField="['original_title']"
            :size="5"
            :react="{ and: ['search-component'] }"
          >
            <div
              class="result-list-container"
              slot-scope="{ loading, error, results, size, from, setFrom }"
            >
              <div v-if="loading">Fetching Results ....</div>
              <div v-if="Boolean(error)">
                Something went wrong! Error details
                {{ JSON.stringify(error) }}
              </div>
              <p v-if="!loading && !error">
                {{ results.numberOfResults }} results found in
                {{ results.time }}ms
              </p>
              <div v-if="!loading && !error">
                <!-- query rule is added for promoting Batman and SuperMan comic books when searched for 'hero' -->
                <div
                  v-bind:key="
                    item._promoted ? `${item.doc._id}-promoted-item` : item._id
                  "
                  v-for="item in results.data"
                >
                  <div class="flex book-content" key="item._id">
                    <img
                      :src="item._promoted ? item.doc.image : item.image"
                      alt="Book Cover"
                      class="book-image"
                    />
                    <div class="flex column justify-center ml20">
                      <div class="book-header">
                        {{
                          item._promoted
                            ? item.doc.original_title
                            : item.original_title
                        }}
                      </div>
                      <div class="flex column justify-space-between">
                        <div>
                          <div>
                            by
                            <span class="authors-list">{{
                              item._promoted ? item.doc.authors : item.authors
                            }}</span>
                          </div>
                          <div class="ratings-list flex align-center">
                            <span>
                              <i
                                v-for="(item, index) in Array(
                                  item._promoted
                                    ? item.doc.average_rating_rounded
                                    : item.average_rating_rounded
                                ).fill('x')"
                                class="fa fa-star stars"
                                :key="index"
                              />
                            </span>
                            <span class="avg-rating"
                              >({{
                                item._promoted
                                  ? item.doc.average_rating_rounded
                                  : item.average_rating_rounded
                              }}
                              avg)</span
                            >
                          </div>
                        </div>
                        <span class="pub-year"
                          >Pub
                          {{
                            item._promoted
                              ? item.doc.original_publication_year
                              : item.original_publication_year
                          }}</span
                        >
                      </div>
                    </div>
                    <div v-if="!!item._promoted" class="ribbon">
                      <span>Promoted</span>
                    </div>
                  </div>
                </div>
                <div class="pagination-wrapper">
                  <paginate
                    v-if="results.numberOfResults"
                    :value="Math.ceil(from / size) + 1"
                    :page-count="Math.ceil(results.numberOfResults / size)"
                    :click-handler="(page) => setFrom((page - 1) * size)"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'"
                  ></paginate>
                </div>
              </div>
            </div>
          </search-component>
        </div>
      </div>
    </search-base>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
import {
  SearchBase,
  SearchComponent,
  SearchBox,
} from "@appbaseio/vue-searchbox";
import "./styles.css";

export default {
  name: "app",
  components: {
    SearchBase,
    SearchBox,
    SearchComponent,
    Paginate,
  },
  methods: {
    renderNoSuggestions() {
      return "No Suggestions Found!";
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

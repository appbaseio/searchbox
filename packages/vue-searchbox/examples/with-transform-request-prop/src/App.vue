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
      index="good-books-ds"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
      :appbaseConfig="{
        recordAnalytics: true,
        enableQueryRules: false,
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
              transformRequest -
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
          :transformRequest="transformRequest"
        />
        <data-muse-suggestions :suggestedWords="suggestedWords" />

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
              <div v-if="!loading && !error && results.numberOfResults > 0">
                <div v-bind:key="item._id" v-for="item in results.data">
                  <div class="flex book-content" key="item._id">
                    <img
                      :src="item.image"
                      alt="Book Cover"
                      class="book-image"
                    />
                    <div class="flex column justify-center ml20">
                      <div class="book-header">{{ item.original_title }}</div>
                      <div class="flex column justify-space-between">
                        <div>
                          <div>
                            by
                            <span class="authors-list">{{ item.authors }}</span>
                          </div>
                          <div class="ratings-list flex align-center">
                            <span>
                              <i
                                v-for="(item, index) in Array(
                                  item.average_rating_rounded
                                ).fill('x')"
                                class="fa fa-star stars"
                                :key="index"
                              />
                            </span>
                            <span class="avg-rating"
                              >({{ item.average_rating_rounded }} avg)</span
                            >
                          </div>
                        </div>
                        <span class="pub-year"
                          >Pub {{ item.original_publication_year }}</span
                        >
                      </div>
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
/* eslint-disable no-console */
import Paginate from "vuejs-paginate";
import {
  SearchBase,
  SearchComponent,
  SearchBox,
} from "@appbaseio/vue-searchbox";
import DataMuseSuggestions from "./components/DataMuseSuggestions";
import axios from "axios";
import "./styles.css";

export default {
  name: "app",
  components: {
    SearchBase,
    SearchBox,
    SearchComponent,
    Paginate,
    DataMuseSuggestions,
  },
  data() {
    return {
      searchText: "",
      suggestedWords: [],
    };
  },
  methods: {
    transformRequest(request) {
      const suggestedWordsList = [];
      const reqBody = JSON.parse(request.body);
      let url =
        "https://api.datamuse.com/words?sp=" +
        reqBody.query[0].value +
        "&max=2";
      axios
        .get(url)
        .then(({ data }) => {
          data.forEach(({ word, score }) => {
            if (
              word &&
              reqBody.query[0].value &&
              word.toLowerCase() !== reqBody.query[0].value.toLowerCase() &&
              score > 99
            ) {
              suggestedWordsList.push({
                label: word,
                value: word,
              });
            }
          });
          this.suggestedWords = suggestedWordsList;
        })
        .catch((err) => console.error(err));
      return Promise.resolve(request);
    },
    handlesearchText(value, searchComponent) {
      this.searchText = `${value}`;
      // To fetch suggestions
      searchComponent.triggerDefaultQuery();
      // To update results
      searchComponent.triggerCustomQuery();
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

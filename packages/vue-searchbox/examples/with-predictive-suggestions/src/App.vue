<template>
  <div id="app">
    <h2>
      Vue Searchbox Demo
      <span style="font-size:1rem;">
        <a
          href="https://docs.appbase.io/docs/reactivesearch/vue-searchbox/apireference/"
          target="_blank"
          >API reference</a
        >
      </span>
    </h2>
    <search-base
      index="good-books-ds"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
      :appbaseConfig="{
        recordAnalytics: true,
        enableQueryRules: true,
        userId: 'jon@appbase.io',
        customEvents: {
          platform: 'ios',
          device: 'iphoneX'
        }
      }"
    >
      <div>
        <search-box
          id="search-component"
          :dataField="[
            {
              field: 'original_title',
              weight: 1
            },
            {
              field: 'original_title.search',
              weight: 3
            }
          ]"
          title="Search"
          placeholder="Search for Books"
          :autosuggest="true"
          :defaultSuggestions="[
            {
              label: 'Songwriting',
              value: 'Songwriting'
            },
            {
              label: 'Musicians',
              value: 'Musicians'
            }
          ]"
          :size="10"
          :debounce="100"
          queryFormat="or"
          fuzziness="AUTO"
          :showClear="true"
          :showVoiceSearch="true"
          :URLParams="true"
          class="custom-class"
          :enablePopularSuggestions="true"
          iconPosition="left"
          :enablePredictiveSuggestions="true"
        />
        <div class="row">
          <div class="col">
            <search-component
              id="author-filter"
              type="term"
              dataField="authors.keyword"
              :subscribeTo="['aggregationData', 'requestStatus', 'value']"
              :URLParams="true"
              :react="{ and: ['search-component'] }"
              :value="[]"
            >
              <div
                class="filter-container"
                slot-scope="{ aggregationData, loading, value, setValue }"
              >
                <div v-if="loading">Fetching Results ....</div>
                <div v-if="!loading">
                  <div
                    v-bind:key="item._key"
                    v-for="item in aggregationData.data"
                  >
                    <div class="list-item" key="{{item._key}}">
                      <input
                        type="checkbox"
                        :value="item._key"
                        :checked="value ? value.includes(item._key) : false"
                        @change="handleChange($event, value, setValue)"
                      />
                      <label class="list-item-label" :htmlFor="item._key">
                        {{ item._key }} ({{ item._doc_count }})
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </search-component>
          </div>
          <div class="col">
            <search-component
              id="result-component"
              :dataField="['original_title']"
              :size="5"
              :react="{ and: ['search-component', 'author-filter'] }"
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
                              <span class="authors-list">{{
                                item.authors
                              }}</span>
                            </div>
                            <div class="ratings-list flex align-center">
                              <span class="stars">
                                <i
                                  v-for="(item, index) in Array(
                                    item.average_rating_rounded
                                  ).fill('x')"
                                  class="fas fa-star"
                                  :key="index"
                                />
                              </span>
                              <span class="avg-rating"
                                >({{ item.average_rating }} avg)</span
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
                      :click-handler="page => setFrom((page - 1) * size)"
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
      </div>
    </search-base>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import {
  SearchBase,
  SearchComponent,
  SearchBox
} from '@appbaseio/vue-searchbox';
import './styles.css';

export default {
  name: 'app',
  components: {
    SearchBase,
    SearchBox,
    SearchComponent,
    Paginate
  },
  methods: {
    isChecked(value, key) {
      return value ? value.includes(key) : false;
    },
    handleChange(e, value, setValue) {
      const values = value || [];
      if (values && values.includes(e.target.value)) {
        values.splice(values.indexOf(e.target.value), 1);
      } else {
        values.push(e.target.value);
      }
      // Set filter value and trigger custom query
      setValue(values, {
        triggerDefaultQuery: false,
        triggerCustomQuery: true,
        stateChanges: true
      });
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

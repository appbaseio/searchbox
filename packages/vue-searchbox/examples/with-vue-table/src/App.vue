<template>
  <div id="app">
    <h2>
      Vue Searchbox Demo
      <span style="font-size:1rem;">
        <a
          href="https://docs.appbase.io/docs/reactivesearch/vue-searchbox/apireference/"
          target="_blank"
        >API reference</a>
      </span>
    </h2>
    <search-base
      index="good-books-ds"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
      :analyticsConfig="{
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
        />
        <div class="row">
          <div>
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
                  <v-client-table :data="results.data" :columns="columns" :options="options"></v-client-table>
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
  data() {
    return {
      columns: [
        'title',
        'authors',
        'average_rating',
        'language_code',
        'isbn',
        'ratings_count'
      ]
    };
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

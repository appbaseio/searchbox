<template>
  <div id="app">
    <h2>
      Vue Searchbox with Atlas Search Demo
      <span style="font-size:1rem;">
        <a
          href="https://docs.appbase.io/docs/reactivesearch/atlas-search/overview/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get started over here
        </a>
      </span>
    </h2>
    <search-base
      index="default"
      url="https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/public-demo-skxjb/service/http_endpoint/incoming_webhook/reactivesearch"
      :mongodb="{
        db: 'sample_airbnb',
        collection: 'listingsAndReviews'
      }"
    >
      <div>
        <div class="row">
          <div class="col">
            <search-component
              id="facet-component"
              type="term"
              dataField="property_type"
              :URLParams="true"
              :value="[]"
              title="Facet"
              :aggregationSize="5"
            >
              <div
                class="filter-container"
                slot-scope="{ aggregationData, loading, value, setValue }"
              >
                <h3>Facet with 5 items</h3>
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
              :dataField="['name']"
              :size="5"
              :react="{ and: ['facet-component'] }"
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
                    <div
                      class="book-content"
                      key="item._id"
                      style="padding:20px;"
                    >
                      <h1>{{ item.name }}</h1>
                      <p>
                        {{
                          item.description.substring(
                            0,
                            Math.min(160, item.description.length)
                          )
                        }}
                      </p>
                      <span
                        style="background: #efefef;padding: 3;border-radius: 3;margin-top: 10; margin-bottom: 10;width: auto;"
                      >
                        #{{ item.property_type }}
                      </span>
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
import { SearchBase, SearchComponent } from '@appbaseio/vue-searchbox';
import './styles.css';

export default {
  name: 'app',
  components: {
    SearchBase,
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

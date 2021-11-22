<!--  component for adding filters to search query -->
<template>
  <search-component
    id="author-filter"
    type="term"
    dataField="authors.keyword"
    :subscribeTo="['aggregationData', 'requestStatus', 'value']"
    :react="{ and: ['search-component'] }"
    :value="[]"
  >
    <div
      class="filter-container"
      slot-scope="{ aggregationData, loading, value, setValue }"
    >
      <div v-if="loading">Fetching Results ....</div>
      <div v-if="!loading">
        <div v-bind:key="item._key" v-for="item in aggregationData.data">
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
</template>

<script>
import { SearchComponent } from '@appbaseio/vue-searchbox';
export default {
  name: 'filters',
  components: {
    SearchComponent
  },
  methods: {
    handleChange(e, value, setValue) {
      const values = value || [];
      if (values && values.includes(e.target.value)) {
        values.splice(values.indexOf(e.target.value), 1);
      } else {
        values.push(e.target.value);
      }
      // Set filter value and trigger custom query
      setValue(values, {
        triggerDefaultQuery: false, // set triggerDefaultQuery --> true to fetch fresh suggestions
        triggerCustomQuery: true, // set triggerDefaultQuery --> true to fetch fresh results
        stateChanges: true
      });
    }
  }
};
</script>

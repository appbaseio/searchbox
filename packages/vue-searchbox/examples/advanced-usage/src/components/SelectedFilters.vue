<!-- component for rendering the active filters -->
<template>
  <div v-if="Object.keys(activeFilters).length">
    <div class="selected-filters">
      <h4>Selected Filters:</h4>
      <button
        v-for="label in Object.keys(activeFilters)"
        v-on:click="() => removeFilter(label)"
        class="filter-btn"
        :key="label"
      >
        <h5>{{ label }}&nbsp;|&nbsp;</h5>
        <span :title="getFilterValue(label)">{{ getFilterValue(label) }}</span>
      </button>
      <button @click="clearAll">
        Clear All
      </button>
    </div>
  </div>
</template>

<script>
const COMPONENTS_TO_SUBSCRIBE = ['author-filter', 'search-component']; // 2 filters are tracked for
export default {
  name: 'selected-filters',
  inject: ['searchbase'], // searchbase context injected here
  data() {
    return {
      activeFilters: {} // we store active filters here
    };
  },
  mounted() {
    const searchContext = this.searchbase; // accessing searchbase context
    const componentIds = COMPONENTS_TO_SUBSCRIBE;
    const components = searchContext.getComponents(); // get all components within the app using searchbase context method getComponents()
    componentIds.forEach(componentId => {
      // we subscribe to value changes for our filters components as mentioned in COMPONENTS_TO_SUBSCRIBE above
      components[componentId].subscribeToStateChanges(change => {
        const state = { ...this.activeFilters };

        // below we update our activeFilters data variable
        // whenever we have a change in the value of subscribed component
        Object.keys(change).forEach(property => {
          if (
            Array.isArray(change[property].next) &&
            change[property].next.length
          ) {
            state[componentId] = change[property].next.join(', '); // storing array values in string format
          } else if (change[property].next) {
            state[componentId] = change[property].next; // already string
          } else {
            delete state[componentId];
          }
        });
        this.activeFilters = state;
      }, 'value');
    });
  },
  methods: {
    // removeFilter method removes a particular filter using
    // setValue method provided in  component instance, we got from searchbase context object
    removeFilter(label) {
      const components = this.searchbase.getComponents();
      components[label].setValue('', {
        triggerCustomQuery: true // pass it to refetch fresh results after updating value for a component
      });
    },
    // method to clear all filters
    clearAll() {
      COMPONENTS_TO_SUBSCRIBE.forEach(key => {
        this.removeFilter(key);
      });
    },
    getFilterValue(label) {
      return this.activeFilters[label]; // get value string for an active filter
    }
  }
};
</script>

<style>
.selected-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.selected-filters h4 {
  margin-right: 10px;
  text-decoration: underline;
}
.selected-filters button {
  cursor: pointer;
  height: 24px;
}

button.filter-btn {
  display: flex;
  align-items: center;
  margin: 0.5rem;
  position: relative;
}
button.filter-btn {
  display: flex;
  align-items: center;
  margin: 0.5rem;
  cursor: pointer;
  position: relative;
}

button.filter-btn h5 {
  text-transform: uppercase;
}
button.filter-btn span {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<template>
  <div v-if="suggestedWords.length > 0">
    Search instead :
    <a
      href="#"
      v-bind:key="item.label"
      v-for="item in suggestedWords"
      @click="setQueryValue(item.value)"
      :style="{ marginRight: '10px' }"
    >
      {{ item.value }}
    </a>
  </div>
</template>

<script>
export default {
  inject: ["searchbase"],
  props: {
    suggestedWords: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    setQueryValue(itemName) {
      this.searchbase._components["search-component"].setValue(itemName, {
        triggerCustomQuery: true,
      });
    },
  },
};
</script>

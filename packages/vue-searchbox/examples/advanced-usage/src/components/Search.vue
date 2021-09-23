<!--  searchbox component for searching through dataset -->
<template>
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
    :size="5"
  />
</template>

<script>
import { SearchBox } from '@appbaseio/vue-searchbox';
export default {
  name: 'search',
  components: {
    SearchBox
  }
};
</script>

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
    <VueSearchbox
      app="good-books-ds"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
      :dataField="['original_title', 'original_title.search']"
      :showVoiceSearch="true"
    />
  </div>
</template>

<script>
import VueSearchbox from '@appbaseio/vue-searchbox';

export default {
  name: 'app',
  components: {
    VueSearchbox
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

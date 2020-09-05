<template>
  <div id="app">
    <VueSearchbox
      app="movie-app"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://arc-cluster-appbase-demo-6pjy6z.searchbase.io"
      :dataField="['original_title', 'original_title.search']"
      :showVoiceSearch="true"
      :enableAppbase="true"
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
  margin-top: 60px;
}
</style>

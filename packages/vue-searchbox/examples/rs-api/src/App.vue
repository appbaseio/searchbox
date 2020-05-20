<template>
  <div id="app">
    <VueSearchbox
      app="business"
      url="http://localhost:8000"
      credentials="foo:bar"
      :dataField="['original_title', 'original_title.search']"
      :showVoiceSearch="true"
      :enableAppbase="true"
    />
  </div>
</template>

<script>
import VueSearchbox from "@appbaseio/vue-searchbox";

export default {
  name: "app",
  components: {
    VueSearchbox
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <VueSearchbox
      app="good-books-ds"
      credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      :dataField="['original_title', 'original_title.search']"
      :showVoiceSearch="true"
      :analytics="true"
      :showLoader="true"
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
  width: 50%;
  padding-left: 100px;
}
</style>

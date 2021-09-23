<template>
  <div id="app">
    <h2>
      Vue Searchbox Demo
      <span style="font-size:1rem;">
        <a
          href="https://docs.appbase.io/docs/reactivesearch/vue-searchbox/apireference/"
          target="_blank"
          >API reference</a
        >
      </span>
    </h2>
    <search-base
      index="good-books-ds"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
      :appbaseConfig="{
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
        <search />
        <div class="row">
          <div class="col">
            <filters />
          </div>
          <div class="col">
            <selected-filters />
            <result />
          </div>
        </div>
      </div>
    </search-base>
  </div>
</template>

<script>
import { SearchBase } from '@appbaseio/vue-searchbox';
import Filters from './components/Filters.vue';
import Result from './components/Result.vue';
import Search from './components/Search.vue';
import SelectedFilters from './components/SelectedFilters.vue';
import './styles.css';

export default {
  name: 'app',
  components: {
    SearchBase,
    Search,
    Filters,
    Result,
    SelectedFilters
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

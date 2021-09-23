<!-- component for rendering results -->
<template>
  <search-component
    id="result-component"
    :dataField="['original_title']"
    :size="10"
    :react="{ and: ['search-component', 'author-filter'] }"
  >
    <div class="result-list-container" slot-scope="{ loading, error, results }">
      <div v-if="loading">Fetching Results ....</div>
      <div v-if="Boolean(error)">
        Something went wrong! Error details
        {{ JSON.stringify(error) }}
      </div>
      <p v-if="!loading && !error">
        {{ results.numberOfResults }} results found in {{ results.time }}ms
      </p>
      <div v-if="!loading && !error">
        <div v-bind:key="item._id" v-for="item in results.data">
          <div class="flex book-content" key="item._id">
            <img :src="item.image" alt="Book Cover" class="book-image" />
            <div class="flex column justify-center ml20">
              <div class="book-header">{{ item.original_title }}</div>
              <div class="flex column justify-space-between">
                <div>
                  <div>
                    by
                    <span class="authors-list">{{ item.authors }}</span>
                  </div>
                  <div class="ratings-list flex align-center">
                    <span class="stars">
                      <i
                        v-for="(item, index) in Array(
                          item.average_rating_rounded
                        ).fill('x')"
                        class="fas fa-star"
                        :key="index"
                      />
                    </span>
                    <span class="avg-rating"
                      >({{ item.average_rating }} avg)</span
                    >
                  </div>
                </div>
                <span class="pub-year"
                  >Pub {{ item.original_publication_year }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </search-component>
</template>

<script>
import { SearchComponent } from '@appbaseio/vue-searchbox';
export default {
  name: 'result',
  components: {
    SearchComponent
  }
};
</script>

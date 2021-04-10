<template>
  <div class="d-flex flex-column">
    <div class="d-flex"><h2 class="my-0">Top 50 Trending Coins (Last 24 Hours)</h2></div>
    <div class="d-flex">
      <v-divider class="my-1" />
    </div>

    <div class="d-flex flex-column align-center justify-start flex-grow-1">
      <TrendingDatagrid class="my-5" :items="trendingResults" :loading="trendingLoading" />
    </div>
  </div>
</template>

<script>
import TrendingDatagrid from "./Datagrid/TrendingDatagrid";

import { mapGetters } from "vuex";
export default {
  name: "TrendingCoinsContainer",
  props: {},
  components: {
    TrendingDatagrid,
  },

  computed: {
    ...mapGetters({
      trendingResults: "trending/getTrending",
      trendingLoading: "trending/getLoading",
    }),
  },
  methods: {},
};
</script>

<style scoped></style>

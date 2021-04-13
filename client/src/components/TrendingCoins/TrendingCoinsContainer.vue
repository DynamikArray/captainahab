<template>
  <div class="d-flex flex-column">
    <div class="d-flex"><h2 class="my-0">Top 50 Trending Coins (Last 24 Hours)</h2></div>
    <div class="d-flex">
      <v-divider class="my-1" />
    </div>

    <div class="d-flex flex-column align-center justify-start flex-grow-1">
      <TrendingDatagrid class="my-5" :items="trendingCoinsResults" :loading="trendingCoinsLoading" />
    </div>
  </div>
</template>

<script>
import TrendingDatagrid from "./Datagrid/TrendingDatagrid";
import { TRENDING_COINS_SEARCH } from "@/store/actionTypes";

import { mapGetters } from "vuex";

export default {
  name: "TrendingCoinsContainer",
  props: {},
  components: {
    TrendingDatagrid,
  },
  computed: {
    ...mapGetters({
      trendingCoinsResults: "trending/coins/getTrending",
      trendingCoinsLoading: "trending/coins/getLoading",
    }),
  },
  created() {
    this.$store.dispatch(`trending/coins/${TRENDING_COINS_SEARCH}`, { root: true });
  },
  methods: {},
};
</script>

<style scoped></style>

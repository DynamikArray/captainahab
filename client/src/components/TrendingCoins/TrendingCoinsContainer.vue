<template>
  <div class="">
    <div class="d-flex"><h2 class="my-0">Trending</h2></div>

    <v-divider class="my-1" />

    <div class="d-flex flex-column align-center justify-start flex-grow-1">
      <div class="d-flex flex-grow-1">
        <TrendingDatagrid class="my-5" :items="trendingResults" :loading="trendingLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import { TRENDING_COINS_SEARCH } from "@/store/actionTypes";

import TrendingDatagrid from "./Datagrid/TrendingDatagrid";

import { mapGetters } from "vuex";
export default {
  name: "TrendingCoinsContainer",
  props: {},
  components: {
    TrendingDatagrid,
  },
  created() {
    this.$store.dispatch(`trending/${TRENDING_COINS_SEARCH}`, { root: true });
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

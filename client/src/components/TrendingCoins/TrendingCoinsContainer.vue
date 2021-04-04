<template>
  <div>
    <div class="d-flex"><h2 class="my-0">Trending</h2></div>
    <v-divider class="my-1" />
    <div class="d-flex">
      <div class="d-flex flex-column">
        <div class="d-flex">Filter Goes HEre</div>
        <div class="d-flex"><TrendingDatagrid :items="trendingResults" :loading="trendingLoading" /></div>
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

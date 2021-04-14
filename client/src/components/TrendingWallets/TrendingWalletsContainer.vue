<template>
  <div class="d-flex flex-column">
    <div class="d-flex"><h2 class="my-0">Top 25 Trending Wallets (Last 24 Hours)</h2></div>
    <div class="d-flex">
      <v-divider class="my-1" />
    </div>

    <div class="d-flex flex-column align-center justify-start flex-grow-1">
      <TrendingWalletsGroupedDatagrid class="my-5" :items="trendingWalletsResults" :loading="trendingWalletsLoading" />
    </div>
  </div>
</template>

<script>
import TrendingWalletsGroupedDatagrid from "./Datagrid/TrendingWalletsGroupedDatagrid";
import { TRENDING_WALLETS_SEARCH } from "@/store/actionTypes";

import { mapGetters } from "vuex";

export default {
  name: "TrendingWalletsContainer",
  components: {
    TrendingWalletsGroupedDatagrid,
  },
  computed: {
    ...mapGetters({
      trendingWalletsResults: "trending/wallets/getTrending",
      trendingWalletsLoading: "trending/wallets/getLoading",
    }),
  },
  async created() {
    await this.$store.dispatch(`trending/wallets/${TRENDING_WALLETS_SEARCH}`);
  },
};
</script>

<style scoped></style>

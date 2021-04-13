<template>
  <div>Trending Wallets</div>
</template>

<script>
import { TRENDING_WALLETS_SEARCH } from "@/store/actionTypes";

import { mapGetters } from "vuex";

export default {
  name: "TrendingWalletsContainer",
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

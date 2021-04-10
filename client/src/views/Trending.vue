<template>
  <div class="trending my-6">
    <TrendingCoinsContainer />
  </div>
</template>

<script>
import TrendingCoinsContainer from "@/components/TrendingCoins/TrendingCoinsContainer";
import { TRENDING_COINS_SEARCH } from "@/store/actionTypes";

export default {
  name: "TrendingView",
  components: {
    TrendingCoinsContainer,
  },
  created() {
    this.$store.dispatch(`trending/${TRENDING_COINS_SEARCH}`, { root: true });
  },
};
</script>

<style scoped></style>

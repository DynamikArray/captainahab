<template>
  <div class="home my-6">
    <TrendingCoinsContainer />
  </div>
</template>

<script>
import TrendingCoinsContainer from "@/components/TrendingCoins/TrendingCoinsContainer";

export default {
  name: "TrendingView",
  components: {
    TrendingCoinsContainer,
  },
};
</script>

<style scoped></style>

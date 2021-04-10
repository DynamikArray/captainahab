<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div :key="`transition_MarketCap_${item._id}`" class="text-subtitle-1">
      <div class="d-flex no-wrap">
        {{ formattedMarketCap }}
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    item: [Object, Boolean],
  },
  computed: {
    formattedMarketCap() {
      if (this.item.tokenPricesData && this.item.tokenPricesData.market_cap) {
        return this.$options.filters.currency(this.item.tokenPricesData.market_cap);
      }
      return "";
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="text-subtitle-1">{{ formattedMarketCap }}</div>
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

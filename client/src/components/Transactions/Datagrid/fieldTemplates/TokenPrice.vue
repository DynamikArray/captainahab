<template>
  <div class="text-h6 textShadow">{{ formattedPrice }}</div>
</template>

<script>
export default {
  props: {
    item: [Boolean, Object],
  },
  computed: {
    formattedPrice() {
      const pricesData = this.item.tokenPricesData;
      if (pricesData) {
        if (pricesData.price < 0) return this.$options.filters.below_one_dollar(pricesData.price);
        return this.$options.filters.currency(pricesData.price);
      }
      return "";
    },
  },
};
</script>

<style scoped></style>

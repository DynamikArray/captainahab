<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div :key="`transition_TokenPrice_${item._id}`" class="text-h6 textShadow">{{ formattedPrice }}</div>
  </v-slide-x-reverse-transition>
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

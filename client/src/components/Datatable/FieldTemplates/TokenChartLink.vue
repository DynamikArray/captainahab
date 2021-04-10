<template>
  <v-slide-x-reverse-transition mode="out-in">
    <v-btn
      :key="`transition_TokenChartLink _${item._id}`"
      color="grey darken-3 px-2"
      elevation="4"
      :href="chartUrl"
      target="_blank"
      style="min-width: 20px"
    >
      <v-icon>fas fa-chart-area</v-icon>
    </v-btn>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    item: [Boolean, Object],
  },
  computed: {
    chartUrl() {
      return "https://info.uniswap.org/token/" + this.item.tokenMetaData.address;
    },
  },
};
</script>

<style scoped></style>

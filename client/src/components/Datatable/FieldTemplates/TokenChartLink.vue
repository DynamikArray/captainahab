<template>
  <v-btn color="orange darken-2 px-2" :href="chartUrl" target="_blank" style="min-width: 20px">
    <v-icon>fas fa-chart-area</v-icon>
  </v-btn>
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

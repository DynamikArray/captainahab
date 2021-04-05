<template>
  <a class="underlineNone" :href="chartUrl" target="_blank">
    <v-icon>fas fa-chart-area</v-icon>
  </a>
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

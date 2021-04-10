<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div :key="`transition_TokenNameAndSymbol_${item._id}`">
      <a class="underlineNone" :href="chartUrl" target="_blank">
        <div class="d-flex align-center justify-start flex-grow-1">
          <div class="d-flex flex-column align-end justify-start flex-grow-1">
            <div class="d-flex align-start justify-start flex-grow-1">
              <h3 class="textShadow">{{ item.tokenMetaData.symbol }}</h3>
            </div>
            <div class="d-flex align-start justify-start flex-grow-1">
              <h5 class="textShadow">{{ item.tokenMetaData.name }}</h5>
            </div>
          </div>

          <div class="d-flex align-center justify-start">
            <v-img
              class="ma-3 white darken-1"
              style="border-radius: 15px"
              max-height="30"
              max-width="30"
              :src="item.tokenMetaData.logo"
            ></v-img>
          </div>
        </div>
      </a>
    </div>
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

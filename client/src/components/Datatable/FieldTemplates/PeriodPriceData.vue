<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div :key="`transition_PeriodPriceData_${item._id}`" v-if="hasTokenMetaData" class="d-flex flex-grow-1">
      <div class="d-flex align-center justify-start caption flex-grow-1">
        <div class="d-flex flex-column align-center justify-middle flex-grow-1 my-2">
          <div class="d-flex align-start justify-start subtitle-2 font-weight-light">Price Change</div>
          <div class="d-flex align-start justify-center flex-grow-1 flex-wrap">
            <div class="subtitle-1 mx-3 font-weight-bold flex-grow-1" :class="formatChangeColor(priceChange)">
              {{ priceChange }}
            </div>
            <div class="subtitle-1 mx-3 font-weight-bold flex-grow-1" :class="formatChangeColor(priceChangePct)">
              % {{ priceChangePct }}
            </div>
          </div>
        </div>

        <div class="d-flex flex-column align-center justify-middle flex-grow-1 my-2">
          <div class="d-flex align-start justify-start subtitle-2 font-weight-light">Volume Change</div>
          <div class="d-flex align-start justify-center subtitle-2 flex-wrap">
            <div class="subtitle-2 mx-3 font-weight-bold" :class="formatChangeColor(volumeChange)">
              {{ volumeChange | volume }}
            </div>
            <div class="subtitle-2 mx-3 font-weight-bold" :class="formatChangeColor(volumeChangePct)">
              % {{ volumeChangePct }}
            </div>
          </div>
          <div class="d-flex align-start justify-center caption grey--text flex-wrap">
            <div class="subtitle-2 mx-3 grey--text font-weight-light">Volume:</div>
            <div class="subtitle-2 mx-3 font-weight-bold">{{ volume | volume }}</div>
          </div>
        </div>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    item: [Boolean, Object],
    dayPeriod: [String],
  },
  computed: {
    hasTokenMetaData() {
      if (this.item.tokenPricesData && this.item.tokenPricesData[this.dayPeriod]) return true;
      return false;
    },
    priceChange() {
      if (this.item.tokenPricesData && this.item.tokenPricesData[this.dayPeriod]) {
        const price = this.item.tokenPricesData[this.dayPeriod].price_change;
        if (price < 0) return this.$options.filters.below_one_dollar(price);
        return this.$options.filters.currency(price);
      }
      return false;
    },
    priceChangePct() {
      if (this.item.tokenPricesData && this.item.tokenPricesData[this.dayPeriod]) {
        return this.item.tokenPricesData[this.dayPeriod].price_change_pct.slice(0, 5);
        //return this.item.tokenPricesData[this.dayPeriod].price_change_pct;
      }
      return false;
    },
    volume() {
      if (this.item.tokenPricesData && this.item.tokenPricesData[this.dayPeriod]) {
        return this.item.tokenPricesData[this.dayPeriod].volume;
      }
      return false;
    },
    volumeChange() {
      if (this.item.tokenPricesData && this.item.tokenPricesData[this.dayPeriod]) {
        return this.item.tokenPricesData[this.dayPeriod].volume_change;
      }
      return false;
    },
    volumeChangePct() {
      if (this.item.tokenPricesData && this.item.tokenPricesData[this.dayPeriod]) {
        return this.item.tokenPricesData[this.dayPeriod].volume_change_pct;
      }
      return false;
    },
  },
  methods: {
    formatChangeColor(val) {
      if (val && val.split("")[0] === "-") {
        return "red--text";
      }
      return "green--text";
    },
  },
};
</script>

<style scoped></style>

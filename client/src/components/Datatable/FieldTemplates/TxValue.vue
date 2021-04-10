<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div :key="`transition_txValue_${item._id}`">
      <h3 class="textShadow" :class="`${fieldHelpers.buyOrSellColor(item.txAction)}--text`">
        {{ fieldHelpers.truncateValue(item.value, 4) }}
      </h3>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
import fieldHelpers from "@/components/Datatable/fieldHelpers";

export default {
  name: "TxValue",
  props: {
    item: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data: () => ({
    fieldHelpers,
  }),
};
</script>

<style scoped></style>

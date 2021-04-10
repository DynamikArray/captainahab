<template>
  <v-slide-x-reverse-transition mode="out-in">
    <h3
      :key="`transition_BuyOrSellAction_${item._id}`"
      class="textShadow"
      :class="fieldHelpers.buyOrSellColor(item.txAction)"
    >
      {{ item.txAction }}
    </h3>
  </v-slide-x-reverse-transition>
</template>

<script>
import fieldHelpers from "@/components/Datatable/fieldHelpers";

export default {
  name: "BuyOrSellAction",
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

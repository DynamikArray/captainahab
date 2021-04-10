<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div :key="`transition_HashLink_${item._id}`">
      <v-btn color="success" :href="fieldHelpers.linkToEtherscanTx(item.hash)" target="_blank" style="min-width: 32px"
        ><v-icon>fab fa-ethereum</v-icon></v-btn
      >
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
import fieldHelpers from "@/components/Datatable/fieldHelpers";

export default {
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

<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div :key="`transition_WalletLink_${item._id}`">
      <v-btn color="primary" :href="fieldHelpers.linkToEtherscanAddress(item.from)" target="_blank" style="min-width: 32px"
        ><v-icon>fas fa-wallet</v-icon></v-btn
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

<template>
  <div class="home">
    <TransactionsContainer />
  </div>
</template>

<script>
import TransactionsContainer from "@/components/Transactions/TransactionsContainer";

import { SEARCH_TXS } from "@/store/actionTypes";

export default {
  name: "HomeView",
  components: {
    TransactionsContainer,
  },
  created() {
    this.$store.dispatch(`txs/${SEARCH_TXS}`);
  },
};
</script>
<style>
.textShadow {
  text-shadow: 1px 1px 1px #333;
}
</style>

<template>
  <div class="d-flex flex-grow-1">
    <TransactionsDatagrid :loading="searchLoading" :items="searchResults" :pager="searchPager" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TransactionsDatagrid from "@/components/Transactions/Datagrid/TransactionsDatagrid";
export default {
  name: "TransactionsContainer",
  components: {
    TransactionsDatagrid,
  },
  computed: {
    ...mapGetters({
      searchResults: "txs/getTxs",
      searchLoading: "txs/getLoading",
      searchPager: "txs/getPager",
    }),
  },
};
</script>

<style scoped></style>

<template>
  <div class="d-flex flex-column">
    <div class="d-flex mt-1">
      <h1>Incoming Transactions</h1>
    </div>
    <div class="d-flex flex-grow-1">
      <v-divider class="mb-2" />
    </div>
    <div class="d-flex">
      <IncomingTxsDatagrid :loading="loading" :items="txs" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import IncomingTxsDatagrid from "@/components/IncomingTxs/Datagrid/IncomingTxsDatagrid";

export default {
  name: "IncomingTxsContainer",
  components: {
    IncomingTxsDatagrid,
  },
  computed: {
    ...mapGetters({
      txs: "incoming/getIncoming",
      loading: "incoming/getLoading",
    }),
  },
};
</script>

<style scoped></style>

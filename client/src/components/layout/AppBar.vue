<template>
  <v-app-bar app color="primary" dark class="pa-0 ma-0" :maxHeight="45">
    <div class="d-flex align-center justify-space-between flex-grow-1">
      <div class="d-flex align-center justify-start">
        <div class="d-flex align-center justify-middle">
          <v-img src="@/assets/logo_large.png" max-width="60" />
        </div>
        <div class="d-flex align-center justify-start">
          <h2 class="textShadow mr-2">AHAB</h2>
        </div>
        <div class="d-flex align-center justify-middle">
          <h4 class="textShadow">Wallet Hunter</h4>
        </div>
      </div>
      <div class="d-flex align-center">
        <h5 class="mr-2">Transactions Indexed:</h5>
        <h4>{{ txsCount.toLocaleString() }}</h4>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "cs-AppBar",
  computed: {
    ...mapState({
      loading: (state) => state.api.loading,
    }),
    ...mapGetters({
      txsCount: "txs/getTxsCount",
    }),
  },
};
</script>

<style>
.v-app-bar .v-toolbar__content {
  height: 45px !important;
}
</style>

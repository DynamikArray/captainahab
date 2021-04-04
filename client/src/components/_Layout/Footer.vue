<template>
  <v-footer app class="secondary darken-2 subtitle-2">
    <div class="d-flex align-start justify-space-between flex-grow-1">
      <div class="d-flex flex-grow-1 align-center justify-start">
        <div class="d-flex align-center mx-4 mt-1">
          <div class="d-flex mr-2">Connection Status</div>
          <div v-if="socketStatus" class="d-flex">
            <v-icon small color="green">fa fa-check-circle</v-icon>
          </div>
          <div v-else class="d-flex">
            <v-icon small color="red">fas fa-exclamation-circle</v-icon>
          </div>
        </div>
        <div class="d-flex mx-4">
          <div class="d-flex align-center justify-center">
            <div class="mr-3 mt-1">Transactions Indexed</div>
            <v-slide-y-reverse-transition mode="out-in">
              <div class="text-h6 font-weight-bold" :key="`transition_txs_amount_${txsCount}`">
                {{ txsCount.toLocaleString() }}
              </div>
            </v-slide-y-reverse-transition>
          </div>
        </div>

        <div class="d-flex ml-auto">
          <h5>* This is not financial advice *</h5>
        </div>
      </div>
    </div>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      socketStatus: "getSocketStatus",
      socketStatusMessage: "getSocketStatusMessage",
      txsCount: "txs/getTxsCount",
    }),
  },
};
</script>

<style scoped></style>

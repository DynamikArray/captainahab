<template>
  <div class="d-flex align-start justify-start">
    <v-form ref="transactionSearchForm" v-model="validForm" v-on:submit.prevent>
      <div class="d-flex align-middle justify-center">
        <div class="d-flex flex-column align-end justify-center mt-3 mr-2">
          <div class="d-flex align-center">
            <h4 class="mt-0">Eth Amount</h4>
          </div>
          <div class="d-flex align-center">
            <div class="text-caption">Transaction Value</div>
          </div>
        </div>

        <div class="" style="max-width: 100px">
          <v-text-field
            autocomplete="off"
            class="mt-3"
            v-model="localEthLimit"
            :rules="fieldRules.ethAmount"
            name="ethAmount"
            label="Eth"
            solo
            outlined
            dense
            :hide-details="true"
          />
        </div>

        <div class="ml-3 mt-3 align-center justify-center">
          <v-btn @click="submitForm" type="submit" color="primary"> <v-icon class="mr-1">fa fa-search</v-icon>Search </v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SEARCH_TXS } from "@/store/actionTypes";
import { SEARCH_TXS_RESULTS_FILTER_UPDATE } from "@/store/mutationTypes";
import { fieldRules } from "./fieldRules";

export default {
  name: "TransactionFilters",
  watch: {
    ethLimit: function (eth) {
      this.localEthLimit = eth;
    },
  },
  data: () => ({
    validForm: false,
    fieldRules,
    localEthLimit: 5,
  }),
  computed: {
    ...mapGetters({
      ethLimit: "txs/getEthLimit",
    }),
  },
  methods: {
    validateForm() {
      const valid = this.$refs.transactionSearchForm.validate();
      return valid;
    },
    submitForm() {
      if (!this.$refs.transactionSearchForm.validate()) return false;

      const ethLimit = this.localEthLimit;
      this.$store.commit(`txs/${SEARCH_TXS_RESULTS_FILTER_UPDATE}`, { ethLimit }, { root: true });
      this.$store.dispatch(`txs/${SEARCH_TXS}`, { root: true });
    },
  },
};
</script>

<style scoped></style>

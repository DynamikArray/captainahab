<template>
  <div class="d-flex align-start justify-start">
    <v-form ref="transactionSearchForm" v-model="validForm" v-on:submit.prevent>
      <div class="d-flex align-middle justify-center">
        <div class="mx-5" style="width: 220px">
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
          >
            <template v-slot:prepend class="d-flex align-start flex-grow-1">
              <div class="d-flex flex-column align-start justify-start mr-2">
                <div class="d-flex align-center text-center">
                  <h4 class="mt-0">Eth Amount</h4>
                </div>
              </div>
            </template>
          </v-text-field>
        </div>

        <div class="mx-5" style="width: 160px">
          <v-text-field
            autocomplete="off"
            class="mt-3"
            :value="localSymbol"
            :rules="fieldRules.sybmol"
            @input="forceUpperSymbol"
            name="symbol"
            label="Symbol"
            solo
            outlined
            dense
          >
            <template v-slot:prepend class="d-flex align-start flex-grow-1">
              <div class="d-flex flex-column align-start justify-start mr-2">
                <div class="d-flex align-center text-center">
                  <h4 class="mt-0">Coins Symbol</h4>
                </div>
              </div>
            </template>
          </v-text-field>
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
    filters: function (filters) {
      if (filters.ethLimit) this.localEthLimit = filters.ethLimit;
      if (filters.symbol) this.localSymbol = filters.symbol;
    },
  },
  data: () => ({
    validForm: false,
    fieldRules,
    localEthLimit: 5,
    localSymbol: "",
  }),
  computed: {
    ...mapGetters({
      filters: "txs/getFilters",
    }),
  },
  methods: {
    forceUpperSymbol(val) {
      this.localSymbol = val.toUpperCase();
    },
    validateForm() {
      const valid = this.$refs.transactionSearchForm.validate();
      return valid;
    },
    submitForm() {
      if (!this.$refs.transactionSearchForm.validate()) return false;

      const ethLimit = this.localEthLimit;
      const symbol = this.localSymbol;

      this.$store.commit(`txs/${SEARCH_TXS_RESULTS_FILTER_UPDATE}`, { ethLimit, symbol }, { root: true });
      this.$store.dispatch(`txs/${SEARCH_TXS}`, { root: true });
    },
  },
};
</script>

<style scoped></style>

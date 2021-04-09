<template>
  <div class="d-flex align-start justify-start">
    <div class="d-flex flex-column align-center justify-center flex-grow-1">
      <div class="">
        <h3>Search Uniswap Transactions</h3>
      </div>
      <div class="">
        <v-form ref="transactionSearchForm" v-model="validForm" v-on:submit.prevent>
          <div class="d-flex align-middle justify-center">
            <div class="mx-5" style="width: 220px">
              <v-text-field
                autocomplete="off"
                class="mt-3"
                v-model="localMinEth"
                :rules="[numberRule]"
                name="minEth"
                label="Min Eth"
                solo
                outlined
                dense
              >
                <template v-slot:prepend class="d-flex align-start flex-grow-1">
                  <div class="d-flex flex-column align-start justify-start mr-2">
                    <div class="d-flex align-center text-center">
                      <h4 class="mt-0">Min Eth Amount</h4>
                    </div>
                  </div>
                </template>
              </v-text-field>
            </div>

            <div class="mx-5" style="width: 220px">
              <v-text-field
                autocomplete="off"
                class="mt-3"
                v-model="localMaxEth"
                :rules="[numberRule]"
                name="maxEth"
                label="Max Eth"
                solo
                outlined
                dense
              >
                <template v-slot:prepend class="d-flex align-start flex-grow-1">
                  <div class="d-flex flex-column align-start justify-start mr-2">
                    <div class="d-flex align-center text-center">
                      <h4 class="mt-0">Max Eth Amount</h4>
                    </div>
                  </div>
                </template>
              </v-text-field>
            </div>

            <div class="mx-5" style="width: 200px">
              <v-text-field
                autocomplete="off"
                class="mt-3"
                :value="localSymbol"
                @input="forceUpperSymbol"
                name="symbol"
                label="Symbol"
                solo
                outlined
                dense
                clearable
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
              <v-btn @click="submitForm" type="submit" color="primary">
                <v-icon class="mr-1">fa fa-search</v-icon>Search
              </v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SEARCH_TXS } from "@/store/actionTypes";
import { SEARCH_TXS_RESULTS_FILTER_UPDATE } from "@/store/mutationTypes";

export default {
  name: "TransactionFilters",
  watch: {
    filters: function (filters) {
      if (filters.minEth) this.localMinEth = filters.minEth;
      if (filters.maxEth) this.localMaxEth = filters.maxEth;
      if (filters.symbol) this.localSymbol = filters.symbol;
    },
  },
  data: () => ({
    validForm: false,
    localMinEth: 0.5,
    localMaxEth: "",
    localSymbol: "",
    numberRule: (v) => {
      if (!v) return true;
      if (!isNaN(parseFloat(v)) && v >= 0) return true;
      return "Number has to be greater than 0";
    },
  }),
  computed: {
    ...mapGetters({
      filters: "txs/getFilters",
    }),
  },
  methods: {
    forceUpperSymbol(val) {
      if (val) this.localSymbol = val.toUpperCase();
    },
    validateForm() {
      const valid = this.$refs.transactionSearchForm.validate();
      return valid;
    },
    submitForm() {
      if (!this.$refs.transactionSearchForm.validate()) return false;

      const minEth = this.localMinEth;
      const maxEth = this.localMaxEth;
      const symbol = this.localSymbol;

      this.$store.commit(`txs/${SEARCH_TXS_RESULTS_FILTER_UPDATE}`, { minEth, maxEth, symbol }, { root: true });
      this.$store.dispatch(`txs/${SEARCH_TXS}`, { root: true });
    },
  },
};
</script>

<style scoped></style>

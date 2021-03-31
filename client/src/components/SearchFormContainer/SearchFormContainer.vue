<template>
  <v-card class="mb-5">
    <v-card-text class="my-0 mt-1">
      <v-form ref="txSearchForm" class="d-flex align-center justify-space-between" v-model="validForm">
        <div class="d-flex">
          <v-text-field
            class="mx-3"
            dense
            filled
            label="Amount in Eth"
            v-model="searchFields.ethAmount"
            :rules="fieldRules.ethAmount"
          ></v-text-field>
          <v-text-field
            class="mx-3"
            dense
            filled
            label="Blocks To Search"
            v-model="searchFields.blocks"
            :rules="fieldRules.blocks"
          ></v-text-field>
        </div>

        <v-btn color="primary" @click="submitForm()"><v-icon class="mr-2" small>fa fa-search</v-icon>Search</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { SEARCH_TXS } from "@/store/actionTypes";
import { fieldRules } from "./fieldRules";

export default {
  name: "SearchFormContainer",
  data: () => ({
    validForm: false,
    fieldRules,
    searchFields: {
      ethAmount: 5,
      blocks: 5,
    },
  }),
  methods: {
    submitForm() {
      //validate data maybe before sending
      this.$store.dispatch(`txs/${SEARCH_TXS}`, this.searchFields);
    },
  },
};
</script>

<style scoped></style>

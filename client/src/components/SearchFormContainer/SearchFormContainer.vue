<template>
  <v-card class="grey darken-4">
    <v-card-text>
      <v-form ref="txSearchForm" class="d-flex align-center justify-space-between" v-model="validForm">
        <div class="d-flex">
          <v-text-field dense filled label="ethAmount" v-model="searchFields.ethAmount"></v-text-field>
        </div>
        <v-btn color="primary" @click="submitForm()"><v-icon class="mr-2" small>fa fa-search</v-icon>Search</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SearchFormContainer",
  data: () => ({
    validForm: false,
    searchFields: {
      ethAmount: 5,
    },
  }),
  methods: {
    submitForm() {
      const searchParams = {};
      this.$store.dispatch("SOME_ACTION", searchParams);
    },
  },
};
</script>

<style scoped></style>

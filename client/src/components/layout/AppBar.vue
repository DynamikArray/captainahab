<template>
  <v-app-bar app color="primary" dark class="">
    <div class="loadingIndicator">
      <v-progress-linear :indeterminate="Boolean(loading)" color="white" class=""></v-progress-linear>
    </div>
    <div class="d-flex align-center">LOGO</div>

    <v-spacer></v-spacer>

    <v-btn href="https://etherscan.io/" target="_blank" text>
      <span class="mr-2">Etherscan</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "cs-AppBar",
  computed: {
    ...mapState({
      loading: (state) => state.api.loading,
    }),
  },
};
</script>

<style></style>

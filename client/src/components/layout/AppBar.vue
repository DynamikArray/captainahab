<template>
  <v-app-bar app color="primary" dark class="pa-0 ma-0" :maxHeight="35">
    <div class="d-flex align-center justify-space-between flex-grow-1">
      <div class="d-flex align-center justify-start">Logo</div>
      <div class="d-flex align-center justify-start">
        <v-btn href="https://etherscan.io/" target="_blank" text>
          <span class="mr-2">Etherscan</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
    </div>
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

<style>
.v-app-bar .v-toolbar__content {
  height: 35px !important;
}
</style>

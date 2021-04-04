<template>
  <v-app-bar app color="primary" dark class="pa-0 ma-0" :maxHeight="50">
    <div class="loadingIndicator">
      <v-progress-linear :indeterminate="Boolean(loading)" color="white" height="5"></v-progress-linear>
    </div>

    <div class="d-flex align-center justify-space-between flex-grow-1 mt-1">
      <div class="d-flex align-center justify-start mr-5">
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

      <div class="d-flex align-center ml-3 mr-auto">
        <div class="d-flex align-center mx-3">
          <v-btn small text :to="{ name: 'Home' }">Home</v-btn>
        </div>
        <div class="d-flex align-center mx-3">
          <v-btn small text :to="{ name: 'Trending' }">Trending</v-btn>
        </div>
      </div>

      <div class="d-flex align-center">
        <!--SPACEHOLDER-->
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ahab-AppBar",
  computed: {
    ...mapState({
      loading: (state) => state.api.loading,
    }),
  },
};
</script>

<style>
.v-app-bar .v-toolbar__content {
  height: 50px !important;
}

.loadingIndicator {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
</style>

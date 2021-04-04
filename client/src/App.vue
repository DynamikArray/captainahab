<template>
  <v-app>
    <AppBar />
    <v-main style="padding-top: 30px">
      <v-container fluid>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { TOTAL_TXS_GET_COUNT } from "@/store/actionTypes";

import AppBar from "./components/_Layout/AppBar";
import Footer from "./components/_Layout/Footer";

export default {
  name: "App",
  components: { AppBar, Footer },
  created() {
    document.title = "Captain Ahab";
    this.$store.dispatch(`txs/${TOTAL_TXS_GET_COUNT}`, { root: true });
  },
};
</script>

<style>
.underlineNone {
  text-decoration: none;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 0.5, 0.8, 0.5);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

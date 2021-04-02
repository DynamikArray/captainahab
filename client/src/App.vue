<template>
  <v-app>
    <AppBar />

    <v-main>
      <v-container fluid>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/layout/AppBar";
export default {
  name: "App",
  components: { AppBar },
  created() {
    document.title = "Captain Ahab";
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

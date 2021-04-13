<template>
  <v-navigation-drawer app :mini-variant="drawer" clipped style="top: 50px; max-height: calc(100%)">
    <div class="text-center mt-2">
      <h4 class="grey--text">Menu</h4>
      <v-divider class="mt-2" />
    </div>

    <v-list class="my-0">
      <v-list-item v-for="item in navigationLinks" :key="item.title" :to="{ name: item.to }" exact>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { navigationLinks } from "@/components/_Layout/Navigation/navigationLinks";

export default {
  props: {
    drawer: {
      type: [Boolean],
      default: false,
    },
  },
  data: () => ({
    navigationLinks,
  }),
};
</script>

<style scoped></style>

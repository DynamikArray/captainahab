<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">LOGO</div>

    <v-spacer></v-spacer>

    <v-btn href="https://etherscan.io/" target="_blank" text>
      <span class="mr-2">Etherscan</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "cs-AppBar",
};
</script>

<style scoped></style>

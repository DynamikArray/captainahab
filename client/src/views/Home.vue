<template>
  <div class="home">
    <h2>Home</h2>
    <router-link :to="{ name: 'About', params: {} }"><h3>About</h3></router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

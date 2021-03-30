<template>
  <div class="home">
    <SearchFormContainer />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchFormContainer from "@/components/SearchFormContainer/SearchFormContainer";

export default {
  name: "Home",
  components: {
    SearchFormContainer,
  },
};
</script>

<template>
  <div class="home">
    <SearchFormContainer />
    <SearchFormResultsContainer />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchFormContainer from "@/components/SearchFormContainer/SearchFormContainer";
import SearchFormResultsContainer from "@/components/SearchFormResults/SearchFormResultsContainer";

export default {
  name: "Home",
  components: {
    SearchFormContainer,
    SearchFormResultsContainer,
  },
};
</script>
<style>
.textShadow {
  text-shadow: 1px 1px 1px #333;
}
</style>

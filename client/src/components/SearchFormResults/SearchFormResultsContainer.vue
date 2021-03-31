<template>
  <div class="d-flex flex-grow-1">
    <SearchFormDatatable :loading="searchLoading" :items="searchResults" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchFormDatatable from "./SearchFormDatatable";
export default {
  name: "SearchFormResultsContainer",
  components: {
    SearchFormDatatable,
  },
  computed: {
    ...mapGetters({
      searchResults: "txs/getTxs",
      searchLoading: "txs/getLoading",
    }),
  },
};
</script>

<style scoped></style>

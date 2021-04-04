<template>
  <div class="d-flex flex-grow-1 align-center">
    <v-data-table
      ref="dataTable"
      :items-per-page="50"
      class="d-flex flex-grow-1"
      :headers="rowHeaders"
      :loading="loading"
      :items="items"
      sortBy="timestamp"
      :sortDesc="true"
      :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100] }"
      hide-default-footer
    ></v-data-table>
  </div>
</template>

<script>
import { rowHeaders } from "./_headers";
export default {
  name: "TrendingDatagrid",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: [Array, Boolean],
      default: false,
    },
  },
  data: () => ({
    rowHeaders,
  }),
};
</script>

<style scoped></style>

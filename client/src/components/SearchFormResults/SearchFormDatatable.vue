<template>
  <div class="d-flex flex-grow-1">
    <v-data-table
      ref="searchFormDatatable"
      class="flex-grow-1"
      :headers="rowHeaders"
      :loading="loading"
      :items="items"
      @update:page="$vuetify.goTo($refs.searchFormDatatable)"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center justify-space-between">
            <!-- PUT sOMETHING HERE AT SOME POINT -->
          </div>
          <div class="d-flex align-center justify-space-between">
            <v-data-footer
              :pagination="pagination"
              :options="options"
              @update:options="updateOptions"
              items-per-page-text="$vuetify.dataTable.itemsPerPageText"
            />
          </div>
        </div>
        <v-divider></v-divider>
      </template>

      <template v-slot:item.timestamp="{ item }">
        <h5 class="textShadow">
          <Timeago :datetime="new Date(item.timestamp * 1000)" />
        </h5>
      </template>

      <template v-slot:item.txAction="{ item }">
        <h4 class="textShadow" :class="buyOrSellColor(item.txAction)">{{ item.txAction }}</h4>
      </template>

      <template v-slot:item.value="{ item }">
        <h3 class="textShadow" :class="`${buyOrSellColor(item.txAction)}--text`">{{ truncateValue(item.value, 4) }}</h3>
      </template>

      <template v-slot:item.tokenMetaData="{ item }">
        <div class="d-flex align-center justify-start">
          <div class="d-flex align-center justify-start">
            <v-img
              class="ma-3 white darken-1"
              style="border-radius: 15px"
              max-height="30"
              max-width="30"
              :src="item.tokenMetaData.logo"
            ></v-img>
          </div>
          <div class="d-flex align-center justify-start">
            <h4 class="textShadow">{{ item.tokenMetaData.name }}</h4>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { rowHeaders } from "./_headers.js";

export default {
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
  methods: {
    truncateValue(value, fixed) {
      return value.toFixed(fixed);
    },
    buyOrSellColor(txActionString) {
      if (txActionString == "Buy") {
        return "green";
      }
      if (txActionString == "Sell") {
        return "red";
      }
    },
  },
};
</script>

<style scoped></style>

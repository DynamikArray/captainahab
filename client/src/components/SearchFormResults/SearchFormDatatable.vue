<template>
  <div class="d-flex flex-grow-1">
    <v-data-table
      ref="searchFormDatatable"
      class="flex-grow-1"
      :headers="rowHeaders"
      :loading="loading"
      :items="items"
      sortBy="timestamp"
      :sortDesc="true"
      :items-per-page="15"
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
        <div class="textShadow">
          <Timeago :datetime="new Date(item.timestamp * 1000)" class="caption" />
        </div>
      </template>

      <template v-slot:item.txAction="{ item }">
        <h4 class="textShadow" :class="buyOrSellColor(item.txAction)">{{ item.txAction }}</h4>
      </template>

      <template v-slot:item.value="{ item }">
        <h3 class="textShadow" :class="`${buyOrSellColor(item.txAction)}--text`">{{ truncateValue(item.value, 4) }}</h3>
      </template>

      <template v-slot:item.tokenMetaData="{ item }">
        <div class="d-flex align-center justify-start flex-grow-1">
          <div class="d-flex align-center justify-start">
            <v-img
              class="ma-3 white darken-1"
              style="border-radius: 15px"
              max-height="30"
              max-width="30"
              :src="item.tokenMetaData.logo"
            ></v-img>
          </div>
          <div class="d-flex align-center justify-start flex-grow-1">
            <h4 class="textShadow">{{ item.tokenMetaData.name }}</h4>
          </div>
        </div>
      </template>

      <template v-slot:item.hash="{ item }">
        {{ item.hash }}
      </template>

      <template v-slot:item.from="{ item }">
        <a :href="linkToEtherscanAddress(item.from)" target="_blank">{{ truncateTextValue(item.from) }}</a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { rowHeaders } from "./_headers.js";
const ETHERSCAN = "https://etherscan.io/";

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
    truncateTextValue(txtValue) {
      const pieces = txtValue.split("");
      const length = pieces.length;
      const beg = [...pieces].splice(0, 5).join("");
      const end = [...pieces].splice(length - 5, length).join("");
      return beg + "...." + end;
    },
    linkToEtherscanAddress(value) {
      return `${ETHERSCAN}/address/${value}`;
    },
    linkToEtherscanTx(value) {
      return `${ETHERSCAN}/tx/${value}`;
    },
  },
};
</script>

<style scoped></style>

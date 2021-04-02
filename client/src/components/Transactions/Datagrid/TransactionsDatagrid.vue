<template>
  <div class="d-flex flex-grow-1">
    <v-data-table
      ref="dataTable"
      :page.sync="pagination.page"
      :items-per-page="25"
      class="flex-grow-1"
      :headers="rowHeaders"
      :loading="loading"
      :items="items"
      sortBy="timestamp"
      :sortDesc="true"
      :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100] }"
      hide-default-footer
    >
      <template v-slot:item.timestamp="{ item }">
        <div class="textShadow">
          <timeago :key="item.hash" :datetime="new Date(item.timestamp * 1000)" class="caption" />
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
          <div class="d-flex flex-column align-start justify-start flex-grow-1">
            <div class="d-flex align-start justify-start flex-grow-1">
              <h3 class="textShadow">{{ item.tokenMetaData.symbol }}</h3>
            </div>
            <div class="d-flex align-start justify-start flex-grow-1">
              <h5 class="textShadow">{{ item.tokenMetaData.name }}</h5>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.hash="{ item }">
        <a class="underlineNone" :href="linkToEtherscanTx(item.hash)" target="_blank">{{ truncateTextValue(item.hash) }}</a>
      </template>

      <template v-slot:item.from="{ item }">
        <a class="underlineNone" :href="linkToEtherscanAddress(item.from)" target="_blank">{{
          truncateTextValue(item.from)
        }}</a>
      </template>

      <template v-slot:top="{}">
        <div class="d-flex flex-grow-1 secondary darken-1 pa-1">
          <div class="d-flex align-start justify-start flex-grow-1">
            <TransactionFilters class="ml-3" />
          </div>
          <div class="d-flex align-center caption">
            <ServerSidePager
              v-if="pager.page > 0"
              :page="pager.page"
              :totalPages="pager.totalPages"
              :totalRecords="pager.totalDocs"
              :pageLimit="pager.limit"
              @pageChange="handlePageChange"
            />
          </div>
        </div>
      </template>

      <template v-slot:footer="{}">
        <div class="d-flex flex-grow-1 secondary darken-1 pa-1">
          <div class="d-flex flex-grow-1"></div>
          <div class="d-flex align-center caption">
            <ServerSidePager
              v-if="pager.page > 0"
              :page="pager.page"
              :totalPages="pager.totalPages"
              :totalRecords="pager.totalDocs"
              :pageLimit="pager.limit"
              @pageChange="handlePageChange"
            />
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { SEARCH_TXS_RESULTS_GOTO_PAGE } from "@/store/actionTypes";
import { rowHeaders } from "./_headers.js";

import ServerSidePager from "@/components/Datatable/Pager/ServerSidePager";
import TransactionFilters from "@/components/Transactions/TransactionFilters";

const ETHERSCAN = "https://etherscan.io";

export default {
  name: "TransactionDataGrid",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    items: {
      type: [Array, Boolean],
      default: false,
    },
    pager: {
      type: [Object, Boolean],
      default: false,
    },
  },
  components: {
    ServerSidePager,
    TransactionFilters,
  },
  data: () => ({
    rowHeaders,
    pagination: {
      descending: true,
      rowsPerPageItems: [10, 20, 50, 100],
    },
  }),
  methods: {
    handlePageChange(page) {
      this.$vuetify.goTo(this.$refs.dataTable);
      this.$store.dispatch(`txs/${SEARCH_TXS_RESULTS_GOTO_PAGE}`, page, { root: true });
    },
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
      const beg = [...pieces].splice(0, 6).join("");
      const end = [...pieces].splice(length - 6, length).join("");
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

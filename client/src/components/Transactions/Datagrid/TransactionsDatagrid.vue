<template>
  <div class="d-flex flex-grow-1 my-5">
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
        <div class="textShadow d-flex flex-column my-1">
          <div class="d-flex align-center justify-start">
            <Timeago
              :key="item.hash"
              :datetime="item.createdAt"
              class="text-caption font-weight-thin mb-1"
              style="line-height: 1.2"
            />
          </div>
          <div class="d-flex align-center justify-start grey--text" style="font-size: 75%">
            {{ new Date(item.createdAt) | dateTime }}
          </div>
        </div>
      </template>

      <template v-slot:item.txAction="{ item }">
        <h4 class="textShadow" :class="buyOrSellColor(item.txAction)">{{ item.txAction }}</h4>
      </template>

      <template v-slot:item.value="{ item }">
        <h3 class="textShadow" :class="`${buyOrSellColor(item.txAction)}--text`">{{ truncateValue(item.value, 4) }}</h3>
      </template>

      <template v-slot:item.tokenMetaData.address="{ item }">
        <TokenChartLink :item="item" />
      </template>

      <template v-slot:item.tokenMetaData="{ item }">
        <TokenNameAndSymbol :item="item" />
      </template>

      <template v-slot:item.tokenPricesData.price="{ item }">
        <TokenPrice :item="item" />
      </template>

      <template v-slot:item.tokenPricesData.market_cap="{ item }">
        <MarketCap :item="item" />
      </template>

      <template v-slot:item.tokenPricesData.1d="{ item }">
        <PeriodPriceData :item="item" dayPeriod="1d" />
      </template>

      <template v-slot:item.tokenPricesData.7d="{ item }">
        <PeriodPriceData :item="item" dayPeriod="7d" />
      </template>

      <template v-slot:item.hash="{ item }">
        <v-btn color="success" :href="linkToEtherscanTx(item.hash)" target="_blank" style="min-width: 32px"
          ><v-icon>fab fa-ethereum</v-icon></v-btn
        >
      </template>

      <template v-slot:item.from="{ item }">
        <v-btn color="primary" :href="linkToEtherscanAddress(item.from)" target="_blank" style="min-width: 32px"
          ><v-icon>fas fa-wallet</v-icon></v-btn
        >
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

import TokenChartLink from "@/components/Datatable/FieldTemplates/TokenChartLink";
import MarketCap from "@/components/Datatable/FieldTemplates/MarketCap";
import TokenNameAndSymbol from "@/components/Datatable/FieldTemplates/TokenNameAndSymbol";
import TokenPrice from "@/components/Datatable/FieldTemplates/TokenPrice";
import PeriodPriceData from "@/components/Datatable/FieldTemplates/PeriodPriceData";

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
    TokenNameAndSymbol,
    TokenChartLink,
    TokenPrice,
    MarketCap,
    PeriodPriceData,
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

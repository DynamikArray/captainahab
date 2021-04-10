<template>
  <div class="d-flex flex-grow-1">
    <v-data-table
      ref="IncomingTxsDatagrid"
      :page.sync="pager.page"
      class="flex-grow-1"
      :headers="rowHeaders"
      :loading="loading"
      :items="items"
      sortBy="timestamp"
      :sortDesc="true"
      hide-default-footer
      :options="{ page: pager.page, itemsPerPage: pager.limit }"
    >
      <template v-slot:item.timestamp="{ item }">
        <TransactionTime :item="item" />
      </template>

      <template v-slot:item.txAction="{ item }">
        <BuyOrSellAction :item="item" />
      </template>

      <template v-slot:item.value="{ item }">
        <TxValue :item="item" />
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
        <HashLink :item="item" />
      </template>

      <template v-slot:item.from="{ item }">
        <WalletLink :item="item" />
      </template>

      <template v-slot:top="{}">
        <div class="d-flex flex-grow-1 secondary darken-1 pa-1">
          <div class="d-flex align-start justify-start flex-grow-1">
            <!--PLACEHOLDER-->
          </div>
          <div class="d-flex align-center caption">
            <ServerSideWithPageOptions
              @limitChange="handleLimitChange"
              @pageChange="handlePageChange"
              v-if="pager.page > 0"
              :page="pager.page"
              :totalPages="pager.totalPages"
              :totalRecords="pager.totalRecords"
              :limit="pager.limit"
            />
          </div>
        </div>
      </template>

      <template v-slot:footer="{}">
        <div class="d-flex flex-grow-1 secondary darken-1 pa-1">
          <div class="d-flex flex-grow-1"><!--PLACEHOLDER--></div>
          <div class="d-flex align-center caption">
            <ServerSideWithPageOptions
              @limitChange="handleLimitChange"
              @pageChange="handlePageChange"
              v-if="pager.page > 0"
              :page="pager.page"
              :totalPages="pager.totalPages"
              :totalRecords="pager.totalRecords"
              :limit="pager.limit"
            />
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { rowHeaders } from "./_headers.js";
import fieldHelpers from "@/components/Datatable/fieldHelpers";

import WalletLink from "@/components/Datatable/FieldTemplates/WalletLink";
import HashLink from "@/components/Datatable/FieldTemplates/HashLink";
import TxValue from "@/components/Datatable/FieldTemplates/TxValue";
import BuyOrSellAction from "@/components/Datatable/FieldTemplates/BuyOrSellAction";
import TransactionTime from "@/components/Datatable/FieldTemplates/TransactionTime";
import TokenChartLink from "@/components/Datatable/FieldTemplates/TokenChartLink";
import MarketCap from "@/components/Datatable/FieldTemplates/MarketCap";
import TokenNameAndSymbol from "@/components/Datatable/FieldTemplates/TokenNameAndSymbol";
import TokenPrice from "@/components/Datatable/FieldTemplates/TokenPrice";
import PeriodPriceData from "@/components/Datatable/FieldTemplates/PeriodPriceData";

import ServerSideWithPageOptions from "@/components/Datatable/Pager/ServerSideWithPageOptions";

export default {
  name: "IncomingTxsDatagrid",
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
  watch: {
    items: function (val) {
      if (val && val.length) {
        this.pager.totalRecords = val.length;
        this.pager.totalPages = Math.ceil(this.pager.totalRecords / this.pager.limit);
      }
    },
  },
  components: {
    WalletLink,
    HashLink,
    TxValue,
    BuyOrSellAction,
    TransactionTime,
    TokenNameAndSymbol,
    TokenChartLink,
    TokenPrice,
    MarketCap,
    PeriodPriceData,

    ServerSideWithPageOptions,
  },
  data: () => ({
    rowHeaders,
    fieldHelpers,
    pager: {
      page: 1,
      totalPages: 0,
      totalRecords: 0,
      limit: 15,
    },
  }),
  methods: {
    handleLimitChange(limit) {
      this.pager.limit = limit;
      this.$vuetify.goTo(this.$refs.IncomingTxsDatagrid);
    },
    handlePageChange(page) {
      this.pager.page = page;
      this.$vuetify.goTo(this.$refs.IncomingTxsDatagrid);
    },
  },
};
</script>

<style scoped></style>

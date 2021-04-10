<template>
  <div class="d-flex flex-grow-1">
    <v-data-table
      ref="dataTable"
      :items-per-page="25"
      class="flex-grow-1"
      :headers="rowHeaders"
      :loading="loading"
      :items="items"
      sortBy="timestamp"
      :sortDesc="true"
      :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100] }"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center justify-space-between"><!--Placeholder --></div>
          <div class="d-flex align-center justify-space-between">
            <v-data-footer
              style="border-width: 0px !important"
              :pagination="pagination"
              :options="{ options }"
              @update:options="updateOptions"
              items-per-page-text="$vuetify.dataTable.itemsPerPageText"
            />
          </div>
        </div>
        <v-divider></v-divider>
      </template>

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
  },
  data: () => ({
    rowHeaders,
    fieldHelpers,
  }),
};
</script>

<style scoped></style>

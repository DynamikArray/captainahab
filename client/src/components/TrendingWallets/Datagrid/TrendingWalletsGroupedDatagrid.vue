<template>
  <div class="d-flex flex-grow-1 align-center">
    <v-data-table
      ref="dataTable"
      :items-per-page="50"
      :headers="rowHeaders"
      :loading="loading"
      :items="items"
      sortBy="timestamp"
      :sortDesc="true"
      :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100] }"
      group-by="tx.from"
      hide-default-footer
    >
      <template v-slot:item.tx.timestamp="{ item }">
        <TransactionTime :item="item.tx" />
      </template>

      <template v-slot:item.tx.txAction="{ item }">
        <BuyOrSellAction :item="item.tx" />
      </template>

      <template v-slot:item.tx.value="{ item }">
        <TxValue :item="item.tx" />
      </template>

      <template v-slot:item.tx.tokenMetaData.address="{ item }">
        <TokenChartLink :item="item.tx" />
      </template>

      <template v-slot:item.tx.tokenMetaData="{ item }">
        <TokenNameAndSymbol :item="item.tx" />
      </template>

      <template v-slot:item.tx.tokenPricesData.price="{ item }">
        <TokenPrice :item="item.tx" />
      </template>

      <template v-slot:item.tx.tokenPricesData.market_cap="{ item }">
        <MarketCap :item="item.tx" />
      </template>

      <template v-slot:item.tx.tokenPricesData.1d="{ item }">
        <PeriodPriceData :item="item.tx" dayPeriod="1d" />
      </template>

      <template v-slot:item.tx.hash="{ item }">
        <HashLink :item="item.tx" />
      </template>

      <template v-slot:item.tx.from="{ item }">
        <WalletLink :item="item.tx" />
      </template>

      <template v-slot:group.header="{ group, items }">
        <td colspan="9">
          <div class="d-flex flex-grow-1 align-center justify-start pa-1">
            <div class="d-flex align-center justify-center">
              <WalletLink :item="items[0].tx" />
            </div>

            <div class="d-flex align-center justify-center ml-10 mr-5">
              <h2>{{ items[0].txsCount }} <span class="subtitle-2">tx's</span></h2>
            </div>

            <div class="d-flex align-center justify-center mx-3">
              <h4>{{ items[0].tx.from }}</h4>
            </div>
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { rowHeaders } from "./_headers";

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
  name: "TrendingWalletsGroupedDatagrid",
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
  }),
};
</script>

<style scoped></style>

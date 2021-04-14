<template>
  <div class="d-flex flex-grow-1 align-center">
    <v-data-table
      ref="dataTable"
      :items-per-page="50"
      :headers="rowHeaders"
      :loading="loading"
      :items="orderedItems"
      :group-by="['rowOrder']"
      :group-desc="['desc']"
      :footer-props="{ itemsPerPageOptions: [10, 25, 50, 100] }"
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
        <td colspan="10">
          <div class="d-flex flex-grow-1 align-center justify-start pa-1">
            <div class="d-flex align-center justify-center ml-0 mr-5">
              <h1 class="textShadow">{{ items[0].txsCount }}<span class="subtitle-2 ml-1">Tx's</span></h1>
            </div>

            <div class="d-flex align-center justify-center mx-3">
              <h2 class="textShadow mt-1">
                <span class="subtitle-2 mr-1">Wallet:</span>{{ fieldHelpers.truncateTextValue(items[0].tx.from, 4) }}
              </h2>
            </div>

            <div class="d-flex align-center justify-center">
              <WalletLink :item="items[0].tx" />
            </div>
          </div>
        </td>
      </template>

      <template v-slot:top="{ pagination, options, updateOptions }">
        <v-data-footer
          next-icon="fa fa-chevron-circle-right"
          prev-icon="fa fa-chevron-circle-left"
          :pagination="pagination"
          :options="options"
          @update:options="updateOptions"
          items-per-page-text="$vuetify.dataTable.itemsPerPageText"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { rowHeaders } from "./_headers";
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

//import ServerSidePager from "@/components/Datatable/Pager/ServerSidePager";

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
    //  ServerSidePager,
  },
  data: () => ({
    rowHeaders,
    fieldHelpers,
  }),
  computed: {
    orderedItems() {
      return [...this.items].sort((a, b) => b.txsCount - a.txsCount);

      //return this.items;
    },
  },
  methods: {
    handlePageChange(page) {
      console.log("handle page change", page);
    },
  },
};
</script>

<style scoped></style>

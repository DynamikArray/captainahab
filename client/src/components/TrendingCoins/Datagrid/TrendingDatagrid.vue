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
    >
      <template v-slot:item.txsCount="{ item }">
        <h2 class="white--text">{{ item.txsCount }}</h2>
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
    </v-data-table>
  </div>
</template>

<script>
import { rowHeaders } from "./_headers";

import TokenNameAndSymbol from "@/components/Datatable/FieldTemplates/TokenNameAndSymbol";
import MarketCap from "@/components/Datatable/FieldTemplates/MarketCap";
import TokenPrice from "@/components/Datatable/FieldTemplates/TokenPrice";
import PeriodPriceData from "@/components/Datatable/FieldTemplates/PeriodPriceData";

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
  components: {
    TokenNameAndSymbol,
    MarketCap,
    TokenPrice,
    PeriodPriceData,
  },
  data: () => ({
    rowHeaders,
  }),
};
</script>

<style scoped></style>

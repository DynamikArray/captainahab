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

import MarketCap from "@/components/Transactions/Datagrid/fieldTemplates/MarketCap";
import TokenPrice from "@/components/Transactions/Datagrid/fieldTemplates/TokenPrice";
import PeriodPriceData from "@/components/Transactions/Datagrid/fieldTemplates/PeriodPriceData";

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

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
              :options="options"
              @update:options="updateOptions"
              items-per-page-text="$vuetify.dataTable.itemsPerPageText"
            />
          </div>
        </div>
        <v-divider></v-divider>
      </template>

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
        <h4 class="textShadow" :class="fieldHelpers.buyOrSellColor(item.txAction)">{{ item.txAction }}</h4>
      </template>

      <template v-slot:item.value="{ item }">
        <h3 class="textShadow" :class="`${fieldHelpers.buyOrSellColor(item.txAction)}--text`">
          {{ fieldHelpers.truncateValue(item.value, 4) }}
        </h3>
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
        <v-btn color="success" :href="fieldHelpers.linkToEtherscanTx(item.hash)" target="_blank" style="min-width: 32px"
          ><v-icon>fab fa-ethereum</v-icon></v-btn
        >
      </template>

      <template v-slot:item.from="{ item }">
        <v-btn color="primary" :href="fieldHelpers.linkToEtherscanAddress(item.from)" target="_blank" style="min-width: 32px"
          ><v-icon>fas fa-wallet</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { rowHeaders } from "./_headers.js";
import fieldHelpers from "@/components/Datatable/fieldHelpers";

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

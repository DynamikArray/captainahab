import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import("./plugins/vueToastr");
import("./plugins/vueSocketIo");

import VueCurrencyFilter from "vue-currency-filter";
Vue.use(VueCurrencyFilter, [
  {
    name: "currency",
    symbol: "$",
    thousandsSeparator: ",",
    fractionCount: 2,
    fractionSeparator: ".",
    avoidEmptyDecimals: "",
  },
  {
    // default name 'currency_2'
    name: "below_one_dollar",
    symbol: "$",
    thousandsSeparator: "",
    fractionCount: 4,
    fractionSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: false,
  },
  {
    // default name 'currency_2'
    name: "volume",
    symbol: "$",
    thousandsSeparator: ",",
    fractionCount: 0,
    fractionSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: true,
  },
]);

import { createDateFilter } from "vue-date-fns";
Vue.filter("date", createDateFilter("MMM dd, yyyy"));
Vue.filter("dateTime", createDateFilter("MMM dd, yyyy hh:mm a"));

import VueTimeago from "vue-timeago";
Vue.use(VueTimeago, {
  name: "Timeago", // Component name, `Timeago` by default
  locale: "en", // Default locale
});

Vue.config.productionTip = false;
const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

store.$app = app;

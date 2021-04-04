import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import("./plugins/vueToastr");

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

import VueTimeago from "vue-timeago";
Vue.use(VueTimeago, {
  name: "Timeago", // Component name, `Timeago` by default
  locale: "en", // Default locale
});

import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
const socket = io(process.env.BASE_URL);
Vue.use(VueSocketIOExt, socket, { store });

Vue.config.productionTip = false;
const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

store.$app = app;

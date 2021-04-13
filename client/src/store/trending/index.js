import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import coins from "./coins";
import wallets from "./wallets";

const trending = {
  namespaced: true,
  modules: {
    coins,
    wallets,
  },
};
export default trending;

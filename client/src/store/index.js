import Vue from "vue";
import Vuex from "vuex";

import api from "./api";
import txs from "./txs";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    api,
    txs,
  },
});

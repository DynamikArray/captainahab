import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { INCOMING_TXS_RESULTS, INCOMING_TXS_RESULTS_LOADING } from "@/store/mutationTypes";

const incoming = {
  namespaced: true,
  state: {
    txLimit: 1000,
    items: [],
    loading: false,
  },
  getters: {
    getLoading: (state) => {
      return state.loading;
    },
    getIncoming: (state) => {
      return state.items;
    },
  },
  mutations: {
    [INCOMING_TXS_RESULTS_LOADING](state, { loading }) {
      state.loading = loading;
    },
    [INCOMING_TXS_RESULTS](state, results) {
      const txList = results.concat(state.items);
      if (txList.length > state.txLimit) {
        state.items = txList.slice(0, state.txLimit);
      } else {
        state.items = txList;
      }
    },
  },
  actions: {
    socket_newTxsAdded({ commit }, { txs }) {
      if (txs.length) commit(`incoming/${INCOMING_TXS_RESULTS}`, txs, { root: true });
    },
  },
};

export default incoming;

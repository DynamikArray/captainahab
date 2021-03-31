import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL, SEARCH_TXS } from "../actionTypes";
import { SEARCH_TXS_RESULTS_LOADING, SEARCH_TXS_RESULTS } from "../mutationTypes";

const txs = {
  namespaced: true,
  state: {
    loading: false,
    items: [],
  },
  getters: {
    getLoading: (state) => {
      return state.loading;
    },
    getTxs: (state) => {
      return state.items;
    },
  },
  mutations: {
    [SEARCH_TXS_RESULTS](state, items) {
      state.items = items;
    },
    [SEARCH_TXS_RESULTS_LOADING](state, { loading }) {
      state.loading = loading;
    },
  },
  actions: {
    async [SEARCH_TXS]({ dispatch, commit }, params) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "get",
          url: "/txs/search",
          params: params,
          loading: `txs/${SEARCH_TXS_RESULTS_LOADING}`,
        },
        { root: true }
      );

      if (result.data) commit(`${SEARCH_TXS_RESULTS}`, result.data);
    },
  },
};

export default txs;

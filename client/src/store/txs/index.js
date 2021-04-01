import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL, SEARCH_TXS, SEARCH_TXS_RESULTS_GOTO_PAGE } from "../actionTypes";
import {
  SEARCH_TXS_RESULTS_LOADING,
  SEARCH_TXS_RESULTS,
  SEARCH_TX_RESULTS_PAGINATION_CHANGE,
  SEARCH_TX_RESULTS_FILTER_UPDATE,
} from "../mutationTypes";

const txs = {
  namespaced: true,
  state: {
    loading: false,
    items: [],
    pager: {
      page: 0,
      limit: 0,
    },
    filters: {
      ethLimit: 20,
    },
  },
  getters: {
    getLoading: (state) => {
      return state.loading;
    },
    getTxs: (state) => {
      return state.items;
    },
    getPager: (state) => {
      return state.pager;
    },
    getFilters: (state) => {
      return state.filters;
    },
    getEthLimit: (state) => {
      return state.filters.ethLimit;
    },
  },
  mutations: {
    [SEARCH_TXS_RESULTS](state, result) {
      state.items = result.docs;
      delete result.docs;
      state.pager = result;
    },
    [SEARCH_TXS_RESULTS_LOADING](state, { loading }) {
      state.loading = loading;
    },
    [SEARCH_TX_RESULTS_PAGINATION_CHANGE](state, page) {
      state.pager.page = page;
    },
    [SEARCH_TX_RESULTS_FILTER_UPDATE](state, filter) {
      console.log("FILTER IS", { ...state.filters, ...filter });
      state.filters = { ...state.filters, ...filter };
    },
  },
  actions: {
    async [SEARCH_TXS_RESULTS_GOTO_PAGE]({ dispatch, commit }, page) {
      commit(`txs/${SEARCH_TX_RESULTS_PAGINATION_CHANGE}`, page, { root: true });

      dispatch(`txs/${SEARCH_TXS}`, {}, { root: true });
    },
    async [SEARCH_TXS]({ state, dispatch, commit }) {
      let params = { ...state.filters };
      if (state.pager.page) {
        params = { ...params, page: state.pager.page, limit: state.pager.limit };
      }

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

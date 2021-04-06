import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL, SEARCH_TXS, SEARCH_TXS_RESULTS_GOTO_PAGE, TOTAL_TXS_GET_COUNT } from "@/store/actionTypes";
import {
  SEARCH_TXS_RESULTS_LOADING,
  SEARCH_TXS_RESULTS,
  SEARCH_TXS_RESULTS_PAGINATION_CHANGE,
  SEARCH_TXS_RESULTS_FILTER_UPDATE,
  NEW_BLOCK_RESULTS,
} from "@/store/mutationTypes";

const txs = {
  namespaced: true,
  state: {
    txsCount: 0,
    blockNumber: 0,
    loading: false,
    items: [],
    pager: {
      page: 0,
      limit: 0,
    },
    filters: {
      minEth: 0.5,
      maxEth: "",
      symbol: "",
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
    getTxsCount: (state) => {
      return state.txsCount;
    },
    getBlockNumber: (state) => {
      return state.blockNumber;
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
    [SEARCH_TXS_RESULTS_PAGINATION_CHANGE](state, page) {
      state.pager.page = page;
    },
    [SEARCH_TXS_RESULTS_FILTER_UPDATE](state, filter) {
      state.filters = { ...state.filters, ...filter };
    },
    [NEW_BLOCK_RESULTS](state, payload) {
      const { txsCount, blockNumber } = payload;
      if (txsCount) state.txsCount = txsCount;
      if (blockNumber) state.blockNumber = blockNumber;
    },
  },
  actions: {
    socket_newBlocksAdded({ commit }, data) {
      console.log("data->", data);
      commit(`txs/${NEW_BLOCK_RESULTS}`, data, { root: true });
    },
    async [SEARCH_TXS_RESULTS_GOTO_PAGE]({ dispatch, commit }, page) {
      commit(`txs/${SEARCH_TXS_RESULTS_PAGINATION_CHANGE}`, page, { root: true });

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
    async [TOTAL_TXS_GET_COUNT]({ dispatch, commit }) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "get",
          url: "/txs/txsCount",
          loading: `txs/${SEARCH_TXS_RESULTS_LOADING}`,
        },
        { root: true }
      );

      if (result.data) commit(`${NEW_BLOCK_RESULTS}`, { ...result.data });
    },
  },
};

export default txs;

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL, TRENDING_WALLETS_SEARCH } from "@/store/actionTypes";
import { TRENDING_WALLETS_RESULTS_LOADING, TRENDING_WALLETS_RESULTS } from "@/store/mutationTypes";

const trending = {
  namespaced: true,
  state: {
    items: [],
    loading: false,
  },
  getters: {
    getLoading: (state) => {
      return state.loading;
    },
    getTrending: (state) => {
      return state.items;
    },
  },
  mutations: {
    [TRENDING_WALLETS_RESULTS_LOADING](state, { loading }) {
      state.loading = loading;
    },
    [TRENDING_WALLETS_RESULTS](state, results) {
      state.items = results;
    },
  },
  actions: {
    async [TRENDING_WALLETS_SEARCH]({ dispatch, commit }) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "get",
          url: "/analytics/trending/wallets",
          loading: `trending/wallets/${TRENDING_WALLETS_RESULTS_LOADING}`,
        },
        { root: true }
      );
      if (result.data) commit(`trending/wallets/${TRENDING_WALLETS_RESULTS}`, result.data, { root: true });
    },
  },
};

export default trending;

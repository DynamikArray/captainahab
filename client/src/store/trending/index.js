import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL, TRENDING_COINS_SEARCH } from "@/store/actionTypes";
import { TRENDING_COINS_RESULTS_LOADING, TRENDING_COINS_RESULTS } from "@/store/mutationTypes";

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
    [TRENDING_COINS_RESULTS_LOADING](state, { loading }) {
      state.loading = loading;
    },
    [TRENDING_COINS_RESULTS](state, results) {
      state.items = results;
    },
  },
  actions: {
    async [TRENDING_COINS_SEARCH]({ dispatch, commit }) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "get",
          url: "/analytics/trending",
          loading: `trending/${TRENDING_COINS_RESULTS_LOADING}`,
        },
        { root: true }
      );

      if (result.data) commit(`trending/${TRENDING_COINS_RESULTS}`, result.data, { root: true });
    },
  },
};

export default trending;

const trendingRoutes = {
  path: "/trending",
  name: "Trending",
  component: () => import(/* webpackChunkName: "Trending" */ "@/views/Trending.vue"),
  children: [
    {
      path: "coins",
      name: "TrendingCoins",
      component: () => import(/* webpackChunkName: "Trending" */ "@/components/TrendingCoins/TrendingCoinsContainer.vue"),
    },
    {
      path: "wallets",
      name: "TrendingWallets",
      component: () =>
        import(/* webpackChunkName: "Trending" */ "@/components/TrendingWallets/TrendingWalletsContainer.vue"),
    },
  ],
};

module.exports = { trendingRoutes };

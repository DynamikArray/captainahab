const trendingRoutes = {
  path: "/trending",
  name: "Trending",
  component: () => import(/* webpackChunkName: "Trending" */ "@/views/Trending.vue"),
};

module.exports = { trendingRoutes };

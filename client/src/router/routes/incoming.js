const incomingRoutes = {
  path: "/incoming",
  name: "Incoming",
  component: () => import(/* webpackChunkName: "Trending" */ "@/views/Incoming.vue"),
};

module.exports = { incomingRoutes };

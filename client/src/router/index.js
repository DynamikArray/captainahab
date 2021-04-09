import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

const { trendingRoutes } = require("./routes/trending");
const { incomingRoutes } = require("./routes/incoming");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  trendingRoutes,
  incomingRoutes,
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;

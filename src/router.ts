import {
  createRouter as createVueRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";

import { defineAsyncComponent } from "vue";
import Loading from "./components/Loading/Loading.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: defineAsyncComponent({
      loader: () => import("./pages/LandingPage.vue"),
      loadingComponent: Loading,
    }),
  },
  {
    path: "/login",
    name: "login",
    component: defineAsyncComponent({
      loader: () => import("./pages/LoginPage.vue"),
      loadingComponent: Loading,
    }),
  },
  {
    path: "/register",
    name: "about",
    component: defineAsyncComponent({
      loader: () => import("./pages/RegisterPage.vue"),
      loadingComponent: Loading,
    }),
  },
  {
    path: "/home",
    name: "list",
    component: defineAsyncComponent({
      loader: () => import("./pages/ListPage.vue"),
      loadingComponent: Loading,
    }),
  },
  {
    path: "/add",
    name: "add",
    component: defineAsyncComponent({
      loader: () => import("./pages/AddPage.vue"),
      loadingComponent: Loading,
    }),
  },
  {
    path: "/setting",
    name: "setting",
    component: defineAsyncComponent({
      loader: () => import("./pages/SettingsPage.vue"),
      loadingComponent: Loading,
    }),
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: defineAsyncComponent({
      loader: () => import("./pages/DetailItemPage.vue"),
      loadingComponent: Loading,
    }),
  },
  {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: defineAsyncComponent({
      loader: () => import("./pages/NotFoundPage.vue"),
      loadingComponent: Loading,
    }),
  },
];

const isServer = typeof window === "undefined";

const createRouter = () =>
  createVueRouter({
    history: isServer ? createMemoryHistory("/") : createWebHistory(),
    routes,
  });
export default createRouter;

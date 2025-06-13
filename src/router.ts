import {
  createRouter as createVueRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";

import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import ListPage from "./pages/ListPage.vue";
import AddPage from "./pages/AddPage.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import DetailItemPage from "./pages/DetailItemPage.vue";
import LandingPage from "./pages/LandingPage.vue";

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "about",
    component: RegisterPage,
  },
  {
    path: "/home",
    name: "list",
    component: ListPage,
  },
  {
    path: "/add",
    name: "add",
    component: AddPage,
  },
  {
    path: "/setting",
    name: "setting",
    component: SettingsPage,
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: DetailItemPage,
  },
];

const isServer = typeof window === "undefined";

const createRouter = () =>
  createVueRouter({
    history: isServer ? createMemoryHistory("/") : createWebHistory(),
    routes,
  });
export default createRouter;

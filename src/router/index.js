import { createRouter, createWebHistory } from "vue-router";
import home from "@/components/home/home.vue";
import cgiAcoes from "@/components/cgiAcoes/cgiAcoes.vue";
import cgiAlert from "@/components/cgiAlert/cgiAlert.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/acoes",
    name: "cgiAcoes",
    component: cgiAcoes,
  },
  {
    path: "/alert",
    name: "cgiAlert",
    component: cgiAlert,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

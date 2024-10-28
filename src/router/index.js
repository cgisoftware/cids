import { createRouter, createWebHistory } from "vue-router";
import home from "@/components/home/home.vue";
import cgiAcoes from "@/components/cgiAcoes/cgiAcoes.vue";
import cgiAlert from "@/components/cgiAlert/cgiAlert.vue";
import cgiBtn from "@/components/cgiBtn/cgiBtn.vue";
import datePicker from "@/components/cgiDatePicker/datePicker.vue";
import diretivas from "@/components/cgiDiretivas/diretivas.vue";
import divider from "@/components/cgiDivider/divider.vue";
import form from "@/components/cgiForm/form.vue";
import imagePicker from "@/components/cgiImagePicker/imagePicker.vue";
import snackbar from "@/components/cgiSnackbar/snackbar.vue";
import timePicker from "@/components/cgiTimePicker/timePicker.vue";
import treeView from "@/components/cgiTreeView/treeView.vue";
import zoom from "@/components/cgiZoom/zoom.vue";
import tabelas from "@/components/tabelas/tabelas.vue";

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
  {
    path: "/botoes",
    name: "cgiBtn",
    component: cgiBtn,
  },
  {
    path: "/date",
    name: "datePicker",
    component: datePicker,
  },
  {
    path: "/diretivas",
    name: "diretivas",
    component: diretivas,
  },
  {
    path: "/divider",
    name: "divider",
    component: divider,
  },
  {
    path: "/form",
    name: "form",
    component: form,
  },
  {
    path: "/image",
    name: "image",
    component: imagePicker,
  },
  {
    path: "/snackbar",
    name: "snackbar",
    component: snackbar,
  },
  {
    path: "/time",
    name: "time",
    component: timePicker,
  },
  {
    path: "/view",
    name: "view",
    component: treeView,
  },
  {
    path: "/zoom",
    name: "zoom",
    component: zoom,
  },
  {
    path: "/tabelas",
    name: "tabelas",
    component: tabelas,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import cids from "cids-cgi/lib";
import router from "./router";
import { vMaska } from "maska";

const opt = {
  theme: {
    dataTable: {
      checkboxColor: "orange darken-2",
      lineColor: "light-blue lighten-5 black--text",
    },
  },
  defaults: {
    dataTable: {
      acoes: "left dot",
    },
  },
};

createApp(App)
  .directive("maska", vMaska)
  .use(router)
  .use(vuetify)
  .use(cids, opt)
  .mount("#app");

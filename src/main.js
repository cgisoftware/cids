import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

// Vuetify
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

// Prism
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";

// Cids
import cids from 'cids-cgi/lib'

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
  .use(router)
  .use(cids, opt)
  .use(vuetify)
  .mount('#app')

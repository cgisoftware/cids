import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'prismjs/themes/prism-coy.css'
import { vMaska } from "maska"

import cids from 'cids-cgi/lib'
import router from './config/router';

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

Vue.use(cids, opt)
Vue.directive("maska", vMaska);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

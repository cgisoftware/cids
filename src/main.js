import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'prismjs/themes/prism-coy.css'


import cids from 'cids-cgi/lib'

const opt = {
  theme: {
    dataTable: {
      checkboxColor: 'orange darken-2',
      lineColor: 'blue'
    }
  }
}

Vue.use(cids, opt)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

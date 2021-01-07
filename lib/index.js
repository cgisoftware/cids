import CgiDatePicker from './components/CgiDatePicker.vue'
import CgiTimePicker from './components/CgiTimePicker.vue'
import CgiDataTable from './components/CgiDataTable.vue'
import CgiSnackbar from './components/CgiSnackbar.vue'

import '@mdi/font/css/materialdesignicons.css'
import { snackbar } from './util'
import VueTheMask from 'ke-the-mask'

window.cgiSnackbar = snackbar

export default {
  install(Vue, options) {
    Vue.component('cgi-date-picker', CgiDatePicker) 
    Vue.component('cgi-time-picker', CgiTimePicker) 
    Vue.component('cgi-data-table', CgiDataTable)
    Vue.component('cgi-snackbar', CgiSnackbar) 

    Vue.use(VueTheMask)
  },

  snackbar: window.cgiSnackbar 
}
import CgiDatePicker from './components/CgiDatePicker.vue'
import CgiTimePicker from './components/CgiTimePicker.vue'
import CgiDataTable from './components/CgiDataTable.vue'
import CgiSnackbar from './components/CgiSnackbar.vue'

import '@mdi/font/css/materialdesignicons.css'
import { snackbar } from './util'

import CgiMaskDirective from './controller/CgiMaskDirective'
import CgiMoneyDirective from './controller/CgiMoneyDirective'

window.cgiSnackbar = snackbar

export default {
  install(Vue) {
    Vue.component('cgi-date-picker', CgiDatePicker)
    Vue.component('cgi-time-picker', CgiTimePicker)
    Vue.component('cgi-data-table', CgiDataTable)
    Vue.component('cgi-snackbar', CgiSnackbar)

    Vue.use(CgiMaskDirective)
    Vue.use(CgiMoneyDirective)
  },

  snackbar: window.cgiSnackbar,
}

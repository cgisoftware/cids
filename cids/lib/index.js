import CgiDatePicker from './components/CgiDatePicker.vue'
import CgiTimePicker from './components/CgiTimePicker.vue'
import CgiDataTable from './components/CgiDataTable.vue'
import CgiSnackbar from './components/CgiSnackbar.vue'
import CgiZoomPicker from './components/CgiZoomPicker.vue'

import '@mdi/font/css/materialdesignicons.css'
import { snackbar } from './util'

import CgiMaskDirective from './controller/CgiMaskDirective'
import CgiMoneyDirective from './controller/CgiMoneyDirective'
import CgiNumberDirective from './controller/CgiNumberDirective'



window.cgiSnackbar = snackbar

export default {
  install(Vue) {
    Vue.component('cgi-date-picker', CgiDatePicker)
    Vue.component('cgi-time-picker', CgiTimePicker)
    Vue.component('cgi-data-table', CgiDataTable)
    Vue.component('cgi-snackbar', CgiSnackbar)
    Vue.component('cgi-zoom-picker', CgiZoomPicker)

    Vue.use(CgiMaskDirective)
    Vue.use(CgiMoneyDirective)
    Vue.use(CgiNumberDirective)
  },
  snackbar: window.cgiSnackbar,
}

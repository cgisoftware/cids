import CgiDatePicker from './components/CgiDatePicker.vue'
import CgiTimePicker from './components/CgiTimePicker.vue'
import CgiDataTable from './components/CgiDataTable.vue'
import CgiSnackbar from './components/CgiSnackbar.vue'
import CgiAlert from './components/CgiAlert.vue'
import CgiZoomPicker from './components/CgiZoomPicker.vue'
import CgiTreeView from './components/CgiTreeView.vue'

import '@mdi/font/css/materialdesignicons.css'
import { alert, snackbar } from './util'

import CgiMaskDirective from './controller/CgiMaskDirective'
import CgiMoneyDirective from './controller/CgiMoneyDirective'
import CgiNumberDirective from './controller/CgiNumberDirective'

const opt = {
  theme: {
    dataTable: {
      checkboxColor: '',
      lineColor: ''
    }
  }
}

export default {
  install(Vue, options = opt) {
    Vue.prototype.cids = options

    Vue.component('cgi-date-picker', CgiDatePicker)
    Vue.component('cgi-time-picker', CgiTimePicker)
    Vue.component('cgi-data-table', CgiDataTable)
    Vue.component('cgi-snackbar', CgiSnackbar)
    Vue.component('cgi-alert', CgiAlert)
    Vue.component('cgi-zoom-picker', CgiZoomPicker)
    Vue.component('cgi-tree-view', CgiTreeView)

    Vue.use(CgiMaskDirective)
    Vue.use(CgiMoneyDirective)
    Vue.use(CgiNumberDirective)
  }
}


window.cgiSnackbar = snackbar
window.cgiAlert = alert
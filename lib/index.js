import CgiDataTable from './components/CgiDataTable.vue'
import CgiSnackbar from './components/CgiSnackbar.vue'
import '@mdi/font/css/materialdesignicons.css'
import { snackbar } from './util'

window.cgiSnackbar = snackbar

export default {
  install(Vue, options) {
    Vue.component('cgi-data-table', CgiDataTable)
    Vue.component('cgi-snackbar', CgiSnackbar) 
  },

  snackbar: window.cgiSnackbar 
}
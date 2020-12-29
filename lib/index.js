import CgiDataTable from './components/CgiDataTable.vue'
import CgiSnackbar from './components/CgiSnackbar.vue'
import CgiSnackbarController from './controller/CgiSnackbar'
import '@mdi/font/css/materialdesignicons.css'

export default new class Cids {
  install(Vue, options) {
    Vue.component('cgi-data-table', CgiDataTable)
    Vue.component('cgi-snackbar', CgiSnackbar)


    window.cgiSnackbar = new CgiSnackbarController()
  }
}
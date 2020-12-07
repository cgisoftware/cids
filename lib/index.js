import CgiDataTable from './components/CgiDataTable.vue'
import '@mdi/font/css/materialdesignicons.css'

export default new class Cids {
  install(Vue, options) {
    Vue.component('cgi-data-table', CgiDataTable)
  }
}

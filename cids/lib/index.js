import CgiDatePicker from './components/CgiDatePicker.vue'
import CgiTimePicker from './components/CgiTimePicker.vue'
import CgiDataTable1 from './components/CGIDataTable1.vue'
import CgiSnackbar from './components/CgiSnackbar.vue'
import CgiAlert from './components/CgiAlert.vue'
import CgiZoomPicker from './components/CgiZoomPicker.vue'
import CgiZoomPad from './components/CgiZoomPad.vue'
import CgiTreeView from './components/CgiTreeView.vue'
import CgiImagePicker from './components/CgiImagePicker.vue'
import CgiForm from './components/CgiForm.vue'
import CgiBtn from './components/CgiBtn.vue'
import CgiAcoes from './components/CgiAcoes.vue'
import CgiDivider from './components/CgiDivider.vue'
import CgiMoney from './components/CgiMoney.vue'

import '@mdi/font/css/materialdesignicons.css'
import { reticencias } from './util'

import CgiMaskDirective from './controller/CgiMaskDirective'
import CgiMoneyDirective from './controller/CgiMoneyDirective'
import CgiNumberDirective from './controller/CgiNumberDirective'
import CgiMaxLengthDirective from './controller/CgiMaxLengthDirective'
import CgiNegativeNumber from './controller/CgiNegativeNumber'
import VueTheMask from 'ke-the-mask'
import money from 'v-money'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

const opt = {
  theme: {
    dataTable: {
      checkboxColor: '',
      lineColor: '',
    },
  },
  defaults: {
    dataTable: {
      acoes: 'right'
    }
  }
}

export default {
  install(Vue, options = opt) {
    Vue.prototype.cids = Object.assign(opt, {
      theme: options.theme,
      reticencias: reticencias,
      defaults: options.defaults
    })

    Vue.use(Vuetify)

    Vue.component('cgi-date-picker', CgiDatePicker)
    Vue.component('cgi-time-picker', CgiTimePicker)
    Vue.component('cgi-data-table', CgiDataTable1)
    Vue.component('cgi-data-table1', CgiDataTable1)
    Vue.component('cgi-snackbar', CgiSnackbar)
    Vue.component('cgi-alert', CgiAlert)
    Vue.component('cgi-zoom-picker', CgiZoomPicker)
    Vue.component('cgi-zoom-pad', CgiZoomPad)
    Vue.component('cgi-tree-view', CgiTreeView)
    Vue.component('cgi-image-picker', CgiImagePicker)
    Vue.component('cgi-form', CgiForm)
    Vue.component('cgi-btn', CgiBtn)
    Vue.component('cgi-acoes', CgiAcoes)
    Vue.component('cgi-divider', CgiDivider)
    Vue.component('cgi-money', CgiMoney)

    Vue.use(CgiMaskDirective)
    Vue.use(CgiMoneyDirective)
    Vue.use(CgiNumberDirective)
    Vue.use(CgiMaxLengthDirective)
    Vue.use(CgiNegativeNumber)

    Vue.use(money, {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
      masked: false
    })

    Vue.use(VueTheMask)
  },
}
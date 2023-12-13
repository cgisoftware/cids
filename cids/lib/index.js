// import CgiDatePicker from './components/CgiDatePicker.vue'
// import CgiTimePicker from './components/CgiTimePicker.vue'
import CgiDataTable1 from './components/CGIDataTable1.vue'
import CgiSnackbar from './components/CgiSnackbar.vue'
import CgiAlert from './components/CgiAlert.vue'
import CgiZoomPicker from './components/CgiZoomPicker.vue'
import CgiZoomPad from './components/CgiZoomPad.vue'
// import CgiTreeView from './components/CgiTreeView.vue'
import CgiImagePicker from './components/CgiImagePicker.vue'
import CgiForm from './components/CgiForm.vue'
import CgiBtn from './components/CgiBtn.vue'
import CgiAcoes from './components/CgiAcoes.vue'
import CgiDivider from './components/CgiDivider.vue'
import CgiMoney from './components/CgiMoney.vue'

import '@mdi/font/css/materialdesignicons.css'
import { formatNumber, reticencias } from './util'

import CgiMaskDirective from './controller/CgiMaskDirective'
import CgiMoneyDirective from './controller/CgiMoneyDirective'
import CgiNumberDirective from './controller/CgiNumberDirective'
import CgiMaxLengthDirective from './controller/CgiMaxLengthDirective'
import CgiNegativeNumber from './controller/CgiNegativeNumber'
import money from 'v-money3'
import { useCids } from './composable/CGICids'

export default {
  install(app, options = opt) {
    app.component('cgi-snackbar', CgiSnackbar)
    app.component('cgi-alert', CgiAlert)
    app.component('cgi-btn', CgiBtn)
    app.component('cgi-acoes', CgiAcoes)
    app.component('cgi-divider', CgiDivider)
    // app.component('cgi-date-picker', CgiDatePicker)
    // app.component('cgi-time-picker', CgiTimePicker)
    app.component('cgi-data-table', CgiDataTable1)
    // app.component('cgi-data-table1', CgiDataTable1)
    app.component('cgi-zoom-picker', CgiZoomPicker)
    app.component('cgi-zoom-pad', CgiZoomPad)
    // app.component('cgi-tree-view', CgiTreeView)
    app.component('cgi-image-picker', CgiImagePicker)
    app.component('cgi-form', CgiForm)
    app.component('cgi-money', CgiMoney)

    app.use(CgiMaskDirective)
      .use(CgiMoneyDirective)
      .use(CgiNumberDirective)
      .use(CgiMaxLengthDirective)
      .use(CgiNegativeNumber)
      .use(money, {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      })
    
    const cids = useCids()

    cids.setTheme(options.theme)
    cids.setDefaults(options.defaults)
  },
}
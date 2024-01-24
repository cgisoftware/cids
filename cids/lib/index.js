import CgiDatePicker from './components/CgiDatePicker.vue'
// import CgiTimePicker from './components/CgiTimePicker.vue'
import CGIDataTableVirtual from './components/CGIDataTableVirtual.vue'
import CGIDataTableServer from './components/CGIDataTableServer.vue'
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
import CgiNumber from './components/CgiNumber.vue'

// import '@mdi/font/css/materialdesignicons.css'

import CgiMaskDirective from './controller/CgiMaskDirective'
import CgiNumberDirective from './controller/CgiNumberDirective'
import CgiMaxLengthDirective from './controller/CgiMaxLengthDirective'
import CgiNegativeNumber from './controller/CgiNegativeNumber'
import { useCids } from './composable/CGICids'

const cids = useCids()

export default {
  install(app, options = opt) {
    app.component('cgi-snackbar', CgiSnackbar)
    app.component('cgi-alert', CgiAlert)
    app.component('cgi-btn', CgiBtn)
    app.component('cgi-acoes', CgiAcoes)
    app.component('cgi-divider', CgiDivider)
    app.component('cgi-date-picker', CgiDatePicker)
    // app.component('cgi-time-picker', CgiTimePicker)
    app.component('cgi-data-table-virtual', CGIDataTableVirtual)
    app.component('cgi-data-table-server', CGIDataTableServer)
    // app.component('cgi-data-table1', CgiDataTable1)
    app.component('cgi-zoom-picker', CgiZoomPicker)
    app.component('cgi-zoom-pad', CgiZoomPad)
    // app.component('cgi-tree-view', CgiTreeView)
    app.component('cgi-image-picker', CgiImagePicker)
    app.component('cgi-form', CgiForm)
    app.component('cgi-number', CgiNumber)

    app.use(CgiMaskDirective)
      .use(CgiNumberDirective)
      .use(CgiMaxLengthDirective)
      .use(CgiNegativeNumber)

    console.log('opt', opt);
    console.log('options', options.defaults);

    cids.setTheme(options.theme)
    cids.setDefaults(options.defaults)
  },
}
import { toExcel, toExcelID } from './controller/handler/ExportXlsx'
import { formatNumber } from './controller/handler/FormatNumber'
import toAblQueryForm from './controller/handler/ToAblQueryForm'
import { toAblDate } from './controller/handler/FormatAblDate'
import CgiSnackbarController from './controller/CgiSnackbar'
import reticencias from './controller/handler/Reticencias'
import CgiAlertController from './controller/CgiAlert'
import { groupBy } from './controller/handler/GroupBy'
import { ablFilter } from './controller/handler/AblRead'
import Vue from 'vue'

const snackbarController = Vue.observable(new CgiSnackbarController());
const alertController = Vue.observable(new CgiAlertController());

const snackbar = new Proxy({}, {
  get(target, prop) {
    return snackbarController[prop]
  }
});

const alert = new Proxy({}, {
  get(target, prop) {
    return alertController[prop]
  }
});

const publisher = window.parent.publisher ?? window.parent.parent.publisher
const subscriber = window.parent.subscriber ?? window.parent.parent.subscriber

export {
  snackbar,
  alert,
  toAblDate,
  formatNumber,
  toExcel,
  groupBy,
  toExcelID,
  reticencias,
  toAblQueryForm,
  ablFilter,
  publisher,
  subscriber
}

import CgiSnackbarController from './controller/CgiSnackbar'

import { toExcel, toExcelID } from './controller/handler/ExportXlsx'
import { toAblDate } from './controller/handler/FormatAblDate'
import { formatNumber } from './controller/handler/FormatNumber'
import { groupBy } from './controller/handler/GroupBy'
import EventBus from './controller/handler/EventBus'
import CgiAlertController from './controller/CgiAlert'
import reticencias from './controller/handler/reticencias'
import toAblQueryForm from './controller/handler/ToAblQueryForm'


const eventBus = new EventBus()
const snackbar = new CgiSnackbarController()
const alert = new CgiAlertController()

export {
  snackbar,
  alert,
  toAblDate,
  formatNumber,
  toExcel,
  groupBy,
  toExcelID,
  eventBus,
  reticencias,
  toAblQueryForm
}

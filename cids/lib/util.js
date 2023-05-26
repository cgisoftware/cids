import { toExcel, toExcelID } from './controller/handler/ExportXlsx'
import { formatNumber } from './controller/handler/FormatNumber'
import toAblQueryForm from './controller/handler/ToAblQueryForm'
import { toAblDate } from './controller/handler/FormatAblDate'
import CgiSnackbarController from './controller/CgiSnackbar'
import reticencias from './controller/handler/Reticencias'
import CgiAlertController from './controller/CgiAlert'
import { groupBy } from './controller/handler/GroupBy'
import { ablFilter } from './controller/handler/AblRead'
import { reactive } from 'vue'

const snackbar = reactive(new CgiSnackbarController())
const alert = reactive(new CgiAlertController())

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
  ablFilter
}

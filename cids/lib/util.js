import { toExcel, toExcelID } from './controller/handler/ExportXlsx'
import { formatNumber } from './controller/handler/FormatNumber'
import toAblQueryForm from './controller/handler/ToAblQueryForm'
import { toAblDate } from './controller/handler/FormatAblDate'
import { useSnackbar } from './composable/CgiSnackbar'
import { useAlert } from './composable/CgiAlert'
import reticencias from './controller/handler/Reticencias'
import { groupBy } from './controller/handler/GroupBy'
import { ablFilter } from './controller/handler/AblRead'
import { debounce } from './controller/handler/Debounce'
import { configEscEvent } from './controller/handler/Esc'

const publisher = window.parent.publisher ?? window.parent.parent.publisher
const subscriber = window.parent.subscriber ?? window.parent.parent.subscriber

export {
  publisher,
  subscriber,
  toAblDate,
  formatNumber,
  toExcel,
  groupBy,
  toExcelID,
  reticencias,
  toAblQueryForm,
  ablFilter,
  useSnackbar,
  useAlert,
  debounce,
  configEscEvent
}

import { createRouter, createWebHistory } from 'vue-router'

import CGIHome from '@/components/home/components/CGIHome.vue'

// Time Picker
import CGITimePickerInfosComponentProps from '@/components/time-picker/CGITimePickerInfosComponentProps.vue';
import CGITimePickerNormal from '@/components/time-picker/CGITimePickerNormal.vue';
import CGITimePickerCompacto from '@/components/time-picker/CGITimePickerCompacto.vue'
import CGITimePickerDisabled from '@/components/time-picker/CGITimePickerDisabled.vue'

// Date Picker
import CGIDatePickerInfosComponentProps from '@/components/date-picker/CGIDatePickerInfosComponentProps.vue';
import CGIDatePickerNormal from '@/components/date-picker/CGIDatePickerNormal.vue';
import CGIDatePickerCompacto from '@/components/date-picker/CGIDatePickerCompacto.vue';
import CGIDatePickerDisabled from '@/components/date-picker/CGIDatePickerDisabled.vue';
import CGIDatePickerTipo from '@/components/date-picker/CGIDatePickerTipo.vue';

// Snackbar
import CGISnackbarInfosComponentProps from '@/components/snackbar/CGISnackbarInfosComponentProps.vue';
import CGISnackbar from '@/components/snackbar/CGISnackbar.vue';

// Alert
import CGIAlertInfosComponentProps from '@/components/alert/CGIAlertInfosComponentProps.vue';
import CGIAlert from '@/components/alert/CGIAlert.vue';

// Directives
import CGIDirectivesMoney from '@/components/directives/CGIDirectiveMoney.vue';
import CGIDirectivesNumber from '@/components/directives/CGIDirectiveNumber.vue';
import CGIDirectivesMaxLength from '@/components/directives/CGIDirectiveMaxLength.vue';
import CGIDirectivesNegativeNumber from '@/components/directives/CGIDirectiveNegativeNumber.vue';
import CGIDirectivesMask from '@/components/directives/CGIDirectiveMask.vue';

// Table
import CGIDataTableInfosComponentProps from '@/components/table/CGIDataTableInfosComponentProps.vue';
import CGIDataTableInfosComponentEvents from '@/components/table/CGIDataTableInfosComponentEvents.vue';
import CGIDataTableInfosComponentSlots from '@/components/table/CGIDataTableInfosComponentSlots.vue';
import CGIDataTableBasica from '@/components/table/CGIDataTableBasica.vue';
import CGIDataTablePaginacao from '@/components/table/CGIDataTablePaginacao.vue';
import CGIDataTablePropriedades from '@/components/table/CGIDataTablePropriedades.vue';
import CGIDataTableAgrupamento from '@/components/table/CGIDataTableAgrupamento.vue';
import CGIDataTableAcoes from '@/components/table/CGIDataTableAcoes.vue';
import CGIDataTableSelecionarVarios from '@/components/table/CGIDataTableSelecionarVarios.vue';
import CGIDataTableSlotsToolbar from '@/components/table/CGIDataTableSlotsToolbar.vue';
import CGIDataTableSemPaginacao from '@/components/table/CGIDataTableSemPaginacao.vue';
import CGIDataTableComPesquisa from '@/components/table/CGIDataTableComPesquisa.vue';

// Botoes
import CGIBotoesSoltos from '@/components/btn/CGIBotoesSoltos.vue'
import CGIBotoesDialog from '@/components/btn/CGIBotoesDialog.vue'
import CGIBotoesTabela from '@/components/btn/CGIBotoesTabela.vue'

// Zoom
import CGIZoomBasico from '@/components/zoom/CGIZoomBasico.vue';
import CGIZoomChange from '@/components/zoom/CGIZoomChange.vue';
import CGIZoomCustom from '@/components/zoom/CGIZoomCustom.vue';

// Tree View
import CGITreeViewInfosComponentProps from '@/components/treeview/CGITreeViewInfosComponentProps.vue';
import CGITreeViewInfosComponentEvents from '@/components/treeview/CGITreeViewInfosComponentEvents.vue';
import CGITreeView from '@/components/treeview/CGITreeView.vue';

import CGIImagePicker from '@/components/image-picker/CGIImagePicker.vue';
import CGIHandler from '@/components/handler/CGIHandler.vue'

const routes = [
  { path: '/', name: 'home', component: CGIHome },
  {
    path: '/cids',
    redirect: { name: 'home' }
  },
  {
    path: '/time-picker', components: {
      default: CGITimePickerInfosComponentProps,
      componenteA: CGITimePickerNormal,
      componenteB: CGITimePickerCompacto,
      componenteC: CGITimePickerDisabled,
    }
  },
  {
    path: '/date-picker', components: {
      default: CGIDatePickerInfosComponentProps,
      componenteA: CGIDatePickerNormal,
      componenteB: CGIDatePickerCompacto,
      componenteC: CGIDatePickerDisabled,
      componenteD: CGIDatePickerTipo,
    }
  },
  {
    path: '/snackbar', components: {
      default: CGISnackbarInfosComponentProps,
      componenteA: CGISnackbar
    }
  },
  {
    path: '/alert', components: {
      default: CGIAlertInfosComponentProps,
      componenteA: CGIAlert
    }
  },
  {
    path: '/directives', components: {
      default: CGIDirectivesMoney,
      componenteA: CGIDirectivesNumber,
      componenteB: CGIDirectivesMaxLength,
      componenteC: CGIDirectivesNegativeNumber,
      componenteD: CGIDirectivesMask
    }
  },
  {
    path: '/table', components: {
      default: CGIDataTableInfosComponentProps,
      componenteA: CGIDataTableInfosComponentEvents,
      componenteB: CGIDataTableInfosComponentSlots,
      componenteC: CGIDataTableBasica,
      componenteD: CGIDataTablePaginacao,
      componenteE: CGIDataTablePropriedades,
      componenteF: CGIDataTableAgrupamento,
      componenteG: CGIDataTableAcoes,
      componenteH: CGIDataTableSelecionarVarios,
      componenteI: CGIDataTableSlotsToolbar,
      componenteJ: CGIDataTableSemPaginacao,
      componenteK: CGIDataTableComPesquisa,
    }
  },
  {
    path: '/zoom', components: {
      default: CGIZoomBasico,
      componenteA: CGIZoomChange,
      componenteB: CGIZoomCustom,
    }
  },
  {
    path: '/tree-view', components: {
      default: CGITreeViewInfosComponentProps,
      componenteA: CGITreeViewInfosComponentEvents,
      componenteB: CGITreeView
    }
  },
  { path: '/image-picker', component: CGIImagePicker },
  {
    path: '/botoes', components: {
      default: CGIBotoesSoltos,
      componenteA: CGIBotoesDialog,
      componenteB: CGIBotoesTabela,
    }
  },
  { path: '/handler', component: CGIHandler },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

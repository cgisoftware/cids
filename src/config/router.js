import Vue from 'vue';
import VueRouter from 'vue-router';

// Time Picker
import CGITimePickerNormal from '../components/time-picker/CGITimePickerNormal.vue';
import CGITimePickerCompacto from '../components/time-picker/CGITimePickerCompacto.vue'
import CGITimePickerDisabled from '../components/time-picker/CGITimePickerDisabled.vue'

// Date Picker
import CGIDatePickerNormal from '../components/date-picker/CGIDatePickerNormal.vue';
import CGIDatePickerCompacto from '../components/date-picker/CGIDatePickerCompacto.vue';
import CGIDatePickerDisabled from '../components/date-picker/CGIDatePickerDisabled.vue';
import CGIDatePickerTipo from '../components/date-picker/CGIDatePickerTipo.vue';


import CGISnackbar from '../components/snackbar/Snackbar.vue';
import CGIAlert from '../components/alert/Alert.vue';

// Directives
import CGIDirectivesMoney from '../components/directives/Money.vue';
import CGIDirectivesNumber from '../components/directives/Number.vue';
import CGIDirectivesMaxLength from '../components/directives/MaxLength.vue';
import CGIDirectivesNegativeNumber from '../components/directives/NegativeNumber.vue';

// Table
import CGIDataTableBasica from '../components/table/CGIDataTableBasica.vue';
import CGIDataTablePaginacao from '../components/table/CGIDataTablePaginacao.vue';
import CGIDataTablePropriedades from '../components/table/CGIDataTablePropriedades.vue';
import CGIDataTableAgrupamento from '../components/table/CGIDataTableAgrupamento.vue';
import CGIDataTableAcoes from '../components/table/CGIDataTableAcoes.vue';
import CGIDataTableSelecionarVarios from '../components/table/CGIDataTableSelecionarVarios.vue';
import CGIDataTableSlotsToolbar from '../components/table/CGIDataTableSlotsToolbar.vue';
import CGIDataTableSemPaginacao from '../components/table/CGIDataTableSemPaginacao.vue';
import CGIDataTableComPesquisa from '../components/table/CGIDataTableComPesquisa.vue';

// Zoom
import CGIZoomBasico from '../components/zoom/ZoomBasico.vue';
import CGIZoomChange from '../components/zoom/ZoomChange.vue';
import CGIZoomCustom from '../components/zoom/ZoomCustom.vue';

import CGITreeView from '../components/treeview/CGITreeView.vue';
import CGIImagePicker from '../components/image-picker/CGIImagePicker.vue';
import CGIForm from '../components/form/CGIForm.vue';

// Botoes
import CGIBotoesSoltos from '../components/btn/CGIBotoesSoltos.vue'
import CGIBotoesDialog from '../components/btn/CGIBotoesDialog.vue'
import CGIBotoesTabela from '../components/btn/CGIBotoesTabela.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/time-picker', components: {
      default: CGITimePickerNormal,
      componenteA: CGITimePickerCompacto,
      componenteB: CGITimePickerDisabled,
    }
  },
  {
    path: '/date-picker', components: {
      default: CGIDatePickerNormal,
      componenteA: CGIDatePickerCompacto,
      componenteB: CGIDatePickerDisabled,
      componenteC: CGIDatePickerTipo,
    }
  },
  { path: '/snackbar', component: CGISnackbar },
  { path: '/alert', component: CGIAlert },
  {
    path: '/directives', components: {
      default: CGIDirectivesMoney,
      componenteA: CGIDirectivesNumber,
      componenteB: CGIDirectivesMaxLength,
      componenteC: CGIDirectivesNegativeNumber
    }
  },
  {
    path: '/table', components: {
      default: CGIDataTableBasica,
      componenteA: CGIDataTablePaginacao,
      componenteB: CGIDataTablePropriedades,
      componenteC: CGIDataTableAgrupamento,
      componenteD: CGIDataTableAcoes,
      componenteE: CGIDataTableSelecionarVarios,
      componenteF: CGIDataTableSlotsToolbar,
      componenteG: CGIDataTableSemPaginacao,
      componenteH: CGIDataTableComPesquisa,
    }
  },
  {
    path: '/zoom', components: {
      default: CGIZoomBasico,
      componenteA: CGIZoomChange,
      componenteB: CGIZoomCustom,
    }
  },
  { path: '/tree-view', component: CGITreeView },
  { path: '/image-picker', component: CGIImagePicker },
  { path: '/form', component: CGIForm },
  {
    path: '/botoes', components: {
      default: CGIBotoesSoltos,
      componenteA: CGIBotoesDialog,
      componenteB: CGIBotoesTabela,
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;

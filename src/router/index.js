import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/home/components/CGIHome.vue'

// Snackbar
import CGISnackbarInfosComponentProps from '@/components/snackbar/CGISnackbarInfosComponentProps.vue';
import CGISnackbar from '@/components/snackbar/CGISnackbar.vue';

// Alert
import CGIAlertInfosComponentProps from '@/components/alert/CGIAlertInfosComponentProps.vue';
import CGIAlert from '@/components/alert/CGIAlert.vue';

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

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cids',
    redirect: { name: 'home' }
  },
  {
    path: '/snackbar',
    name: 'snackbar',
    components: {
      default: CGISnackbarInfosComponentProps,
      componenteA: CGISnackbar
    }
  },
  {
    path: '/alert',
    name: 'alert',
    components: {
      default: CGIAlertInfosComponentProps,
      componenteA: CGIAlert
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
    path: '/botoes', components: {
      default: CGIBotoesSoltos,
      componenteA: CGIBotoesDialog,
      componenteB: CGIBotoesTabela,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

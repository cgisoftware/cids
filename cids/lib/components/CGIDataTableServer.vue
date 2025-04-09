<template>
  <v-data-table-server
    v-model="selected"
    v-model:page="currentPage"
    v-model:items-per-page="currentItemsPerPage"
    v-model:sort-by="currentSortBy"
    v-model:group-by="currentGroupBy"
    :headers="colunasVisiveis"
    :items-length="totalItens"
    :items="props.linhas"
    :loading="carregar ? 'primary' : null"
    :height="altura"
    :fixed-header="colunasFixas"
    :search="pesquisa"
    :items-per-page-options="[
      { value: 30, title: '30' },
      { value: 60, title: '60' },
      { value: 100, title: '100' },
    ]"
    :show-select="showSelect"
    :row-props="habilitaLinhaSelecionada"
    :hide-default-footer="!mostraPaginacao"
    :mobile="isMobile"
    @click:row="rowClick"
    density="compact"
    multi-sort
    hover
  >
    <template v-slot:top>
      <CGIDataTableHeader
        :mostra-pesquisa="mostraPesquisa"
        :mostra-toolbar="mostraToolbar"
        :nome-programa="nomePrograma"
        :nome-tabela="nomeTabela"
        :habilita-agrupamento="habilitaAgrupamento"
        :informacoes-da-pesquisa="informacoesDaPesquisa"
        :carregar="carregar"
        v-model:colunas-visiveis="colunasVisiveis"
        v-model:colunas-invisiveis="colunasInvisiveis"
        v-model:pesquisa="pesquisa"
        @salvar-propriedades="salvarPropriedades"
        @update:agrupamento="atualizaAgrupamento"
        @cancelar-zoom="cancelarZoom"
        :mostra-propriedades="mostraPropriedades"
        :zoom-dialog="zoomDialog"
        :agrupamento="currentGroupBy"
      >
        <template v-slot:pesquisa>
          <slot name="pesquisa"></slot>
        </template>

        <template v-slot:botoes>
          <slot name="botoes"></slot>
        </template>
      </CGIDataTableHeader>
    </template>

    <template v-slot:[`item.acoes`]="{ item, index }">
      <v-menu
        v-if="cids.cidsState?.defaults?.dataTable?.acoes === 'left dot'"
        eager
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-dots-vertical"
            variant="text"
            :color="isDarkTheme ? 'orange' : 'primary'"
            @click="selecionarLinhaAntesDeAbrirMenu(item)"
          >
          </v-btn>
        </template>

        <v-card>
          <v-card-text class="px-0">
            <div class="font-weight-bold mb-5 px-4">
              Ações principais do registro
            </div>

            <div class="d-flex justify-space-between align-center px-4">
              <div
                v-for="opcao in opcoesDeAcao"
                :key="opcao.icone"
                v-show="opcao.mostrar"
              >
                <v-tooltip location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      x-small
                      :icon="opcao.icone"
                      :color="opcao.cor"
                      v-bind="props"
                      variant="text"
                      @click="opcao.acao(item, index)"
                    >
                    </v-btn>
                  </template>
                  <span>{{ opcao.descricao }}</span>
                </v-tooltip>
              </div>
            </div>

            <div v-if="temOutrasAcoes">
              <v-divider class="my-2" />

              <div class="font-weight-bold mb-5 px-4">
                Demais ações do registro
              </div>

              <div class="px-4">
                <slot v-bind:item="item" name="outras-acoes" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>

      <div
        style="min-width: 150px"
        v-if="
          cids.cidsState?.defaults?.dataTable?.acoes === 'right' ||
          cids.cidsState?.defaults?.dataTable?.acoes === 'left'
        "
      >
        <v-tooltip
          location="top"
          v-for="opcao in opcoesDeAcao"
          :key="opcao.icone"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-show="opcao.mostrar"
              :icon="opcao.icone"
              :color="opcao.cor"
              v-bind="props"
              variant="text"
              @click="opcao.acao(item, index)"
            >
            </v-btn>
          </template>
          <span>{{ opcao.descricao }}</span>
        </v-tooltip>
      </div>
    </template>

    <template
      v-for="(header, index) in customHeaders"
      v-slot:[`item.${header.key}`]="{ item }"
    >
      <div :key="index" v-if="header.formater">
        {{ header.formater(item[header.key]) }}
      </div>
      <slot v-else :name="header.key" v-bind:item="item"> </slot>
    </template>

    <template v-slot:expanded-row="{ columns, item }">
      <slot name="expanded-row" v-bind:item="item" v-bind:columns="columns">
      </slot>
    </template>

    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
      <template
        :ref="
          () => {
            groupHeaders[item.value] = { item, toggleGroup, isGroupOpen }
          }
        "
      />

      <tr class="group-header-row">
        <td :colspan="columns.length" class="table-group-header">
          <v-icon @click="toggleGroup(item)">
            {{ isGroupOpen(item) ? 'mdi-minus' : 'mdi-plus' }}
          </v-icon>

          {{
            item.key.charAt(0).toUpperCase() +
            item.key.split('_').join(' ').slice(1)
          }}: {{ item.value }}
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>

<script setup>
import CGIDataTableHeader from './CGIDataTableHeader.vue'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  useSlots,
  ref,
  watch,
  toRaw,
  nextTick,
} from 'vue'
import { useCids } from '../composable/CGICids'
import { useTheme, useDisplay } from 'vuetify'
import debounce from 'lodash/debounce'

const props = defineProps({
  copiar: { type: Boolean, default: () => false },
  alterar: { type: Boolean, default: () => false },
  deletar: { type: Boolean, default: () => false },
  zoomDialog: { type: Boolean, default: () => false },
  mostraAcoes: { type: Boolean, default: () => false },
  mostraDetalhes: { type: Boolean, default: () => false },
  mostraToolbar: { type: Boolean, default: () => true },
  mostraPesquisa: { type: Boolean, default: () => false },
  nomeTabela: { type: String, default: () => null },
  nomePrograma: { type: String, default: () => null },
  informacoesDaPesquisa: { type: String, default: () => null },
  altura: { type: String, default: () => '100vh' },
  colunasFixas: { type: Boolean, default: () => true },
  mostraPaginacao: { type: Boolean, default: () => true },
  totalItens: { type: Number, default: () => 100 },
  carregar: { type: Boolean, default: () => false },
  multipleSort: { type: Boolean, default: () => false },
  showActions: { type: Boolean, default: () => false },
  colunas: { type: Array, default: () => [] },
  linhas: { type: Array, default: () => [] },
  showSelect: { type: Boolean, default: () => false },
  showQr: { type: Boolean, default: () => false },
  showDetails: { type: Boolean, default: () => false },
  showDelete: { type: Boolean, default: () => true },
  showUpdate: { type: Boolean, default: () => true },
  showClipboard: { type: Boolean, default: () => false },
  showPrinter: { type: Boolean, default: () => false },
  propriedades: { type: Array, default: () => [] },
  paginacao: { type: Object, default: () => ({}) },
  habilitaAgrupamento: { type: Boolean, default: () => false },
  mostraPropriedades: { type: Boolean, default: () => false },
  mostraLinhaSelecionada: { type: Boolean, default: () => false },
  chaveTabela: { type: String, default: () => 'seq' },
})

const emit = defineEmits([
  'paginando',
  'salvar-propriedades',
  'ver-detalhes',
  'copiar-item',
  'alterar-item',
  'deletar-item',
  'exporta-zoom',
  'cancelar-zoom',
  'linha-selecionada',
])

const defaultPaginacao = {
  page: 1,
  itemsPerPage: 30,
  sortBy: [],
  sortDesc: [],
  groupBy: [],
  groupDesc: [],
  multiSort: false,
  mustSort: false,
}

const theme = useTheme()
const display = useDisplay()

const isDarkTheme = computed(() => {
  return theme.global.current.value.dark
})
const isMobile = computed(() => {
  return display.smAndDown.value
})

const cids = useCids()
const slots = useSlots()

const isInitialLoad = ref(true)
const propertiesLoaded = ref(false)
const selected = ref([])
const totalItens = ref(props.totalItens)
const previousTotalItens = ref(0)
const colunas = ref(props.colunas)
const pesquisa = ref(null)
const colunasVisiveis = ref([])
const colunasInvisiveis = ref([])
const paginacaoInterna = ref(
  props.paginacao ? { ...props.paginacao } : { ...defaultPaginacao },
)
const groupHeaders = ref({})
const linhaSelecionada = ref(null)
const opcoesDeAcao = ref([
  {
    nome: 'Visualizar',
    icone: 'mdi-eye',
    cor: 'green',
    descricao: 'Visualizar registro',
    acao: (item, index) => {
      emit('ver-detalhes', { ...item, index })
    },
    mostrar: props.mostraDetalhes,
  },
  {
    nome: 'Copiar',
    icone: 'mdi-content-copy',
    cor: 'green',
    descricao: 'Copiar registro',
    acao: (item, index) => {
      emit('copiar-item', { ...item, index })
    },
    mostrar: props.copiar,
  },
  {
    nome: 'Alterar',
    icone: 'mdi-pencil',
    cor: 'blue',
    descricao: 'Alterar registro',
    acao: (item, index) => {
      emit('alterar-item', { ...item, index })
    },
    mostrar: props.alterar,
  },
  {
    nome: 'Excluir',
    icone: 'mdi-delete',
    cor: 'red',
    descricao: 'Excluir registro',
    acao: (item, index) => {
      emit('deletar-item', { ...item, index })
    },
    mostrar: props.deletar,
  },
  {
    nome: 'Exportar registro',
    icone: 'mdi-arrow-down',
    cor: 'orange',
    descricao: 'Exportar registro',
    acao: (item, index) => {
      emit('exporta-zoom', { ...item, index })
    },
    mostrar: props.zoomDialog,
  },
])

const atualizaAgrupamento = (agrupamento) => {
  paginacaoInterna.value.groupBy = []

  if (agrupamento) {
    paginacaoInterna.value.groupBy.push({ key: agrupamento })

    nextTick(() => abreAgrupamento())
  }
}

const cancelarZoom = () => {
  emit('cancelar-zoom')
}

const rowClick = (_, row) => {
  if (props.carregar) return

  linhaSelecionada.value = structuredClone(toRaw(row.item))
  emit('linha-selecionada', row.item)
}

const selecionarLinhaAntesDeAbrirMenu = (item) => {
  linhaSelecionada.value = structuredClone(toRaw(item))
}

const habilitaLinhaSelecionada = ({ item }) => {
  if (props.mostraLinhaSelecionada && linhaSelecionada.value) {
    if (linhaSelecionada.value[props.chaveTabela] === item[props.chaveTabela]) {
      return {
        class: cids?.theme?.dataTable?.lineColor ?? 'linha-selecionada',
      }
    }
  }

  if (item.rowProps) {
    return { ...item.rowProps }
  }
}

const salvarPropriedades = (params) => {
  const pagination = toRaw(paginacaoInterna.value)
  const propriedades = {
    colunas: params.colunas.map((coluna) => ({ ...toRaw(coluna) })),
    paginacao: pagination,
  }

  emit('salvar-propriedades', propriedades)

  nextTick(() => abreAgrupamento())
}

const abreAgrupamento = async () => {
  if (!Object.keys(groupHeaders.value).length) return

  Object.values(groupHeaders.value).forEach((groupHeader) => {
    if (groupHeader.isGroupOpen(groupHeader.item)) return

    groupHeader.toggleGroup(groupHeader.item)
  })
}

const organizaColunas = () => {
  colunasVisiveis.value = []
  colunasInvisiveis.value = []
  const colunasAux = [...props.colunas]
  const propriedadesAux = structuredClone(toRaw(props.propriedades))

  propriedadesAux.forEach((propriedade) => {
    const coluna = colunasAux.filter((coluna) => {
      const col = coluna.key ?? coluna.value
      const prop = propriedade.key ?? propriedade.value

      return col === prop
    })

    if (coluna.length > 0) Object.assign(propriedade, coluna[0])
  })

  colunasVisiveis.value =
    propriedadesAux.length > 0 ? propriedadesAux : colunasAux

  if (propriedadesAux.length) {
    colunasInvisiveis.value = colunasAux.filter(
      (coluna) =>
        !propriedadesAux.some((propriedade) => {
          const prop = propriedade.key ?? propriedade.value
          const col = coluna.key ?? coluna.value

          return prop === col
        }),
    )
  }

  if (props.mostraAcoes) {
    if (cids.cidsState?.defaults?.dataTable?.acoes === 'right') {
      colunasVisiveis.value.push({
        title: 'Ações',
        align: 'end',
        sortable: false,
        hidden: false,
        key: 'acoes',
        width: '150',
      })
      return
    }

    if (cids.cidsState?.defaults?.dataTable?.acoes === 'left dot') {
      colunasVisiveis.value.unshift({
        title: 'Ações',
        align: 'center',
        sortable: false,
        hidden: false,
        key: 'acoes',
        width: '15',
      })
    }

    if (cids.cidsState?.defaults?.dataTable?.acoes === 'left') {
      colunasVisiveis.value.unshift({
        title: 'Ações',
        align: 'start',
        sortable: false,
        hidden: false,
        key: 'acoes',
        width: '150',
      })
    }
  }

  if (
    colunasVisiveis.value.findIndex(
      (item) => item.key === 'data-table-group',
    ) === -1
  ) {
    colunasVisiveis.value.unshift({
      title: '',
      key: 'data-table-group',
      align: ' d-none',
    })
  }

  colunasVisiveis.value = colunasVisiveis.value.map((coluna) => {
    return {
      ...coluna,
      title: coluna.text ?? coluna.title,
      key: coluna.value ?? coluna.key,
    }
  })

  colunasInvisiveis.value = colunasInvisiveis.value.map((coluna) => {
    return {
      ...coluna,
      title: coluna.text ?? coluna.title,
      key: coluna.value ?? coluna.key,
    }
  })
}

const emitPaginationUpdate = debounce(() => {
  const paginacao = {
    ...defaultPaginacao,
    ...paginacaoInterna.value,
  }

  emit('paginando', paginacao)
}, 0)

const currentPage = computed({
  get: () => paginacaoInterna.value.page || 1,
  set: (value) => {
    paginacaoInterna.value = {
      ...defaultPaginacao,
      ...paginacaoInterna.value,
      page: value,
    }
    emitPaginationUpdate()
  },
})

const currentItemsPerPage = computed({
  get: () => paginacaoInterna.value.itemsPerPage || 30,
  set: (value) => {
    paginacaoInterna.value = {
      ...defaultPaginacao,
      ...paginacaoInterna.value,
      itemsPerPage: value,
    }
    emitPaginationUpdate()
  },
})

const currentSortBy = computed({
  get: () => {
    return (
      paginacaoInterna.value?.sortBy?.map((value, index) => ({
        key: value,
        order: paginacaoInterna.value.sortDesc[index] ? 'desc' : 'asc',
      })) || []
    )
  },
  set: (value) => {
    paginacaoInterna.value = {
      ...defaultPaginacao,
      ...paginacaoInterna.value,
      sortBy: value.filter((v) => v.key).map((v) => v.key),
      sortDesc: value.map((v) => v.order === 'desc'),
    }
    emitPaginationUpdate()
  },
})

const currentGroupBy = computed({

  get: () => {
    return paginacaoInterna.value?.groupBy?.map(item => ({
      key: item?.key ?? item
    })) || []
  },
  set: (value) => {
    paginacaoInterna.value = {
      ...defaultPaginacao,
      ...paginacaoInterna.value,
      groupBy: value,
    }
    emitPaginationUpdate()
  },
})

const customHeaders = computed(() => {
  return colunas.value.filter((header) => header.custom)
})

const temOutrasAcoes = computed(() => {
  return !!slots['outras-acoes']
})

if (
  props.showActions &&
  !colunas.value.some((value) => value.key === 'actions')
) {
  colunas.value.push({
    title: 'Ações',
    key: 'actions',
    align: 'end',
    sortable: false,
  })
}

watch(
  () => props.paginacao,
  (value) => {
    if (!value) return
    paginacaoInterna.value = { ...value }
  },
  { deep: true },
)

watch(
  () => props.propriedades,
  () => {
    if (isInitialLoad.value) {
      isInitialLoad.value = false
      return
    }

    if (!propertiesLoaded.value) {
      propertiesLoaded.value = true
      organizaColunas()
      emitPaginationUpdate()
    }
  },
  { immediate: true },
)

watch(
  () => props.propriedades,
  () => organizaColunas(),
)

watch(
  () => props.totalItens,
  (newValue) => {
    totalItens.value = newValue
  },
)

watch(
  () => props.mostraDetalhes,
  (value) => {
    const acao = opcoesDeAcao.value.filter(
      (opcao) => opcao.nome === 'Visualizar',
    )

    acao[0].mostrar = value
  },
)

watch(
  () => props.copiar,
  (value) => {
    const acao = opcoesDeAcao.value.filter((opcao) => opcao.nome === 'Copiar')

    acao[0].mostrar = value
  },
)

watch(
  () => props.alterar,
  (value) => {
    const acao = opcoesDeAcao.value.filter((opcao) => opcao.nome === 'Alterar')

    acao[0].mostrar = value
  },
)

watch(
  () => props.deletar,
  (value) => {
    const acao = opcoesDeAcao.value.filter((opcao) => opcao.nome === 'Excluir')

    acao[0].mostrar = value
  },
)

watch(
  () => props.zoomDialog,
  (value) => {
    const acao = opcoesDeAcao.value.filter(
      (opcao) => opcao.nome === 'Exportar registro',
    )

    acao[0].mostrar = value
  },
)

watch(
  () => props.totalItens,
  (_, oldValue) => {
    previousTotalItens.value = oldValue
  },
)

watch(
  () => paginacaoInterna.value.search,
  (currValue, oldValue) => {
    if (currValue !== oldValue && !currValue) {
      pesquisa.value = null
    }
  },
)

watch(
  () => pesquisa.value,
  (value) => {
    paginacaoInterna.value = {
      ...paginacaoInterna.value,
      search: value,
    }
    emitPaginationUpdate()
  },
)

watch(
  () => props.linhas,
  () => {
    nextTick(() => abreAgrupamento())
  },
)

onMounted(() => {
  organizaColunas()

  if (!props.mostraPropriedades) {
    emitPaginationUpdate()
  }
})

onBeforeUnmount(() => {
  emitPaginationUpdate.cancel()
})
</script>

<style>
.linha-selecionada {
  background-color: #e3f2fd !important;
  color: #000 !important;
}

.group-header-row {
  background-color: rgb(var(--v-theme-surface-light)) !important;
}

.table-group-header {
  font-weight: 700;
  font-size: 12px;
  white-space: nowrap;
}
</style>

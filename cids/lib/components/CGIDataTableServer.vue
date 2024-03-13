<template>
  <v-data-table-server
    :headers="colunasVisiveis"
    :items-length="totalItens"
    :items="props.linhas"
    :loading="carregar"
    :height="altura"
    :fixed-header="colunasFixas"
    :search="pesquisa"
    :group-by="groupBy"
    :sort-by="sortBy"
    :items-per-page-options="[
      { value: 30, title: '30' },
      { value: 60, title: '60' },
      { value: 100, title: '100' },
    ]"
    :show-select="showSelect"
    :row-props="habilitaLinhaSelecionada"
    density="compact"
    multi-sort
    hover
    @update:options="updateOptions"
    @click:row="rowClick"
    v-model:items-per-page="itensPorPagina"
    v-model="selected"
  >
    <template v-slot:top>
      <CGIDataTableHeader
        :mostra-pesquisa="mostraPesquisa"
        :mostra-toolbar="mostraToolbar"
        :nome-programa="nomePrograma"
        :nome-tabela="nomeTabela"
        :habilita-agrupamento="habilitaAgrupamento"
        :informacoes-da-pesquisa="informacoesDaPesquisa"
        v-model:colunas-visiveis="colunasVisiveis"
        v-model:colunas-invisiveis="colunasInvisiveis"
        v-model:pesquisa="pesquisa"
        @salvar-propriedades="salvarPropriedades"
        @update:agrupamento="atualizaAgrupamento"
        @cancelar-zoom="cancelarZoom"
        :mostra-propriedades="mostraPropriedades"
        :zoom-dialog="zoomDialog"
      >
        <template v-slot:pesquisa>
          <slot name="pesquisa"></slot>
        </template>

        <template v-slot:botoes>
          <slot name="botoes"></slot>
        </template>
      </CGIDataTableHeader>
    </template>

    <template v-slot:[`item.acoes`]="{ item }">
      <v-menu v-if="cids.cidsState?.defaults?.dataTable?.acoes === 'left dot'">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-dots-vertical"
            variant="text"
            :color="isDarkTheme ? 'orange' : 'primary'"
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
                v-for="(opcao, index) in opcoesDeAcao"
                :key="index"
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
                      @click="opcao.acao(item)"
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
          v-for="(opcao, index) in opcoesDeAcao"
          :key="index"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-show="opcao.mostrar"
              :icon="opcao.icone"
              :color="opcao.cor"
              v-bind="props"
              variant="text"
              @click="opcao.acao(item)"
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

    <template v-slot:group-header="{ isGroupOpen, toggleGroup, item, columns }">
      <th colspan="90">
        <v-icon @click="toggleGroup"
          >{{ isGroupOpen ? "mdi-minus" : "mdi-plus" }}
        </v-icon>
        {{
          columns[0][0].toUpperCase() +
          columns[0].split("_").join(" ").slice(1)
        }}: {{ item.value }}
      </th>
    </template>
  </v-data-table-server>
</template>

<script setup>
import CGIDataTableHeader from "./CGIDataTableHeader.vue";
import { computed, onMounted, useSlots, ref, watch, toRaw } from "vue";
import { useCids } from "../composable/CGICids";
import { useTheme } from "vuetify";

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
  altura: { type: String, default: () => "100vh" },
  colunasFixas: { type: Boolean, default: () => true },
  itensPorPagina: { type: Number, default: () => 30 },
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
  habilitaAgrupamento: { type: Boolean, default: () => false },
  mostraPropriedades: { type: Boolean, default: () => false },
  mostraLinhaSelecionada: { type: Boolean, default: () => false },
  chaveTabela: { type: String, default: () => "seq" },
});

const emit = defineEmits([
  "paginando",
  "salvar-propriedades",
  "ver-detalhes",
  "copiar-item",
  "alterar-item",
  "deletar-item",
  "exporta-zoom",
  "cancelar-zoom",
  "linha-selecionada",
]);

const theme = useTheme();

const isDarkTheme = computed(() => {
  return theme.global.current.value.dark;
});

const cids = useCids();
const slots = useSlots();

const pesquisa = ref(null);
const colunasVisiveis = ref([]);
const colunasInvisiveis = ref([]);
const paginacao = ref({});
const linhaSelecionada = ref(null);
const opcoesDeAcao = ref([
  {
    nome: "Visualizar",
    icone: "mdi-eye",
    cor: "green",
    descricao: "Visualizar registro",
    acao: (item) => {
      emit("ver-detalhes", item);
    },
    mostrar: props.mostraDetalhes,
  },
  {
    nome: "Copiar",
    icone: "mdi-content-copy",
    cor: "green",
    descricao: "Copiar registro",
    acao: (item) => {
      emit("copiar-item", item);
    },
    mostrar: props.copiar,
  },
  {
    nome: "Alterar",
    icone: "mdi-pencil",
    cor: "blue",
    descricao: "Alterar registro",
    acao: (item) => {
      emit("alterar-item", item);
    },
    mostrar: props.alterar,
  },
  {
    nome: "Excluir",
    icone: "mdi-delete",
    cor: "red",
    descricao: "Excluir registro",
    acao: (item) => {
      emit("deletar-item", item);
    },
    mostrar: props.deletar,
  },
  {
    nome: "Exportar registro",
    icone: "mdi-arrow-down",
    cor: "orange",
    descricao: "Exportar registro",
    acao: (item) => {
      emit("exporta-zoom", item);
    },
    mostrar: props.zoomDialog,
  },
]);

const updateOptions = (options) => {
  const pagination = JSON.parse(JSON.stringify(options));
  pagination.sortBy = options.sortBy
    .filter((value) => value.key)
    .map((value) => value.key);
  pagination["sortDesc"] = options.sortBy.map(
    (value) => value.order === "desc"
  );
  paginacao.value = pagination;
  emit("paginando", pagination);
};

const atualizaAgrupamento = (agrupamento) => {
  paginacao.value.groupBy = [];
  if (agrupamento) {
    paginacao.value.groupBy.push({ key: agrupamento });
  }
};

const cancelarZoom = () => {
  emit("cancelar-zoom");
};

const editItem = (item) => {
  emit("on:edit", item);
};

const showQrCode = (item) => {
  emit("on:qr", item);
};

const getDetails = (item) => {
  emit("on:details", item);
};

const getClipboard = (item) => {
  emit("on:clipboard", item);
};

const deleteItem = (item) => {
  emit("on:delete", item);
};

const printer = (item) => {
  emit("on:printer", item);
};

const rowClick = (_, row) => {
  linhaSelecionada.value = structuredClone(toRaw(row.item));
  emit("linha-selecionada", row.item);
};

const habilitaLinhaSelecionada = ({ item }) => {
  if (props.mostraLinhaSelecionada && linhaSelecionada.value) {
    if (linhaSelecionada.value[props.chaveTabela] === item[props.chaveTabela]) {
      return {
        class: cids?.theme?.dataTable?.lineColor ?? "linha-selecionada",
      };
    }
  }

  if (item.rowProps) {
    return { ...item.rowProps };
  }
};

const salvarPropriedades = (params) => {
  const pagination = toRaw(paginacao.value);
  const propriedades = {
    colunas: params.colunas.map((coluna) => ({ ...toRaw(coluna) })),
    paginacao: pagination,
  };

  emit("salvar-propriedades", propriedades);
};

const organizaColunas = () => {
  colunasVisiveis.value = [];
  colunasInvisiveis.value = [];
  const colunasAux = [...props.colunas];
  const propriedadesAux = structuredClone(toRaw(props.propriedades));

  propriedadesAux.forEach((propriedade) => {
    const coluna = colunasAux.filter(
      (coluna) =>
        coluna.key === propriedade.key || coluna.value === propriedade.value
    );

    if (coluna.length > 0) Object.assign(propriedade, coluna[0]);
  });

  colunasVisiveis.value =
    propriedadesAux.length > 0 ? propriedadesAux : colunasAux;

  if (propriedadesAux.length) {
    colunasInvisiveis.value = colunasAux.filter(
      (coluna) =>
        !propriedadesAux.some(
          (propriedade) =>
            propriedade.key === coluna.key || propriedade.value === coluna.value
        )
    );
  }

  if (props.mostraAcoes) {
    if (cids.cidsState?.defaults?.dataTable?.acoes === "right") {
      colunasVisiveis.value.push({
        title: "Ações",
        align: "end",
        sortable: false,
        hidden: false,
        key: "acoes",
        width: "150",
      });
      return;
    }

    if (cids.cidsState?.defaults?.dataTable?.acoes === "left dot") {
      colunasVisiveis.value.unshift({
        title: "Ações",
        align: "center",
        sortable: false,
        hidden: false,
        key: "acoes",
        width: "15",
      });
    }

    if (cids.cidsState?.defaults?.dataTable?.acoes === "left") {
      colunasVisiveis.unshift({
        title: "Ações",
        align: "start",
        sortable: false,
        hidden: false,
        key: "acoes",
        width: "150",
      });
    }
  }

  colunasVisiveis.value = colunasVisiveis.value.map((coluna) => {
    return {
      ...coluna,
      title: coluna.text ?? coluna.title,
      key: coluna.value ?? coluna.key,
    };
  });

  colunasInvisiveis.value = colunasInvisiveis.value.map((coluna) => {
    return {
      ...coluna,
      title: coluna.text ?? coluna.title,
      key: coluna.value ?? coluna.key,
    };
  });
};

const customHeaders = computed(() => {
  return colunas.value.filter((header) => header.custom);
});

const sortBy = computed(() => {
  return paginacao.value?.sortBy?.map((value, index) => ({
    key: value,
    order: paginacao.value.sortDesc[index] ? "desc" : "asc",
  }));
});

const groupBy = computed(() => {
  return paginacao.value.groupBy;
});

const temOutrasAcoes = computed(() => {
  return !!slots["outras-acoes"];
});

const selected = ref([]);
const totalItens = ref(props.totalItens);
const itensPorPagina = ref(props.itensPorPagina);
const colunas = ref(props.colunas);

if (
  props.showActions &&
  !colunas.value.some((value) => value.key === "actions")
) {
  colunas.value.push({
    title: "Ações",
    key: "actions",
    align: "end",
    sortable: false,
  });
}

watch(
  () => props.totalItens,
  (newValue) => {
    totalItens.value = newValue;
  }
);

watch(
  () => props.propriedades,
  () => organizaColunas()
);

watch(
  () => props.zoomDialog,
  (newValue) => {
    const acao = opcoesDeAcao.value.filter(
      (opcao) => opcao.nome === "Exportar registro"
    );

    acao[0].mostrar = newValue;
  }
);

onMounted(() => {
  organizaColunas();
});
</script>

<style>
.linha-selecionada {
  background-color: #e3f2fd !important;
  color: #000 !important;
}
</style>

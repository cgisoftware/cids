<template>
  <v-data-table-virtual
    :headers="colunasVisiveis"
    :items="props.linhas"
    :loading="carregar ? 'primary' : null"
    :height="altura"
    :search="pesquisa"
    :group-by="groupBy"
    :sort-by="sortBy"
    :show-select="showSelect"
    :row-props="habilitaLinhaSelecionada"
    :mobile="isMobile"
    :fixed-header="colunasFixas"
    @click:row="rowClick"
    @update:options="updateOptions"
    v-model="selected"
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
        :agrupamento="groupBy"
        :itens-agrupamento="itensAgrupamento"
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

    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
      <tr class="group-header-row">
        <td :colspan="columns.length" class="table-group-header">
          <v-icon @click="toggleGroup(item)">
            {{ isGroupOpen(item) ? "mdi-minus" : "mdi-plus" }}
          </v-icon>

          {{
            item.key.charAt(0).toUpperCase() +
            item.key.split("_").join(" ").slice(1)
          }}: {{ item.value }}
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script setup>
import { computed, onMounted, useSlots, ref, watch, toRaw } from "vue";
import { useTheme, useDisplay } from "vuetify";
import { useCids } from "../composable/CGICids";

import CGIDataTableHeader from "./CGIDataTableHeader.vue";

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
  carregar: { type: Boolean, default: () => false },
  multipleSort: { type: Boolean, default: () => false },
  showActions: { type: Boolean, default: () => false },
  colunas: { type: Array, default: () => [] },
  linhas: { type: Array, default: () => [] },
  showSelect: { type: Boolean, default: () => false },
  propriedades: { type: Array, default: () => [] },
  paginacao: { type: Object, default: () => {} },
  habilitaAgrupamento: { type: Boolean, default: () => false },
  mostraPropriedades: { type: Boolean, default: () => false },
  mostraLinhaSelecionada: { type: Boolean, default: () => false },
  chaveTabela: { type: String, default: () => "seq" },
});

const emit = defineEmits([
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
const display = useDisplay();

const isDarkTheme = computed(() => {
  return theme.global.current.value.dark;
});
const isMobile = computed(() => {
  return display.smAndDown.value;
});

const cids = useCids();
const slots = useSlots();

const pesquisa = ref(null);
const colunasVisiveis = ref([]);
const colunasInvisiveis = ref([]);
const linhaSelecionada = ref(null);
const colunas = ref(props.colunas);
const itensAgrupamento = ref([]);
const paginacao = ref({});
const selected = ref([]);
const opcoesDeAcao = ref([
  {
    nome: "Visualizar",
    icone: "mdi-eye",
    cor: "green",
    descricao: "Visualizar registro",
    acao: (item, index) => {
      emit("ver-detalhes", { ...item, index });
    },
    mostrar: props.mostraDetalhes,
  },
  {
    nome: "Copiar",
    icone: "mdi-content-copy",
    cor: "green",
    descricao: "Copiar registro",
    acao: (item, index) => {
      emit("copiar-item", { ...item, index });
    },
    mostrar: props.copiar,
  },
  {
    nome: "Alterar",
    icone: "mdi-pencil",
    cor: "blue",
    descricao: "Alterar registro",
    acao: (item, index) => {
      emit("alterar-item", { ...item, index });
    },
    mostrar: props.alterar,
  },
  {
    nome: "Excluir",
    icone: "mdi-delete",
    cor: "red",
    descricao: "Excluir registro",
    acao: (item, index) => {
      emit("deletar-item", { ...item, index });
    },
    mostrar: props.deletar,
  },
  {
    nome: "Exportar registro",
    icone: "mdi-arrow-down",
    cor: "orange",
    descricao: "Exportar registro",
    acao: (item, index) => {
      emit("exporta-zoom", { ...item, index });
    },
    mostrar: props.zoomDialog,
  },
]);

const temOutrasAcoes = computed(() => {
  return !!slots["outras-acoes"];
});

const sortBy = computed(() => {
  return paginacao.value?.sortBy?.map((value, index) => ({
    key: value,
    order: paginacao.value.sortDesc[index] ? "desc" : "asc",
  }));
});

const groupBy = computed(() => {
  return paginacao.value.groupBy ?? [];
});

const customHeaders = computed(() => {
  return colunas.value.filter((header) => header.custom);
});

const updateOptions = (options) => {
  const pagination = JSON.parse(JSON.stringify(options));
  pagination.sortBy = options.sortBy
    .filter((value) => value.key)
    .map((value) => value.key);
  pagination["sortDesc"] = options.sortBy.map(
    (value) => value.order === "desc"
  );
  paginacao.value = pagination;
};

const organizaColunas = () => {
  colunasVisiveis.value = [];
  colunasInvisiveis.value = [];
  const colunasAux = [...props.colunas];
  const propriedadesAux = structuredClone(toRaw(props.propriedades));
  const agrupamento = groupBy.value?.[0]?.key ?? null;

  propriedadesAux.forEach((propriedade) => {
    const coluna = colunasAux.filter((coluna) => {
      const col = coluna.key ?? coluna.value;
      const prop = propriedade.key ?? propriedade.value;

      return col === prop;
    });

    if (coluna.length > 0) Object.assign(propriedade, coluna[0]);
  });

  colunasVisiveis.value =
    propriedadesAux.length > 0 ? propriedadesAux : colunasAux;

  if (propriedadesAux.length) {
    colunasInvisiveis.value = colunasAux.filter(
      (coluna) =>
        !propriedadesAux.some((propriedade) => {
          const prop = propriedade.key ?? propriedade.value;
          const col = coluna.key ?? coluna.value;

          return prop === col;
        })
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
      colunasVisiveis.value.unshift({
        title: "Ações",
        align: "start",
        sortable: false,
        hidden: false,
        key: "acoes",
        width: "150",
      });
    }
  }

  if (
    colunasVisiveis.value.findIndex(
      (item) => item.key === "data-table-group"
    ) === -1
  ) {
    colunasVisiveis.value.unshift({
      title: "",
      key: "data-table-group",
      align: " d-none",
    });
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

  itensAgrupamento.value = structuredClone(toRaw(colunasVisiveis.value));

  colunasVisiveis.value = colunasVisiveis.value.filter(
    (item) => item.key !== agrupamento
  );
};

const rowClick = (_, row) => {
  if (props.carregar) return;

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

const atualizaAgrupamento = (agrupamento) => {
  paginacao.value.groupBy = [];
  if (agrupamento) {
    paginacao.value.groupBy.push({ key: agrupamento });
  }
};

const cancelarZoom = () => {
  emit("cancelar-zoom");
};

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

watch(groupBy, () => {
  organizaColunas();
});

watch(
  () => props.propriedades,
  () => organizaColunas()
);

watch(
  () => props.paginacao,
  () => {
    paginacao.value = props.paginacao ?? {
      page: 1,
      itemsPerPage: 30,
      sortBy: [],
      sortDesc: [],
      groupBy: [],
      groupDesc: [],
      multiSort: false,
      mustSort: false,
    };
  }
);

watch(
  () => props.mostraDetalhes,
  (value) => {
    const acao = opcoesDeAcao.value.filter(
      (opcao) => opcao.nome === "Visualizar"
    );

    acao[0].mostrar = value;
  }
);

watch(
  () => props.copiar,
  (value) => {
    const acao = opcoesDeAcao.value.filter((opcao) => opcao.nome === "Copiar");

    acao[0].mostrar = value;
  }
);

watch(
  () => props.alterar,
  (value) => {
    const acao = opcoesDeAcao.value.filter((opcao) => opcao.nome === "Alterar");

    acao[0].mostrar = value;
  }
);

watch(
  () => props.deletar,
  (value) => {
    const acao = opcoesDeAcao.value.filter((opcao) => opcao.nome === "Excluir");

    acao[0].mostrar = value;
  }
);

watch(
  () => props.zoomDialog,
  (value) => {
    const acao = opcoesDeAcao.value.filter(
      (opcao) => opcao.nome === "Exportar registro"
    );

    acao[0].mostrar = value;
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

.group-header-row {
  background-color: rgb(var(--v-theme-surface-light)) !important;
}

.table-group-header {
  font-weight: 700;
  font-size: 12px;
  white-space: nowrap;
}
</style>

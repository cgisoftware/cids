<template>
  <v-toolbar flat dense v-if="mostraToolbar" color="transparent" class="pt-4">
    <v-toolbar-title>
      <div class="d-flex flex-column">
        <div>
          {{ nomeTabela }}
        </div>
        <div style="font-size: 8px">
          {{ nomePrograma }}
        </div>
      </div>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field
      style="max-width: 300px"
      class="mt-6"
      variant="filled"
      label="Pesquisar..."
      color="primary"
      v-model="pesquisaInterna"
      v-if="mostraPesquisa"
    >
      <template v-slot:prepend-inner v-if="informacoesDaPesquisa">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-information-variant</v-icon>
          </template>
          <span>{{ informacoesDaPesquisa }}</span>
        </v-tooltip>
      </template>
    </v-text-field>

    <slot name="pesquisa"> </slot>

    <div class="ml-3 mr-3">
      <slot name="botoes"> </slot>
    </div>

    <v-menu
      v-model="menuDePropriedadesDaColuna"
      :close-on-click="false"
      :close-on-content-click="false"
      :nudge-width="400"
      offset-x
    >
      <template v-slot:activator="{ props }">
        <v-btn
          icon="mdi-dots-vertical"
          v-if="mostraPropriedades"
          @click="salvarPropriedades"
          v-bind="props"
        >
        </v-btn>
      </template>

      <v-card min-width="400">
        <v-toolbar color="transparent">
          <v-toolbar-title>Organizar tabela</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="px-0" style="overflow-y: scroll; height: 300px">
          <v-autocomplete
            v-if="habilitaAgrupamento"
            dense
            density="compact"
            class="mt-4 px-3"
            :items="colunasVisiveisInterna"
            item-text="title"
            item-value="key"
            @update:modelValue="emit('update:agrupamento', $event)"
            label="Agrupar por"
            clearable
            v-model="agrupamento"
          ></v-autocomplete>
          <v-container fluid grid-list-md>
            <v-row>
              <v-col cols="6">
                Colunas na tela
                <draggable
                  animation="160"
                  :list="colunasVisiveisInterna"
                  item-key="key"
                >
                  <template v-slot:item="{ element: coluna }">
                    <div
                      :key="coluna.text"
                      v-show="
                        coluna.key !== 'acoes' && coluna.key !== 'tb_detalhe'
                      "
                      class="text-center my-1"
                    >
                      <v-chip
                        v-if="!coluna.actions"
                        style="width: 100%"
                        size="small"
                        label
                      >
                        <template v-slot:default>
                          {{ coluna.title }}

                          <v-icon
                            small
                            @click="removeColunaDaTela(coluna)"
                            style="
                              position: absolute;
                              right: 10px;
                              cursor: pointer;
                            "
                          >
                            mdi-close
                          </v-icon>
                        </template>
                      </v-chip>
                    </div>
                  </template>
                </draggable>
              </v-col>
              <v-col cols="6">
                Colunas disponíveis
                <div
                  v-show="coluna.key !== 'acoes' && coluna.key !== 'tb_detalhe'"
                  v-for="(coluna, id) in colunasInvisiveis"
                  :key="id"
                  class="text-center my-1"
                >
                  <v-chip
                    v-if="!coluna.actions"
                    style="width: 100%"
                    size="small"
                    label
                  >
                    <template v-slot:default>
                      {{ coluna.title }}

                      <v-icon
                        small
                        @click="adicionaColunaNaTela(coluna)"
                        style="position: absolute; right: 10px; cursor: pointer"
                      >
                        mdi-plus
                      </v-icon>
                    </template>
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <cgi-btn
            cancelar
            @click="menuDePropriedadesDaColuna = false"
          ></cgi-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-btn icon v-if="mostraPropriedades" @click="salvarPropriedades">
      <v-icon small>mdi-content-save</v-icon>
    </v-btn>
    <v-btn icon v-if="zoomDialog" @click="emit('cancelar-zoom')">
      <v-icon small>mdi-close</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup>
import { ref, toRef, toRefs, watch } from "vue";
import { debounce } from "../util";
import draggable from "vuedraggable";

const props = defineProps({
  mostraToolbar: { type: Boolean, default: () => true },
  mostraPesquisa: { type: Boolean, default: () => true },
  mostraPropriedades: { type: Boolean, default: () => true },
  nomeTabela: { type: String, default: () => null },
  nomePrograma: { type: String, default: () => null },
  informacoesDaPesquisa: { type: String, default: () => null },
  habilitaAgrupamento: { type: Boolean, default: () => false },
  colunasVisiveis: { type: Array, default: () => [] },
  colunasInvisiveis: { type: Array, default: () => [] },
  zoomDialog: { type: Boolean, default: () => false },
  pesquisa: { type: String, default: () => null },
});

const emit = defineEmits([
  "update:pesquisa",
  "update:colunasVisiveis",
  "update:colunasInvisiveis",
  "salvar-propriedades",
  "update:agrupamento",
  "cancelar-zoom",
]);

const pesquisaInterna = ref(props.pesquisa);
const colunasVisiveisInterna = toRef(props.colunasVisiveis);
const colunasInvisiveisInterna = ref(props.colunasInvisiveis);
const agrupamento = ref(null);

const menuDePropriedadesDaColuna = ref(false);

const updateSearch = async () => {
  emit("update:pesquisa", pesquisaInterna.value);
};

const debounceSearch = debounce(updateSearch, 500);

watch(pesquisaInterna, () => {
  debounceSearch();
});

watch(colunasVisiveisInterna, () => {
  emit("update:colunasVisiveis", colunasVisiveisInterna.value);
});

watch(colunasInvisiveisInterna, () => {
  emit("update:colunasInvisiveis", colunasInvisiveisInterna.value);
});

watch(
  () => props.colunasVisiveis,
  () => {
    colunasVisiveisInterna.value = props.colunasVisiveis;
  }
);

watch(
  () => props.colunasInvisiveis,
  () => {
    colunasInvisiveisInterna.value = props.colunasInvisiveis;
  }
);

const salvarPropriedades = () => {
  emit("salvar-propriedades", {
    colunas: colunasVisiveisInterna.value.filter(
      (item) => item.key !== "tb_detalhe" && item.key !== "acoes"
    ),
  });
  menuDePropriedadesDaColuna.value = false;
};

const adicionaColunaNaTela = (coluna) => {
  colunasInvisiveisInterna.value = colunasInvisiveisInterna.value.filter(
    (colunaInvisivel) => colunaInvisivel.key != coluna.key
  );
  colunasVisiveisInterna.value.push(coluna);
};

const removeColunaDaTela = (coluna) => {
  colunasVisiveisInterna.value = colunasVisiveisInterna.value.filter(
    (colunaVisivel) => colunaVisivel.key != coluna.key
  );
  colunasInvisiveisInterna.value.push(coluna);
};
</script>

<template>
  <v-data-table
    :hide-default-footer="!mostraPaginacao"
    :disable-pagination="!mostraPaginacao"
    :hide-default-header="!mostraColunas"
    :multi-sort="ordenarVarios"
    :fixed-header="colunasFixas"
    :headers="visibleColumns"
    :options.sync="options"
    :group-by="agruparPor"
    :sort-by="ordenarPor"
    :search="!paginacaoServidor ? search : null"
    :items="linhas"
    dense
    :item-class="rowClass"
    @click:row="clickRow"
    :show-select="selecionarVarios"
    :item-key="chaveTabela"
    :height="altura"
  >
    <template v-slot:top>
      <v-toolbar
        flat
        dense
      >

        <v-toolbar-title>{{nomeTabela}}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-text-field
          style="max-width: 300px"
          class="mt-8"
          filled
          single-line
          dense
          label="Pesquisar..."
          color="primary"
          v-model="search"
        >

        </v-text-field>

        <v-menu
          v-model="menu"
          :close-on-click="false"
          :close-on-content-click="false"
          :nudge-width="400"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mt-2 ml-4"
              v-if="mostraPropriedades"
              text
              v-bind="attrs"
              v-on="on"
            >
              mdi-dots-vertical
            </v-icon>
          </template>

          <v-card>
            <v-toolbar
              flat
              dense
            >
              <v-toolbar-title>Organizar tabela</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="px-0">
              <v-container
                fluid
                grid-list-md
              >
                <v-layout>
                  <v-flex xs6>
                    Colunas na tela
                    <draggable v-model="cols">
                      <div
                        v-for="(coluna, id) in visibleColumns"
                        :key="id"
                        class="text-center my-1"
                      >
                        <v-chip
                          v-if="!coluna.actions"
                          style="width: 100%;"
                          small
                          label
                        >
                          <template v-slot:default>
                            {{coluna.text}}

                            <v-icon
                              small
                              @click="coluna.hidden = true"
                              style="position: absolute; right: 10px; cursor: pointer;"
                            >mdi-close</v-icon>
                          </template>
                        </v-chip>
                      </div>
                    </draggable>
                  </v-flex>
                  <v-flex xs6>
                    Colunas para usar
                    <draggable v-model="hiddenColumns">
                      <div
                        v-for="(coluna, id) in hiddenColumns"
                        :key="id"
                        class="text-center my-1"
                      >
                        <v-chip
                          v-if="!coluna.actions"
                          style="width: 100%;"
                          small
                          label
                        >
                          <template v-slot:default>
                            {{coluna.text}}

                            <v-icon
                              small
                              @click="coluna.hidden = false"
                              style="position: absolute; right: 10px; cursor: pointer;"
                            >mdi-plus</v-icon>
                          </template>
                        </v-chip>
                      </div>
                    </draggable>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn
                small
                color="red"
                outlined
                @click="menu = false"
              >
                <v-icon
                  small
                  left
                >mdi-close</v-icon>Fechar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                small
                color="primary"
                outlined
                @click="salvarPropriedades"
              >
                <v-icon
                  small
                  left
                >mdi-content-save</v-icon> Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-toolbar>
    </template>

    <template v-slot:[`item.data-table-select`]="{ isSelected, select }">
      <v-checkbox
        hide-details
        class="mt-0"
        color="orange"
        :value="isSelected"
        @change="select($event)"
      ></v-checkbox>
    </template>

    <template v-slot:[`group.header`]="{ isOpen, toggle, group, groupBy }">
      <th colspan="12">
        <v-icon @click="toggle">{{ isOpen ? "mdi-minus" : "mdi-plus" }}
        </v-icon>
        {{
                    groupBy[0][0].toUpperCase() +
                      groupBy[0]
                        .split("_")
                        .join(" ")
                        .slice(1)
                  }}: {{ group }}
      </th>
    </template>

    <template
      v-if="mostraAcoes"
      v-slot:[`item.acoes`]="{item}"
    >
      <v-icon
        small
        @click="clickEdit(item)"
        :color="selectedLine ? item[chaveTabela] == selectedLine[chaveTabela] ? 'white' : 'blue' : 'blue'"
        class="px-1"
      >mdi-pencil</v-icon>
      <v-icon
        @click="clickDel(item)"
        small
        :color="selectedLine ? item[chaveTabela] == selectedLine[chaveTabela] ? 'white' : 'red': 'red'"
        class="px-1"
      >mdi-delete</v-icon>
    </template>

    <template
      v-for="(f) in customColumns"
      v-slot:[`item.${f.value}`]="{ item }"
    >

      <slot
        :name="f.value"
        v-bind:item="item"
      >
      </slot>
    </template>

  </v-data-table>
</template>

<script>
import moment from "moment";
import { VDataTable } from "vuetify/lib";
import draggable from "vuedraggable";
export default {
  data: (vm) => ({
    menu: false,
    cols: vm.colunas,
    options: {},
    search: vm.pesquisa,
    selectedLine: null,
  }),
  computed: {
    hiddenColumns() {
      return this.cols.filter((coluna) => coluna.hidden);
    },
    visibleColumns() {
      const cols = this.cols.filter((coluna) => !coluna.hidden);

      // const index = cols.map((item) => item.value).indexOf("acoes");
      // if (index > -1) {
      //   const acoes = cols.splice(index, 1);
      //   cols.push(acoes[0]);
      // }

      if (this.mostraAcoes) {
        cols.push({
          text: "Ações",
          align: "end",
          sortable: false,
          hidden: false,
          custom: true,
          value: "acoes",
        });
      }

      return cols;
    },
    customColumns() {
      return this.cols.filter((coluna) => coluna?.custom ?? false);
    },
  },
  watch: {
    options() {
      if (this.paginacaoServidor) {
        this.options["search"] = this.search;
        this.$emit("paginando", this.options);
      }
    },
    search() {
      if (this.paginacaoServidor) {
        this.options["search"] = this.search;
        this.$emit("paginando", this.options);
      }
    },
  },
  components: {
    VDataTable,
    draggable,
  },
  methods: {
    salvarPropriedades() {
      this.$emit("click-salvar-propriedades", [
        ...this.visibleColumns,
        ...this.hiddenColumns,
      ]);
      this.menu = false;
    },
    rowClass(item) {
      if (this.mostraLinhaSelecionada) {
        if (this.selectedLine) {
          if (this.selectedLine[this.chaveTabela] == item[this.chaveTabela]) {
            return "primary white--text";
          }
        }
      }
    },
    clickRow(item) {
      this.selectedLine = item;
      this.$emit("linha-selecionada", item);
    },
    clickEdit(item) {
      this.$emit("alterar-item", item);
    },
    clickDel(item) {
      this.$emit("deletar-item", item);
    },
  },
  props: {
    colunas: {
      type: Array,
      default: () => undefined,
      required: true
    },
    linhas: {
      type: Array,
      default: () => undefined,
      required: true
    },
    "mostra-propriedades": {
      type: Boolean,
      default: () => false,
    },
    "mostra-colunas": {
      type: Boolean,
      default: () => true,
    },
    "mostra-paginacao": {
      type: Boolean,
      default: () => true,
    },
    "colunas-fixas": {
      type: Boolean,
      default: () => true,
    },
    "mostra-agrupador": {
      type: Boolean,
      default: () => false,
    },
    "agrupar-por": {
      type: Array,
      default: () => [],
    },
    "ordenadar-varios": {
      type: Boolean,
      default: () => true,
    },
    "ordenar-por": {
      type: Array,
      default: () => [],
    },
    pesquisa: {
      type: String,
      default: () => null,
    },
    "paginacao-servidor": {
      type: Boolean,
      default: () => false,
    },
    "chave-tabela": {
      type: String,
      default: () => "seq",
    },
    "mostra-linha-selecionada": {
      type: Boolean,
      default: () => false,
    },
    "selecionar-varios": {
      type: Boolean,
      default: () => false,
    },
    "mostra-acoes": {
      type: Boolean,
      default: () => false,
    },
    "nome-tabela": {
      type: String,
      default: () => '',
    },
    "altura": {
      type: String,
      default: () => '100vh',
    },
  },
};
</script>

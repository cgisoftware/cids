<template>
  <v-data-table
    :hide-default-footer="!mostraPaginacao"
    :disable-pagination="!mostraPaginacao"
    :hide-default-header="!mostraColunas"
    :multi-sort="ordenarVarios"
    :fixed-header="colunasFixas"
    :headers="visibleColumns"
    :group-by="agrupador"
    :search="search"
    :items="linhas"
    dense
    v-model="itensSelecionados"
    :loading="carregar"
    :item-class="rowClass"
    @click:row="clickRow"
    :show-select="selecionarVarios"
    :item-key="chaveTabela"
    :height="zoomDialog ? '50vh' : altura"
    :sort-by.sync="ordenar"
    :sort-desc.sync="desc"
    :footer-props="{
      itemsPerPageOptions: [30, 60, 100],
      itemsPerPageText: 'Linhas por pagina',
    }"
  >
    <template v-slot:top>
      <v-toolbar
        flat
        dense
        v-if="mostraToolbar"
      >
        <v-toolbar-title>{{ nomeTabela }}</v-toolbar-title>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              v-if="nomePrograma"
            >mdi-information-variant</v-icon>
          </template>
          <span>{{nomePrograma}}</span>
        </v-tooltip>
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
          v-if="mostraPesquisa && !customPesquisa"
        >
        </v-text-field>

        <slot name="pesquisa"> </slot>

        <div class="ml-3">
          <slot name="botoes"> </slot>
        </div>
      </v-toolbar>
    </template>

    <template v-slot:[`group.header`]="{ isOpen, toggle, group, groupBy }">
      <th colspan="90">
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

    <template v-slot:[`item.tb_detalhe`]="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            x-small
            icon
            color="green"
            :fab="true"
            v-on="on"
            @click="clickDetails(item)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
        <span>Ver detalhes</span>
      </v-tooltip>
    </template>

    <template v-slot:[`item.acoes`]="{ item }">
      <div>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              x-small
              icon
              color="orange darken-2"
              :fab="true"
              v-on="on"
              v-show="zoomDialog"
              @click="exportaZoom(item)"
            >
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </template>
          <span>Usar registro na tela anterior</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              x-small
              icon
              color="blue"
              :fab="true"
              v-on="on"
              @click="clickEdit(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Alterar registro</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              x-small
              icon
              color="red"
              :fab="true"
              v-on="on"
              @click="clickDel(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Deletar registro</span>
        </v-tooltip>
      </div>
    </template>

    <template
      v-for="f in customColumns"
      v-slot:[`item.${f.value}`]="{ item }"
    >
      <slot
        :name="f.value"
        v-bind:item="item"
      > </slot>
    </template>
  </v-data-table>
</template>

<script>
import { VDataTable } from "vuetify/lib";
export default {
  data: (vm) => ({
    menu: false,
    search: vm.pesquisa,
    selectedLine: null,
    agruparPor: null,
    itensSelecionados: vm.value,
    ordenar: vm.ordenarPor,
    desc: vm.ordenarDesc,
    visibleColumns: []
  }),
  computed: {
    customOptions: {
      get: function () {
        if (this.paginacaoServidor) {
          return this.options;
        }
        return undefined;
      },
      set: function (value) {
        this.options = value;
      },
    },
    customPesquisa() {
      return !!this.$slots["pesquisa"];
    },
    customColumns() {
      return this.colunas.filter((coluna) => coluna?.custom ?? false);
    },
    agrupador() {
      if (this.agrupar) {
        return this.agrupar;
      }
      if (this.agruparPor) {
        return [this.agruparPor];
      }
      return [];
    },
    listaAgrupador() {
      return this.visibleColumns.filter(
        (col) => col.text !== "Ações" && col.value !== "tb_detalhe"
      );
    },
  },
  mounted() {
    this.ajustaCols();
  },
  watch: {
    itensSelecionados() {
      this.$emit("input", this.itensSelecionados);
    },
    pesquisa() {
      this.search = this.pesquisa;
    },
  },
  components: {
    VDataTable,
  },
  methods: {
    rowClass(item) {
      if (this.mostraLinhaSelecionada) {
        if (this.selectedLine) {
          if (this.selectedLine[this.chaveTabela] == item[this.chaveTabela]) {
            return this.$vuetify.theme.isDark ? "primary" : "blue lighten-5";
          }
        }
      }
      if (item.cor) {
        return item.cor;
      }
    },
    ajustaCols() {
      this.visibleColumns = [...this.colunas]

      if (this.mostraDetalhes) {
        this.visibleColumns.unshift({
          align: "start",
          sortable: false,
          hidden: false,
          value: "tb_detalhe",
          width: "20px",
        });
      }

      if (this.mostraAcoes) {
        this.visibleColumns.push({
          text: "Ações",
          align: "end",
          sortable: false,
          hidden: false,
          value: "acoes",
        });
      }
    },
    clickRow(item) {
      this.selectedLine = item;
      this.$emit("linha-selecionada", item);
    },
    clickEdit(item) {
      this.$emit("alterar-item", item);
    },
    exportaZoom(item) {
      this.$emit("exporta-zoom", item);
    },
    clickDetails(item) {
      this.$emit("ver-detalhes", item);
    },
    clickDel(item) {
      this.$emit("deletar-item", item);
    },
    removeFromArray(array, item) {
      var idx = array.indexOf(item);
      if (idx !== -1) {
        array.splice(idx, 1);
      }
      return array;
    },
  },
  props: {
    colunas: {
      type: Array,
      default: () => undefined,
      required: true,
    },
    linhas: {
      type: Array,
      default: () => undefined,
      required: true,
    },
    "mostra-colunas": {
      type: Boolean,
      default: () => true,
    },
    "mostra-paginacao": {
      type: Boolean,
      default: () => true,
    },
    "mostra-pesquisa": {
      type: Boolean,
      default: () => false,
    },
    "colunas-fixas": {
      type: Boolean,
      default: () => true,
    },
    "mostra-agrupador": {
      type: Boolean,
      default: () => false,
    },
    "ordenar-varios": {
      type: Boolean,
      default: () => true,
    },
    pesquisa: {
      type: String,
      default: () => null,
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
      default: () => "",
    },
    altura: {
      type: String,
      default: () => "100vh",
    },
    carregar: {
      type: Boolean,
      default: () => false,
    },
    value: {},
    agrupar: {
      type: String,
      default: () => null,
    },
    "mostra-detalhes": {
      type: Boolean,
      default: () => false,
    },
    "mostra-toolbar": {
      type: Boolean,
      default: () => true,
    },
    "zoom-dialog": {
      type: Boolean,
      default: () => false,
    },
    "nome-programa": {
      type: String,
      default: () => "",
    },
    "ordenar-desc": {
      type: Boolean,
      default: () => false,
    },
    "ordenar-por": {
      type: String,
      default: () => null,
    },
  },
};
</script>
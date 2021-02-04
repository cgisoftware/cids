<template>
  <!-- <v-skeleton-loader
    type="table"
    v-if="carregar"
  >
  </v-skeleton-loader> -->
  <v-data-table
    :hide-default-footer="!mostraPaginacao"
    :disable-pagination="!mostraPaginacao"
    :hide-default-header="!mostraColunas"
    :multi-sort="ordenarVarios"
    :fixed-header="colunasFixas"
    :headers="visibleColumns"
    :options.sync="options"
    :server-items-length="totalItens"
    :group-by="agrupador"
    :search="!paginacaoServidor ? search : null"
    :items="linhas"
    dense
    :loading="carregar"
    :item-class="rowClass"
    @click:row="clickRow"
    :show-select="selecionarVarios"
    :item-key="chaveTabela"
    :height="altura"
    :footer-props="{ itemsPerPageOptions: [30,60,100], itemsPerPageText: 'Linhas por pagina' }"
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
          v-if="mostraPesquisa"
        >
        </v-text-field>

        <slot
          name="pesquisa"
          v-else
        >
        </slot>

        <div class="ml-3">
          <slot name="botoes">
          </slot>
        </div>

        <v-menu
          v-model="menu"
          :close-on-click="false"
          :close-on-content-click="false"
          :nudge-width="400"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="mt-0 ml-4"
              v-if="mostraPropriedades"
              text
              v-bind="attrs"
              v-on="on"
            >
              mdi-dots-vertical
            </v-icon>
          </template>

          <v-card scrollable>
            <v-toolbar
              flat
              dense
            >
              <v-toolbar-title>Organizar tabela</v-toolbar-title>
            </v-toolbar>
            <v-card-text
              class="px-0"
              style="overflow-y: scroll; height:300px"
            >
              <v-autocomplete
                dense
                class="mt-4 px-3"
                :items="listaAgrupador"
                item-text="text"
                item-value="value"
                label="Agrupar por"
                v-model="agruparPor"
                clearable
                no-data-text="Sem dados"
              ></v-autocomplete>
              <v-container
                fluid
                grid-list-md
              >
                <v-layout>
                  <v-flex xs6>
                    Colunas na tela
                    <draggable :list="visibleColumns">
                      <div
                        v-for="coluna in visibleColumns"
                        :key="coluna.text"
                        v-show="coluna.text !== 'Ações' && coluna.value !== 'view'"
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
                              @click="removeCol(coluna)"
                              style="position: absolute; right: 10px; cursor: pointer;"
                            >mdi-close</v-icon>
                          </template>
                        </v-chip>
                      </div>
                    </draggable>
                  </v-flex>
                  <v-flex xs6>
                    Colunas para usar
                    <div
                      v-show="coluna.text !== 'Ações' && coluna.value !== 'view'"
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
                            @click="addCol(coluna)"
                            style="position: absolute; right: 10px; cursor: pointer;"
                          >mdi-plus</v-icon>
                        </template>
                      </v-chip>
                    </div>
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
                block
              >
                <v-icon
                  small
                  left
                >mdi-close</v-icon>Fechar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-btn
          icon
          v-if="mostraPropriedades"
          @click="salvarPropriedades"
        >
          <v-icon small>mdi-content-save</v-icon>
        </v-btn>
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
import { VDataTable } from "vuetify/lib";
import draggable from "vuedraggable";
export default {
  data: (vm) => ({
    menu: false,
    options: vm.paginacao,
    search: vm.pesquisa,
    selectedLine: vm.value,
    agruparPor: null,
    hiddenColumns: [],
    visibleColumns: vm.colunas,
  }),
  mounted() {
    this.ajustaCols();
  },
  computed: {
    customColumns() {
      return this.visibleColumns.filter((coluna) => coluna?.custom ?? false);
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
        (col) => col.text !== "Ações" && col.value !== "view"
      );
    },
  },
  watch: {
    propriedades() {
      this.ajustaCols();
    },
    options(n, o) {
      if (this.paginacaoServidor) {
        if (!(JSON.stringify(n) === JSON.stringify(o))) {
          n["search"] = this.search;
          this.$emit("paginando", n);
        }
      }
    },
    paginacao() {
      if (this.paginacaoServidor) {
        this.options = this.paginacao;
        this.options["search"] = this.search;
        this.agruparPor = this.paginacao?.groupBy?.[0] ?? "";
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
    ajustaCols() {
      const colunasManipuladas = [...this.colunas];
      const propriedadesManipuladas = [...this.propriedades];
      if (propriedadesManipuladas.length > 0) {
        this.visibleColumns = propriedadesManipuladas.filter(
          (coluna) => !coluna.hidden
        );

        for (let col of colunasManipuladas) {
          if (this.visibleColumns.some((prop) => prop.text === col.text)) {
            this.removeFromArray(colunasManipuladas, col);
          }
        }
        this.hiddenColumns = colunasManipuladas;
      } else {
        this.visibleColumns = colunasManipuladas.filter(
          (coluna) => !coluna.hidden
        );
        this.hiddenColumns = colunasManipuladas.filter(
          (coluna) => coluna.hidden
        );
      }

      if (this.mostraAcoes) {
        this.visibleColumns.push({
          text: "Ações",
          align: "end",
          sortable: false,
          hidden: false,
          custom: true,
          value: "acoes",
        });
      }
    },
    removeCol(item) {
      item.hidden = true;
      this.removeFromArray(this.visibleColumns, item);
      this.hiddenColumns.push(item);
    },
    addCol(item) {
      item.hidden = false;
      this.removeFromArray(this.hiddenColumns, item);
      this.visibleColumns.push(item);
    },
    salvarPropriedades() {
      this.$emit("salvar-propriedades", {
        colunas: this.visibleColumns,
        paginacao: this.options,
      });
      this.menu = false;
    },
    rowClass(item) {
      if (this.mostraLinhaSelecionada) {
        if (this.selectedLine) {
          if (this.selectedLine[this.chaveTabela] == item[this.chaveTabela]) {
            return this.$vuetify.theme.isDark ? "primary" : "blue lighten-5";
          }
        }
      }
    },
    clickRow(item) {
      this.selectedLine = item;
      this.$emit("linha-selecionada", item);
      // this.$emit("input", item);
    },
    clickEdit(item) {
      this.$emit("alterar-item", item);
    },
    clickDel(item) {
      this.$emit("deletar-item", item);
    },
    removeFromArray(array, item) {
      var idx = array.indexOf(item);
      console.log(idx);
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
    paginacao: {
      type: Object,
      default: () => {},
    },
    value: Object,
    "total-itens": {
      type: Number,
      default: () => 30,
    },
    agrupar: {
      type: String,
      default: () => null,
    },
    propriedades: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

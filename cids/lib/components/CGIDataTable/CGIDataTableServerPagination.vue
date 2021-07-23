<template>
  <v-data-table
    dense
    :hide-default-footer="!mostraPaginacao"
    :disable-pagination="!mostraPaginacao"
    :hide-default-header="!mostraColunas"
    :multi-sort="ordenarVarios"
    :fixed-header="colunasFixas"
    :headers="visibleColumns"
    @update:options="teste"
    :server-items-length="totalItens"
    :items="linhasCustomizadas"
    v-model="itensSelecionados"
    :loading="carregar"
    :item-class="rowClass"
    @click:row="clickRow"
    :show-select="selecionarVarios"
    :item-key="chaveTabela"
    :height="zoomDialog ? '50vh' : altura"
    :sort-by="options.sortBy"
    :sort-desc="options.sortDesc"
    :group-by="options.groupBy"
    :footer-props="{
      itemsPerPageOptions: [30, 60, 100],
      itemsPerPageText: 'Linhas por pagina',
    }"
  >

    <template v-slot:[`item.data-table-select`]="{ isSelected, select }">
      <v-checkbox
        hide-details
        class="mt-0"
        :color="cids.theme.dataTable.checkboxColor"
        :value="isSelected"
        @change="select($event)"
      ></v-checkbox>
    </template>
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
          @input="debounce"
          v-if="mostraPesquisa && !customPesquisa"
        >
        </v-text-field>

        <slot name="pesquisa"> </slot>

        <div class="ml-3">
          <slot name="botoes"> </slot>
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
                        v-show="
                          coluna.text !== 'Ações' &&
                            coluna.value !== 'tb_detalhe'
                        "
                        class="text-center my-1"
                      >
                        <v-chip
                          v-if="!coluna.actions"
                          style="width: 100%;"
                          small
                          label
                        >
                          <template v-slot:default>
                            {{ coluna.text }}

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
                      v-show="
                        coluna.text !== 'Ações' && coluna.value !== 'tb_detalhe'
                      "
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
                          {{ coluna.text }}

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
      v-slot:[`group.summary`]="{ items }"
      v-if="totalizarGrupo"
    >
      <td
        v-show="column.value !== agruparPor"
        v-for="(column, i) in visibleColumns"
        :key="i"
        :class="{'text-left': column.totalizar, 'text-right': column.somar}"
        style="font-size: 12px"
      >

        <strong v-if="column.totalizar">
          Total: {{ items.length }}
        </strong>

        <strong v-if="column.somar">
          {{ sumField(column.value, items) }}
        </strong>
      </td>
    </template>

    <!-- <template v-slot:[`item.tb_detalhe`]="{ item }">
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
    </template> -->

    <template v-slot:[`item.acoes`]="{ item }">
      <div>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              v-if="mostraDetalhes"
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
              color="green darken-2"
              :fab="true"
              v-on="on"
              @click="clickCopy(item)"
            >
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </template>
          <span>Copiar registro</span>
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
import draggable from "vuedraggable";
import { formatNumber } from "../../util";
export default {
  data: (vm) => ({
    menu: false,
    options: {
      page: 0,
      itemsPerPage: 30,
      sortBy: [],
      sortDesc: [],
      groupBy: [],
      groupDesc: [],
    },
    search: vm.pesquisa,
    selectedLine: null,
    hiddenColumns: [],
    visibleColumns: vm.colunas,
    linhasCustomizadas: [],
    debounceSearch: null,
    itensSelecionados: vm.value,
    localPaginacao: {
      page: 0,
      itemsPerPage: 30,
      sortBy: [],
      sortDesc: [],
      groupBy: [],
      groupDesc: [],
    },
  }),
  created() {
    this.debounceSearch = this.debounce(this.updateSearch, 500);
    this.debouncePagination = this.debounce(this.updatePagination, 500);
  },
  mounted() {
    this.ajustaCols();
    this.ajustaLinhas(this.linhas);
  },
  computed: {
    customPesquisa() {
      return !!this.$slots["pesquisa"];
    },
    customColumns() {
      return this.visibleColumns.filter((coluna) => coluna?.custom ?? false);
    },
    agruparPor: {
      get: function () {
        return this.options?.groupBy?.[0] ?? null;
      },
      set: function (value) {
        this.options.groupBy = [];
        if (value) {
          this.options.groupBy.push(value);
        }

        this.ajustaLinhas(this.linhas);
      },
    },
    listaAgrupador() {
      return this.visibleColumns.filter(
        (col) => col.text !== "Ações" && col.value !== "tb_detalhe"
      );
    },
  },
  watch: {
    itensSelecionados() {
      this.$emit("input", this.itensSelecionados);
    },
    pesquisa() {
      this.search = this.pesquisa;
    },
    linhas() {
      this.ajustaLinhas(this.linhas);
    },
    propriedades() {
      this.ajustaCols();
    },
    options(n, o) {
      if (!(JSON.stringify(n) === JSON.stringify(o))) {
        n["search"] = this.search;
        this.$emit("paginando", n);
      }
    },
    paginacao() {
      this.localPaginacao = this.paginacao;
      this.localPaginacao["search"] = this.search;
      this.debouncePagination();
    },
    search() {
      this.debounceSearch();
    },
  },
  components: {
    VDataTable,
    draggable,
  },
  methods: {
    teste(val) {
      this.localPaginacao = val;
      this.localPaginacao["search"] = this.search;
      this.debouncePagination();
    },
    sumField(key, items) {
      if (items != undefined) {
        const valor = items.reduce((a, b) => a + (b[key] || 0), 0);
        return formatNumber(valor);
      }
      // sum data in give key (property)
      const valor = this.curva.reduce((a, b) => a + (b[key] || 0), 0);
      return formatNumber(valor);
    },
    debounce(func, wait) {
      let timer = null;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(func, wait);
      };
    },
    updateSearch() {
      this.options["search"] = this.search;
      this.$emit("paginando", this.options);
    },
    updatePagination() {
      this.options["search"] = this.search;
      this.options = this.localPaginacao;
    },
    ajustaLinhas(linhas) {
      this.selectedLine = null;
      const l = [...linhas];
      if (this.options?.groupBy?.length > 0 ?? false) {
        const sort = l.sort(this.dynamicSort(this.options.groupBy[0]));
        this.linhasCustomizadas = sort;
      } else {
        this.linhasCustomizadas = l;
      }
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },
    ajustaCols() {
      const colunasManipuladas = [...this.colunas];
      const propriedadesManipuladas = [
        ...this.propriedades.filter(
          (item) =>
            item.value !== "tb_detalhe" &&
            item.value !== "acoes" &&
            item.value !== "view"
        ),
      ];
      if (propriedadesManipuladas.length > 0) {
        for (let colh of colunasManipuladas) {
          for (let i = 0; i < propriedadesManipuladas.length; i++) {
            if (propriedadesManipuladas[i].value === colh.value) {
              propriedadesManipuladas[i] = {
                ...colh,
                ...propriedadesManipuladas[i],
              };
            }
          }
        }

        this.visibleColumns = propriedadesManipuladas.filter(
          (coluna) => !coluna.hidden
        );

        for (let col of this.visibleColumns) {
          for (let colh of colunasManipuladas) {
            if (col.text === colh.text) {
              this.removeFromArray(colunasManipuladas, colh);
            }
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
      // if (this.mostraDetalhes) {
      //   this.visibleColumns.unshift({
      //     align: "start",
      //     sortable: false,
      //     hidden: false,
      //     value: "tb_detalhe",
      //     width: "20px",
      //   });
      // }

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
        colunas: this.visibleColumns.filter(
          (item) => item.value !== "tb_detalhe" && item.value !== "acoes"
        ),
        paginacao: this.options,
      });
      this.menu = false;
    },
    rowClass(item) {
      if (this.mostraLinhaSelecionada) {
        if (this.selectedLine) {
          if (this.selectedLine[this.chaveTabela] == item[this.chaveTabela]) {
            return this.cids?.theme?.dataTable?.lineColor ?? "blue lighten-5";
          }
        }
      }

      if (item.cor) {
        return item.cor;
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
    clickCopy(item) {
      this.$emit("copiar-item", item);
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
    value: {},
    "total-itens": {
      type: Number,
      default: () => 30,
    },
    propriedades: {
      type: Array,
      default: () => [],
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
    "totalizar-grupo": {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

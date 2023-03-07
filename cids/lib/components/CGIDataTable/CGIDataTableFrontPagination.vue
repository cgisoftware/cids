<template>
  <v-data-table
    :hide-default-footer="!mostraPaginacao"
    :disable-pagination="!mostraPaginacao"
    :hide-default-header="!mostraColunas"
    :multi-sort="false"
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

    <template v-slot:[`item.data-table-select`]="{ isSelected, select }">
      <v-checkbox
        hide-details
        class="mt-0"
        :color="corCheckbox ? corCheckbox : cids.theme.dataTable.checkboxColor"
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
          v-if="mostraPesquisa && !customPesquisa"
        >
          <template
            v-slot:prepend-inner
            v-if="informacoesDaPesquisa"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >mdi-information-variant</v-icon>
              </template>
              <span>{{informacoesDaPesquisa}}</span>
            </v-tooltip>
          </template>
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
                v-if="habilitaAgrupamento"
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
        <v-btn
          icon
          v-if="zoomDialog"
          @click="$emit('cancelar-zoom')"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:[`group.header`]="{ isOpen, toggle, group }">
      <th colspan="90">
        <v-icon @click="toggle">{{ isOpen ? "mdi-minus" : "mdi-plus" }}

          <!-- {{
          groupBy[0][0].toUpperCase() +
            groupBy[0]
              .split("_")
              .join(" ")
              .slice(1)
        }}: -->

        </v-icon>
        {{ group }}
      </th>
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
      <div style="min-width: 150px">
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
              v-if="copiar"
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
              v-if="alterar"
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
              v-if="deletar"
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
          <span>Excluir registro</span>
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

    <template
      v-slot:[`group.summary`]="{ items }"
      v-if="totalizar"
    >
      <td
        v-show="column.value !== agruparPor"
        v-for="(column, i) in visibleColumns"
        :key="i"
        :class="{ 'text-left': column.contar, 'text-right': column.somar }"
        style="font-size: 12px"
      >
        <strong v-if="column.contar"> Total: {{ items.length }} </strong>

        <strong v-if="column.somar">
          {{ sumField(column.value, items) }}
        </strong>
      </td>
    </template>

    <template
      v-slot:[`body.append`]="{ items }"
      v-if="totalizar"
    >
      <tr>
        <th
          v-for="(column, i) in visibleColumns"
          :key="i"
          v-show="column.value !== agruparPor"
          :class="{ 'text-left': column.contar, 'text-right': column.somar }"
          style="font-size: 12px"
        >
          <strong v-if="column.contar"> Total: {{ items.length }} </strong>

          <strong v-if="column.somar">
            {{ sumField(column.value, items) }}
          </strong>
        </th>
      </tr>
    </template>

  </v-data-table>
</template>

<script>
import draggable from "vuedraggable";
import { formatNumber } from "../../util";
import { VDataTable } from "vuetify/lib";
export default {
  data: (vm) => ({
    menu: false,
    search: vm.pesquisa,
    selectedLine: null,
    agruparPor: vm.agrupar,
    itensSelecionados: vm.value,
    ordenar: vm.ordenarPor,
    desc: vm.ordenarDesc,
    visibleColumns: vm.colunas,
    hiddenColumns: [],
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
      return this.visibleColumns.filter((coluna) => coluna?.custom ?? false);
    },
    agrupador() {
      if (this.agruparPor) {
        return [this.agruparPor];
      }

      // if (this.agrupar) {
      //   return this.agrupar;
      // }
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
    agrupar() {
      this.agruparPor = this.agrupar;
    },
    ordenarPor() {
      this.ordenar = this.ordenarPor;
    },
    colunas() {
      this.ajustaCols();
    },
    propriedades() {
      this.ajustaCols();
    },
    itensSelecionados() {
      this.$emit("input", this.itensSelecionados);
    },
    pesquisa() {
      this.search = this.pesquisa;
    },
    value() {
      this.itensSelecionados = this.value
    }
  },
  components: {
    VDataTable,
    draggable,
  },
  methods: {
    sumField(key, items) {
      if (items != undefined) {
        const valor = items.reduce((a, b) => a + (b[key] || 0), 0);
        return formatNumber(valor);
      }
      // sum data in give key (property)
      const valor = this.curva.reduce((a, b) => a + (b[key] || 0), 0);
      return formatNumber(valor);
    },
    addCol(item) {
      item.hidden = false;
      this.removeFromArray(this.hiddenColumns, item);
      this.visibleColumns.push(item);
    },
    removeCol(item) {
      item.hidden = true;
      this.removeFromArray(this.visibleColumns, item);
      this.hiddenColumns.push(item);
    },
    salvarPropriedades() {
      this.$emit("salvar-propriedades", {
        colunas: this.visibleColumns.filter(
          (item) => item.value !== "tb_detalhe" && item.value !== "acoes"
        ),
        ordenacao: this.ordenar,
        agrupamento: this.agruparPor,
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
    clickRow(item) {
      this.selectedLine = item;
      this.$emit("linha-selecionada", item);
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
    "mostra-propriedades": {
      type: Boolean,
      default: () => false,
    },
    propriedades: {
      type: Array,
      default: () => [],
    },
    copiar: {
      type: Boolean,
      default: () => true,
    },
    alterar: {
      type: Boolean,
      default: () => true,
    },
    deletar: {
      type: Boolean,
      default: () => true,
    },
    "informacoes-da-pesquisa": {
      type: String,
      default: () => null,
    },
    totalizar: {
      type: Boolean,
      default: () => false,
    },
    "cor-checkbox": {
      type: String,
      default: () => null,
    },
    "habilita-agrupamento": {
      type: Boolean,
      default: () => true,
    },
  },
};
</script>
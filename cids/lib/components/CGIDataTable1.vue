<template>
  <v-data-table
    :headers="colunasVisiveis"
    :items="linhas"
    :options.sync="propriedadesDaPaginacao"
    :server-items-length="paginacaoServidor ? totalItens : undefined"
    :loading="carregar"
    :height="altura"
    :fixed-header="colunasFixas"
    :dense="compacto"
    :search="pesquisaInterna"
    :item-class="habilitaLinhaSelecionada"
    :hide-default-footer="!mostraPaginacao"
    :disable-pagination="!mostraPaginacao"
    :multi-sort="ordenarVarios"
    :show-select="selecionarVarios"
    :item-key="chaveTabela"
    :sort-by="propriedadesDaPaginacao.sortBy ?? ordenarPor"
    :sort-desc="propriedadesDaPaginacao.sortDesc ?? ordenarDesc"
    :group-by="propriedadesDaPaginacao.groupBy ?? agruparPor"
    v-model="itensSelecionados"
    :footer-props="{
      itemsPerPageOptions: [30, 60, 100],
      itemsPerPageText: 'Linhas por pagina',
    }"
    @click:row="selecionaLinha"
  >
    <template v-slot:[`header.data-table-select`]="{ props, on }">
      <v-simple-checkbox
        v-bind="props"
        v-on="on"
        :color="corCheckbox ? corCheckbox : cids.theme.dataTable.checkboxColor"
        :disabled="carregar"
      />
    </template>

    <template v-slot:[`item.data-table-select`]="{ isSelected, select }">
      <v-simple-checkbox
        :color="corCheckbox ? corCheckbox : cids.theme.dataTable.checkboxColor"
        :value="isSelected"
        :disabled="carregar"
        @input="select($event)"
      />
    </template>

    <template v-slot:[`group.header`]="{ isOpen, toggle, group, groupBy }">
      <th colspan="90">
        <v-icon @click="toggle">
          {{ isOpen ? "mdi-minus" : "mdi-plus" }}
        </v-icon>
        {{
          groupBy[0][0].toUpperCase() +
          groupBy[0].split("_").join(" ").slice(1)
        }}: {{ group }}
      </th>
    </template>

    <template
      v-for="(coluna, index) in colunasCustomizaveis"
      v-slot:[`item.${coluna.value}`]="{ item }"
    >
      <div :key="index" v-if="coluna.formatador">
        {{ coluna.formatador(item[coluna.value]) }}
      </div>
      <slot v-else :name="coluna.value" v-bind:item="item"> </slot>
    </template>

    <template v-slot:top>
      <v-toolbar flat dense v-if="mostraToolbar">
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

        <template v-if="!$vuetify.breakpoint.smAndDown">
          <v-text-field
            style="max-width: 300px"
            class="mt-8"
            filled
            single-line
            dense
            label="Pesquisar..."
            color="primary"
            v-model="pesquisaInterna"
            v-if="mostraPesquisa"
          >
            <template v-slot:prepend-inner v-if="informacoesDaPesquisa">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on"
                    >mdi-information-variant</v-icon
                  >
                </template>
                <span>{{ informacoesDaPesquisa }}</span>
              </v-tooltip>
            </template>
          </v-text-field>

          <slot name="pesquisa"> </slot>
        </template>

        <div class="ml-3">
          <slot name="botoes" v-bind:limpaPesquisa="limpaPesquisa"> </slot>
        </div>

        <v-menu
          v-model="menuDePropriedadesDaColuna"
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
            <v-toolbar flat dense>
              <v-toolbar-title>Organizar tabela</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="px-0" style="overflow-y: scroll; height: 300px">
              <v-autocomplete
                v-if="habilitaAgrupamento"
                dense
                class="mt-4 px-3"
                :items="colunasVisiveis"
                item-text="text"
                item-value="value"
                label="Agrupar por"
                clearable
                v-model="agrupamento"
                no-data-text="Sem dados"
              ></v-autocomplete>
              <v-container fluid grid-list-md>
                <v-layout>
                  <v-flex xs6>
                    Colunas na tela
                    <draggable :list="colunasVisiveis">
                      <div
                        v-for="coluna in colunasVisiveis"
                        :key="coluna.text"
                        v-show="
                          coluna.value !== 'acoes' &&
                          coluna.value !== 'tb_detalhe'
                        "
                        class="text-center my-1"
                      >
                        <v-tooltip top>
                          <template #activator="{ on }">
                            <v-chip
                              v-on="on"
                              v-if="!coluna.actions"
                              style="width: 100%"
                              small
                              label
                            >
                              <template v-slot:default>
                                {{ cids.reticencias(coluna.text, 20) }}

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
                          </template>
                          <span>{{ coluna.text }}</span>
                        </v-tooltip>
                      </div>
                    </draggable>
                  </v-flex>
                  <v-flex xs6>
                    Colunas disponíveis
                    <div
                      v-show="
                        coluna.value !== 'acoes' &&
                        coluna.value !== 'tb_detalhe'
                      "
                      v-for="(coluna, id) in colunasInvisiveis"
                      :key="id"
                      class="text-center my-1"
                    >
                      <v-tooltip top>
                        <template #activator="{ on }">
                          <v-chip
                            v-on="on"
                            v-if="!coluna.actions"
                            style="width: 100%"
                            small
                            label
                          >
                            <template v-slot:default>
                              {{ cids.reticencias(coluna.text, 20) }}

                              <v-icon
                                small
                                @click="adicionaColunaNaTela(coluna)"
                                style="
                                  position: absolute;
                                  right: 10px;
                                  cursor: pointer;
                                "
                              >
                                mdi-plus
                              </v-icon>
                            </template>
                          </v-chip>
                        </template>
                        <span>{{ coluna.text }}</span>
                      </v-tooltip>
                    </div>
                  </v-flex>
                </v-layout>
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
        <v-btn icon v-if="zoomDialog" @click="$emit('cancelar-zoom')">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <div v-if="$vuetify.breakpoint.smAndDown" class="px-5">
        <v-text-field
          class="mt-8"
          filled
          single-line
          dense
          label="Pesquisar..."
          color="primary"
          v-model="pesquisaInterna"
          v-if="mostraPesquisa"
        >
          <template v-slot:prepend-inner v-if="informacoesDaPesquisa">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on"
                  >mdi-information-variant</v-icon
                >
              </template>
              <span>{{ informacoesDaPesquisa }}</span>
            </v-tooltip>
          </template>
        </v-text-field>

        <slot name="pesquisa"> </slot>
      </div>
    </template>

    <template v-slot:[`item.acoes`]="{ item }">
      <v-menu v-if="cids?.defaults?.dataTable?.acoes === 'left dot'">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            :dark="$vuetify.theme.dark"
            :color="$vuetify.theme.dark ? 'orange' : 'primary'"
          >
            <v-icon small>mdi-dots-vertical</v-icon>
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
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      x-small
                      icon
                      :color="opcao.cor"
                      :fab="true"
                      v-on="on"
                      @click="opcao.acao(item)"
                    >
                      <v-icon>{{ opcao.icone }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ opcao.descricao }}</span>
                </v-tooltip>
              </div>
            </div>

            <div v-if="temOutrasAcoes">
              <v-divider class="my-2"></v-divider>
              <div class="font-weight-bold mb-5 px-4">
                Demais ações do registro
              </div>
              <div class="px-4">
                <slot v-bind:item="item" name="outras-acoes"></slot>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>

      <div
        style="min-width: 150px"
        v-if="
          cids?.defaults?.dataTable?.acoes === 'right' ||
          cids?.defaults?.dataTable?.acoes === 'left'
        "
      >
        <v-tooltip top v-for="(opcao, index) in opcoesDeAcao" :key="index">
          <template v-slot:activator="{ on }">
            <v-btn
              v-show="opcao.mostrar"
              x-small
              icon
              :color="opcao.cor"
              :fab="true"
              v-on="on"
              @click="opcao.acao(item)"
            >
              <v-icon>{{ opcao.icone }}</v-icon>
            </v-btn>
          </template>
          <span>{{ opcao.descricao }}</span>
        </v-tooltip>
      </div>
    </template>

    <template v-slot:[`group.summary`]="{ items }" v-if="totalizar">
      <td
        v-show="coluna.value !== agrupamento"
        v-for="(coluna, i) in colunasVisiveis"
        :key="i"
        :class="{ 'text-left': coluna.contar, 'text-right': coluna.somar }"
        style="font-size: 12px"
      >
        <strong v-if="coluna.contar"> Total: {{ items.length }} </strong>

        <strong v-if="coluna.somar">
          {{ somarRegistros(coluna.value, items) }}
        </strong>
      </td>
    </template>

    <template v-slot:[`body.append`]="{ items }" v-if="totalizar">
      <tr>
        <th
          v-for="(coluna, i) in colunasVisiveis"
          :key="i"
          v-show="coluna.value !== agrupamento"
          :class="{ 'text-left': coluna.contar, 'text-right': coluna.somar }"
          style="font-size: 12px"
        >
          <strong v-if="coluna.contar"> Total: {{ items.length }} </strong>

          <strong v-if="coluna.somar">
            {{ somarRegistros(coluna.value, items) }}
          </strong>
        </th>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import draggable from "vuedraggable";
import { formatNumber } from "../util";
export default {
  components: {
    draggable,
  },
  data: (context) => ({
    colunasVisiveis: [],
    colunasInvisiveis: [],
    propriedadesDaPaginacao: {},
    pesquisaInterna: context.pesquisa,
    menuDePropriedadesDaColuna: false,
    linhaSelecionada: null,
    itensSelecionados: context.value,
    opcoesDeAcao: [
      {
        nome: "Visualizar",
        icone: "mdi-eye",
        cor: "green",
        descricao: "Visualizar registro",
        acao: (item) => {
          context.$emit("ver-detalhes", item);
        },
        mostrar: context.mostraDetalhes,
      },
      {
        nome: "Copiar",
        icone: "mdi-content-copy",
        cor: "green",
        descricao: "Copiar registro",
        acao: (item) => {
          context.$emit("copiar-item", item);
        },
        mostrar: context.copiar,
      },
      {
        nome: "Alterar",
        icone: "mdi-pencil",
        cor: "blue",
        descricao: "Alterar registro",
        acao: (item) => {
          context.$emit("alterar-item", item);
        },
        mostrar: context.alterar,
      },
      {
        nome: "Excluir",
        icone: "mdi-delete",
        cor: "red",
        descricao: "Excluir registro",
        acao: (item) => {
          context.$emit("deletar-item", item);
        },
        mostrar: context.deletar,
      },
      {
        nome: "Exportar registro",
        icone: "mdi-arrow-down",
        cor: "orange",
        descricao: "Exportar registro",
        acao: (item) => {
          context.$emit("exporta-zoom", item);
        },
        mostrar: context.zoomDialog,
      },
    ],
  }),
  mounted() {
    this.organizaColunas();
  },
  methods: {
    organizaColunas() {
      this.colunasVisiveis = [];
      this.colunasInvisivel = [];
      const colunas = [...this.colunas];
      const propriedades = structuredClone(this.propriedades);

      propriedades.forEach((propriedade) => {
        const coluna = colunas.filter(
          (coluna) => coluna.value === propriedade.value
        );
        if (coluna.length > 0) Object.assign(propriedade, coluna[0]);
      });

      this.colunasVisiveis = propriedades.length > 0 ? propriedades : colunas;

      if (propriedades.length) {
        this.colunasInvisiveis = colunas.filter(
          (coluna) =>
            !propriedades.some(
              (propriedade) => propriedade.value === coluna.value
            )
        );
      }

      if (this.mostraAcoes) {
        if (this.cids?.defaults?.dataTable?.acoes === "right") {
          this.colunasVisiveis.push({
            text: "Ações",
            align: "end",
            sortable: false,
            hidden: false,
            value: "acoes",
            width: "150",
          });
          return;
        }

        if (this.cids?.defaults?.dataTable?.acoes === "left dot") {
          this.colunasVisiveis.unshift({
            text: "Ações",
            align: "center",
            sortable: false,
            hidden: false,
            value: "acoes",
            width: "15",
          });
        }

        if (this.cids?.defaults?.dataTable?.acoes === "left") {
          this.colunasVisiveis.unshift({
            text: "Ações",
            align: "start",
            sortable: false,
            hidden: false,
            value: "acoes",
            width: "150",
          });
        }
      }
    },
    executaPaginacao() {
      if (this.paginacaoServidor) {
        this.propriedadesDaPaginacao["search"] = this.pesquisaInterna;

        if (
          this.agrupamento != null &&
          !this.propriedadesDaPaginacao.sortBy.some(
            (coluna) => coluna === this.agrupamento
          )
        ) {
          this.propriedadesDaPaginacao.sortBy.unshift(this.agrupamento);
          this.propriedadesDaPaginacao.sortDesc.unshift(false);
        }

        this.$emit("paginando", this.propriedadesDaPaginacao);
      }
    },
    executaPaginacaoDebounce() {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        this.executaPaginacao();
      }, 700);
    },
    adicionaColunaNaTela(coluna) {
      this.colunasInvisiveis = this.colunasInvisiveis.filter(
        (colunaInvisivel) => colunaInvisivel.value != coluna.value
      );
      this.colunasVisiveis.push(coluna);
    },
    removeColunaDaTela(coluna) {
      this.colunasVisiveis = this.colunasVisiveis.filter(
        (colunaVisivel) => colunaVisivel.value != coluna.value
      );
      this.colunasInvisiveis.push(coluna);
    },
    salvarPropriedades() {
      this.$emit("salvar-propriedades", {
        colunas: this.colunasVisiveis.filter(
          (item) => item.value !== "tb_detalhe" && item.value !== "acoes"
        ),
        paginacao: this.propriedadesDaPaginacao,
      });
      this.menuDePropriedadesDaColuna = false;
    },
    habilitaLinhaSelecionada(item) {
      if (this.mostraLinhaSelecionada && this.linhaSelecionada) {
        if (this.linhaSelecionada[this.chaveTabela] == item[this.chaveTabela]) {
          return this.cids?.theme?.dataTable?.lineColor ?? "blue lighten-5";
        }
      }

      if (item.cor) {
        return item.cor;
      }
    },
    selecionaLinha(item) {
      this.linhaSelecionada = structuredClone(item);
      this.$emit("linha-selecionada", item);
    },
    somarRegistros(key, itens) {
      if (itens != undefined) {
        const valor = itens.reduce((a, b) => a + (b[key] || 0), 0);
        return formatNumber(valor);
      }
    },
    limpaPesquisa() {
      this.pesquisaInterna = null;
    },
  },
  computed: {
    colunasCustomizaveis() {
      return this.colunasVisiveis.filter((coluna) => coluna.custom);
    },
    agrupamento: {
      get: function () {
        return this.propriedadesDaPaginacao?.groupBy?.[0] ?? null;
      },
      set: function (value) {
        this.propriedadesDaPaginacao.groupBy = [];
        if (value) {
          this.propriedadesDaPaginacao.groupBy.push(value);
        }
      },
    },
    temOutrasAcoes() {
      return this.$slots["outras-acoes"] || this.$scopedSlots["outras-acoes"];
    },
  },
  watch: {
    propriedadesDaPaginacao() {
      this.executaPaginacao();
    },
    pesquisaInterna() {
      this.executaPaginacaoDebounce();
    },
    propriedades() {
      this.organizaColunas();
    },
    paginacao() {
      this.propriedadesDaPaginacao = this.paginacao ?? {
        page: 1,
        itemsPerPage: 30,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false,
      };
    },
    zoomDialog() {
      const acao = this.opcoesDeAcao.filter(
        (opcao) => opcao.nome === "Exportar registro"
      );
      acao[0].mostrar = this.zoomDialog;
    },
    itensSelecionados() {
      this.$emit("input", this.itensSelecionados);
    },
    value() {
      this.itensSelecionados = this.value;
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
    compacto: {
      type: Boolean,
      default: () => true,
    },
    "mostra-propriedades": {
      type: Boolean,
      default: () => false,
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
    "paginacao-servidor": {
      type: Boolean,
      default: () => false,
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
    "agrupar-por": {
      type: String,
      default: () => null,
    },
    "ordenar-por": {
      type: Array,
      default: () => [],
    },
    "ordenar-desc": {
      type: Array,
      default: () => [],
    },
    totalizar: {
      type: Boolean,
      default: () => false,
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

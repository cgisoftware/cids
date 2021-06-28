<template>
  <CGIDataTableServerPagination
    v-if="paginacaoServidor"
    :linhas="linhas"
    :colunas="colunas"
    :colunas-fixas="colunasFixas"
    :mostra-propriedades="mostraPropriedades"
    :mostra-colunas="mostraColunas"
    :mostra-paginacao="mostraPaginacao"
    :mostra-pesquisa="mostraPesquisa"
    :mostra-agrupador="mostraAgrupador"
    :ordenar-varios="ordenarVarios"
    :pesquisa="pesquisa"
    :chave-tabela="chaveTabela"
    :mostra-linha-selecionada="mostraLinhaSelecionada"
    :selecionar-varios="selecionarVarios"
    :mostra-acoes="mostraAcoes"
    :nome-tabela="nomeTabela"
    :altura="altura"
    :carregar="carregar"
    :paginacao="paginacao"
    :total-itens="totalItens"
    :propriedades="propriedades"
    :mostra-detalhes="mostraDetalhes"
    :mostra-toolbar="mostraToolbar"
    :zoom-dialog="zoomDialog"
    :nome-programa="nomePrograma"
    :totalizar-grupo="totalizarGrupo"
    @paginando="paginando"
    @salvar-propriedades="salvarPropriedades"
    @linha-selecionada="linhaSelecionada"
    @alterar-item="alterarItem"
    @copiar-item="copiarItem"
    @deletar-item="deletarItem"
    @ver-detalhes="verDetalhes"
    @exporta-zoom="exportaZoom"
    v-model="itensSelecionados"
  >
    <template v-slot:botoes>
      <slot name="botoes"></slot>
    </template>

    <template v-slot:pesquisa>
      <slot name="pesquisa"></slot>
    </template>

    <template
      v-for="coluna in colunas"
      v-slot:[`${coluna.value}`]="{ item }"
    >
      <slot
        :name=coluna.value
        v-bind:item="item"
      ></slot>
    </template>
  </CGIDataTableServerPagination>
  <CGIDataTableFrontPagination
    v-else
    :linhas="linhas"
    :colunas="colunas"
    :colunas-fixas="colunasFixas"
    :mostra-colunas="mostraColunas"
    :mostra-pesquisa="mostraPesquisa"
    :mostra-agrupador="mostraAgrupador"
    :ordenar-varios="ordenarVarios"
    :pesquisa="pesquisa"
    :chave-tabela="chaveTabela"
    :mostra-linha-selecionada="mostraLinhaSelecionada"
    :selecionar-varios="selecionarVarios"
    :mostra-acoes="mostraAcoes"
    :nome-tabela="nomeTabela"
    :altura="altura"
    :carregar="carregar"
    :mostra-detalhes="mostraDetalhes"
    :mostra-toolbar="mostraToolbar"
    :zoom-dialog="zoomDialog"
    :nome-programa="nomePrograma"
    :totalizar-grupo="totalizarGrupo"
    @paginando="paginando"
    @salvar-propriedades="salvarPropriedades"
    @linha-selecionada="linhaSelecionada"
    @alterar-item="alterarItem"
    @copiar-item="copiarItem"
    @deletar-item="deletarItem"
    @ver-detalhes="verDetalhes"
    @exporta-zoom="exportaZoom"
    v-model="itensSelecionados"
  >
    <template v-slot:botoes>
      <slot name="botoes"></slot>
    </template>

    <template v-slot:pesquisa>
      <slot name="pesquisa"></slot>
    </template>

    <template
      v-for="coluna in colunas"
      v-slot:[`${coluna.value}`]="{ item }"
    >
      <slot
        :name=coluna.value
        v-bind:item="item"
      ></slot>
    </template>
  </CGIDataTableFrontPagination>
</template>

<script>
import CGIDataTableServerPagination from "./CGIDataTable/CGIDataTableServerPagination.vue";
import CGIDataTableFrontPagination from "./CGIDataTable/CGIDataTableFrontPagination.vue";
import copiarPrograma from "../controller/handler/copiarPrograma";
export default {
  data: (vm) => ({
    itensSelecionados: vm.value,
    item: null,
  }),
  components: {
    CGIDataTableServerPagination,
    CGIDataTableFrontPagination,
  },
  watch: {
    itensSelecionados() {
      this.$emit("input", this.itensSelecionados);
    },
  },
  async mounted() {
    if (this.ativarAtalhos) {
      if (!this.zoomDialog) {
        window.addEventListener("keydown", this.atalhos, false)
      }
    }
  },
  destroyed() {
    window.removeEventListener("keydown", this.atalhos, false);
  },
  methods: {
    atalhos(e) {
      const special = e.ctrlKey && e.shiftKey;

      if (special && e.key === "F6") {
        e.preventDefault();
        copiarPrograma(this.nomePrograma);
      }

      if (special && e.key === "F1") {
        e.preventDefault();
        this.$emit("incluir-item");
      }

      if (this.item) {
        if (special && e.key === "F2") {
          e.preventDefault();
          this.$emit("alterar-item", this.item);
        }

        if (special && e.key === "F3") {
          e.preventDefault();
          this.$emit("copiar-item", this.item);
        }

        if (special && e.key === "F4") {
          e.preventDefault();
          this.$emit("deletar-item", this.item);
        }

        if (special && e.key === "F5") {
          e.preventDefault();
          this.$emit("exporta-zoom", this.item);
        }
      }
    },
    paginando(paginacao) {
      this.$emit("paginando", paginacao);
    },
    salvarPropriedades(propriedades) {
      this.$emit("salvar-propriedades", propriedades);
    },
    linhaSelecionada(linha) {
      this.item = linha;
      this.$emit("linha-selecionada", linha);
    },
    alterarItem(item) {
      this.$emit("alterar-item", item);
    },
    copiarItem(item) {
      this.$emit("copiar-item", item);
    },
    exportaZoom(item) {
      this.$emit("exporta-zoom", item);
    },
    verDetalhes(item) {
      this.$emit("ver-detalhes", item);
    },
    deletarItem(item) {
      this.$emit("deletar-item", item);
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
    value: {},
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
    "totalizar-grupo": {
      type: Boolean,
      default: () => false,
    },
    "ativar-atalhos": {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<template>
  <div>
    <v-menu v-if="$vuetify.breakpoint.smAndDown">
      <template v-slot:activator="{ on, attrs }">
        <v-icon text v-bind="attrs" v-on="on"> mdi-menu </v-icon>
      </template>

      <v-list>
        <botoes-acao espacamento="mb-2" tipoDisplay="flex-column" v-bind="$props" />
      </v-list>
    </v-menu>
    <botoes-acao v-else v-bind="$props" />
  </div>
</template>

<script>
import BotoesAcao from "./botoesAcao.vue";
export default {
  components: { BotoesAcao },
  props: {
    incluir: {
      type: Boolean,
      default: () => false,
    },
    desabilitarIncluir: {
      type: Boolean,
      default: () => false,
    },
    carregarIncluir: {
      type: Boolean,
      default: () => false,
    },
    alterar: {
      type: Boolean,
      default: () => false,
    },
    desabilitarAlterar: {
      type: Boolean,
      default: () => false,
    },
    carregarAlterar: {
      type: Boolean,
      default: () => false,
    },
    deletar: {
      type: Boolean,
      default: () => false,
    },
    desabilitarDeletar: {
      type: Boolean,
      default: () => false,
    },
    carregarDeletar: {
      type: Boolean,
      default: () => false,
    },
    copiar: {
      type: Boolean,
      default: () => false,
    },
    desabilitarCopiar: {
      type: Boolean,
      default: () => false,
    },
    carregarCopiar: {
      type: Boolean,
      default: () => false,
    },
    filtro: {
      type: Boolean,
      default: () => false,
    },
    desabilitarFiltro: {
      type: Boolean,
      default: () => false,
    },
    carregarFiltro: {
      type: Boolean,
      default: () => false,
    },
    relatorio: {
      type: Boolean,
      default: () => false,
    },
    desabilitarRelatorio: {
      type: Boolean,
      default: () => false,
    },
    carregarRelatorio: {
      type: Boolean,
      default: () => false,
    },
    excel: {
      type: Boolean,
      default: () => false,
    },
    desabilitarExcel: {
      type: Boolean,
      default: () => false,
    },
    carregarExcel: {
      type: Boolean,
      default: () => false,
    },
    pdf: {
      type: Boolean,
      default: () => false,
    },
    desabilitarPdf: {
      type: Boolean,
      default: () => false,
    },
    carregarPdf: {
      type: Boolean,
      default: () => false,
    },
    atualizar: {
      type: Boolean,
      default: () => false,
    },
    desabilitarAtualizar: {
      type: Boolean,
      default: () => false,
    },
    carregarAtualizar: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>
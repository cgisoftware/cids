<template>
  <div>
    <v-btn
      small
      text
      v-if="incluirDefault"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon
        left
        color="blue"
      >mdi-plus</v-icon> incluir
    </v-btn>

    <v-btn
      small
      text
      v-if="alterar"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon
        left
        color="orange"
      >mdi-pencil</v-icon> alterar
    </v-btn>

    <v-btn
      small
      text
      v-if="deletar"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon
        left
        color="red"
      >mdi-delete</v-icon> excluir
    </v-btn>

    <v-btn
      small
      text
      v-if="copiar"
      @click="$emit('click')"
    >
      <v-icon
        left
        color="green darken-2"
      >mdi-content-copy</v-icon> copiar
    </v-btn>

    <v-btn
      small
      text
      v-if="filtro"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon
        left
        color="primary"
      >mdi-filter</v-icon> filtro
    </v-btn>

    <v-btn
      small
      text
      v-if="relatorio"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon
        left
        color="orange"
      >mdi-file-chart</v-icon> relatorio
    </v-btn>

    <v-btn
      small
      text
      v-if="excel"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon
        left
        color="green"
      >mdi-file-excel</v-icon> excel
    </v-btn>

    <v-btn
      small
      text
      v-if="pdf"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon
        left
        color="red"
      >mdi-file-pdf-box</v-icon> pdf
    </v-btn>

    <v-btn
      v-if="salvar"
      color="primary"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon left>mdi-content-save</v-icon> salvar
    </v-btn>

    <v-btn
      v-if="cancelar"
      outlined
      color="red"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon left>mdi-delete</v-icon> cancelar
    </v-btn>

    <v-btn
      v-if="limpar"
      outlined
      color="primary"
      @click="$emit('click')"
      :disabled="desabilitado"
      :loading="carregando"
    >
      <v-icon left>mdi-broom</v-icon> limpar
    </v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    incluirDefault() {
      return (
        this.incluir &&
        !this.alterar &&
        !this.deletar &&
        !this.copiar &&
        !this.filtro &&
        !this.relatorio &&
        !this.excel &&
        !this.pdf &&
        !this.salvar &&
        !this.cancelar &&
        !this.limpar
      );
    },
  },
  props: {
    incluir: {
      type: Boolean,
      default: () => true,
    },
    alterar: {
      type: Boolean,
      default: () => false,
    },
    deletar: {
      type: Boolean,
      default: () => false,
    },
    copiar: {
      type: Boolean,
      default: () => false,
    },
    filtro: {
      type: Boolean,
      default: () => false,
    },
    relatorio: {
      type: Boolean,
      default: () => false,
    },
    excel: {
      type: Boolean,
      default: () => false,
    },
    pdf: {
      type: Boolean,
      default: () => false,
    },
    limpar: {
      type: Boolean,
      default: () => false,
    },
    salvar: {
      type: Boolean,
      default: () => false,
    },
    cancelar: {
      type: Boolean,
      default: () => false,
    },
    desabilitado: {
      type: Boolean,
      default: () => false,
    },
    carregando: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>
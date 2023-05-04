<template>
  <v-text-field
    :label="nome"
    v-cgi-money="{}"
    :dense="compacto"
    ref="valor"
    :rules="regras"
    :disabled="desabilitado"
    v-model="valor"
  >
  </v-text-field>
</template>

<script>
import { moedaParaFloat, formataMoeda } from '../controller/handler/FormatNumber';
export default {
  data: (context) => ({
    valor: formataMoeda(context.value),
  }),
  watch: {
    valor: function () {
      const input = this.$refs.valor?.$el?.querySelector("input");
      if (input) {
        input.value = this.valor;
      }

      this.$emit("input", moedaParaFloat(this.valor));
    },
  },
  props: {
    compacto: {
      type: Boolean,
      default: false,
    },
    nome: {
      type: String,
      required: true,
    },
    regras: {
      type: Array,
      default: () => [],
    },
    value: {},
    desabilitado: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>
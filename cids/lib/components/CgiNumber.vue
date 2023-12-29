<template>
  <v-text-field
    :label="nome"
    :dense="compacto"
    ref="inputRef"
    :rules="regras"
    :disabled="desabilitado"
    v-model="valor"
  >
  </v-text-field>
</template>

<script setup>
import { ref } from "vue";
import { useCurrencyInput } from "vue-currency-input";
import { formataMoeda } from "../controller/handler/FormatNumber";

const props = defineProps({
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
  modelValue: {},
  desabilitado: {
    type: Boolean,
    default: () => false,
  },
  precisao: {
    type: Number,
    default: () => 2,
  },
  min: {
    type: Number,
    default: () => 0,
  },
  max: {
    type: Number,
    default: () => 999999999999999,
  },
});

const { inputRef } = useCurrencyInput({
  currency: "USD",
  currencyDisplay: "hidden",
  precision: props.precisao,
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: true,
  useGrouping: true,
  accountingSign: false,
  locale: "pt-BR",
  valueRange: {
    min: props.min,
    max: props.max,
  },
});

const emit = defineEmits(["update:modelValue"]);

const moeda = formataMoeda(props.modelValue, props.precisao);
const [numeros, decimais] = moeda.split(",");

const valor = ref(`${numeros},${decimais.padEnd(props.precisao, "0")}`);
</script>

<style>
</style>
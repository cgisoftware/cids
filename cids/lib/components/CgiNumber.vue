<template>
  <v-text-field
    v-model="formattedValue"
    ref="inputRef"
    :label="nome"
    :dense="compacto"
    :rules="regras"
    :disabled="desabilitado"
    :readonly="somenteLeitura"
  >
  </v-text-field>
</template>

<script setup>
import { watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";

const props = defineProps({
  compacto: {
    type: Boolean,
    default: false,
  },
  nome: {
    type: String,
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
  somenteLeitura: {
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
  inputProps: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["change"]);

const { inputRef, formattedValue, setValue } = useCurrencyInput({
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
  ...props.inputProps,
});

watch(
  () => props.modelValue,
  (value) => {
    setValue(value);
  }
);
</script>

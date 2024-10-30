<template>
  <v-text-field
    density="compact"
    v-model="data"
    :label="nome"
    :rules="regras"
    persistent-hint
    v-maska:[mask]
    @blur="blurTextField"
    :disabled="desabilitado"
    :readonly="somenteLeitura"
  >
    <template v-slot:append-inner>
      <v-menu
        v-model:model-value="menu"
        :close-on-click="true"
        :close-on-content-click="false"
        transition="scale-transition"
        location="bottom left"
        :disabled="desabilitado || somenteLeitura"
      >
        <template v-slot:activator="{ props: props }">
          <v-icon
            tabindex="-1"
            v-bind="props"
            :disabled="desabilitado"
            :readonly="somenteLeitura"
          >
            mdi-calendar
          </v-icon>
        </template>

        <v-date-picker
          density="compact"
          v-model:model-value="datePicker"
          v-show="menu"
          title="Selecione a data"
          show-adjacent-months
          @update:model-value="changePicker"
          viewMode="day"
        ></v-date-picker>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script setup>
import dayjs from "dayjs";
import isBetween from "dayjs/esm/plugin/isBetween";
import customParseFormat from "dayjs/esm/plugin/customParseFormat";
import { computed, ref } from "vue";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

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
  modelValue: {
    type: String,
  },
  tipo: {
    type: String,
    default: () => "dia",
  },
  desabilitado: {
    type: Boolean,
    default: () => false,
  },
  somenteLeitura: {
    type: Boolean,
    default: () => false,
  },
  formato: {
    type: String,
    default: () => "DD/MM/YYYY",
  },
});

const emit = defineEmits(["update:model-value"]);

const formatos = {
  mes: {
    "YYYY-MM": {
      formatoInterno: "MM/YYYY",
      formato: "YYYY-MM",
      dia: "MM",
    },
    "MM/YYYY": {
      formatoInterno: "MM/YYYY",
      formato: "MM/YYYY",
      dia: "MM",
    },
  },
  dia: {
    "YYYY-MM-DD": {
      formatoInterno: "DD/MM/YYYY",
      formato: "YYYY-MM-DD",
      dia: "DD",
    },
    "DD/MM/YYYY": {
      formatoInterno: "DD/MM/YYYY",
      formato: "DD/MM/YYYY",
      dia: "DD",
    },
  },
};

const formatoMascara = computed(() => {
  return formatos[props.tipo][props.formato];
});

const formataValorInicial = () => {
  if (!props.modelValue) return "";

  return dayjs(props.modelValue, props.formato).format(
    formatoMascara.value.formatoInterno
  );
};

const menu = ref(false);
const data = ref(formataValorInicial());
const datePicker = ref(dayjs(props.modelValue, props.formato).toDate());
const mask = ref({ mask: props.tipo == "dia" ? "##/##/####" : "##/####" });

const dataValida = (data) => {
  return data.isBetween("1900-01-01", "2100-01-01", "day");
};

const changePicker = (value) => {
  data.value = dayjs(value).format(formatoMascara.value.formatoInterno);
  menu.value = false;
  emit(
    "update:model-value",
    dayjs(data.value, formatoMascara.value.formatoInterno).format(
      formatoMascara.value.formato
    )
  );
};

const manipulacaoFormatos = {
  0: () => {
    return "";
  },
  1: () => {
    const dataInterna = dayjs(
      data.value.padStart(2, "0"),
      formatoMascara.value.dia
    );

    if (dataValida(dataInterna)) {
      return dataInterna.isValid()
        ? dataInterna.format(formatoMascara.value.formatoInterno)
        : "";
    }

    return dayjs().format(formatoMascara.value.formatoInterno);
  },
  2: () => {
    const [dia, mes] = data.value.split("/");
    const diaMes = `${dia}/${mes.padStart(2, "0")}`;
    const dataInterna = dayjs(diaMes, formatoMascara.value.formatoInterno);
    if (dataValida(dataInterna)) {
      return dataInterna.isValid()
        ? dataInterna.format(formatoMascara.value.formatoInterno)
        : "";
    }
    return dayjs().format(formatoMascara.value.formatoInterno);
  },
  3: () => {
    const [dia, mes, ano] = data.value.split("/");
    const diaMesMano = `${dia}/${mes}/${ano.padStart(4, "0")}`;
    const dataInterna = dayjs(diaMesMano, formatoMascara.value.formatoInterno);
    if (dataValida(dataInterna)) {
      return dataInterna.isValid()
        ? dataInterna.format(formatoMascara.value.formatoInterno)
        : "";
    }
    return dayjs().format(formatoMascara.value.formatoInterno);
  },
};

const blurTextField = () => {
  if (data.value) {
    const tamanho = data.value.split("/");
    data.value = manipulacaoFormatos[tamanho.length]();
    datePicker.value = dayjs(data.value, "DD/MM/YYYY").toDate();
    emit(
      "update:model-value",
      dayjs(data.value, formatoMascara.value.formatoInterno).format(
        formatoMascara.value.formato
      )
    );
    return;
  }

  emit("update:model-value", null);
};
</script>

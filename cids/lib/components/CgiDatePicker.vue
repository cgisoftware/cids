<template>
  <v-text-field
    ref="fieldRef"
    density="compact"
    v-maska:[mask]
    v-model="data"
    :rules="regras"
    :label="nome"
    :disabled="desabilitado"
    :readonly="somenteLeitura"
    @blur="blurTextField"
    persistent-hint
  >
    <template v-slot:append-inner>
      <v-menu
        v-model:model-value="menu"
        :close-on-click="true"
        :close-on-content-click="false"
        :disabled="desabilitado || somenteLeitura"
        transition="scale-transition"
        location="bottom left"
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
          title="Selecione a data"
          density="compact"
          v-show="menu"
          v-model="datePicker"
          v-model:year="year"
          v-model:month="month"
          :view-mode="tipo"
          @update:model-value="changePicker"
          @update:view-mode="setViewMode"
          @update:year="changePicker($event, 'year')"
          @update:month="changePicker($event, 'months')"
          show-adjacent-months
          hide-header
        />
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
      mes: "MM/YYYY",
    },
    "MM/YYYY": {
      formatoInterno: "MM/YYYY",
      formato: "MM/YYYY",
      dia: "MM",
      mes: "MM/YYYY",
    },
  },
  dia: {
    "YYYY-MM-DD": {
      formatoInterno: "DD/MM/YYYY",
      formato: "YYYY-MM-DD",
      dia: "DD",
      mes: "DD/MM",
    },
    "DD/MM/YYYY": {
      formatoInterno: "DD/MM/YYYY",
      formato: "DD/MM/YYYY",
      dia: "DD",
      mes: "DD/MM",
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

const getTipo = (tipo) => {
  if (tipo === "mes") return "months";

  return "date";
};

const menu = ref(false);
const data = ref(formataValorInicial());
const datePicker = ref(dayjs(props.modelValue, props.formato).toDate());
const mask = ref({ mask: props.tipo == "dia" ? "##/##/####" : "##/####" });
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());
const tipo = ref(getTipo(props.tipo));
const fieldRef = ref(null);

const dataValida = (data) => {
  return data.isBetween("1900-01-01", "2100-01-01", "day");
};

const setViewMode = (viewMode) => {
  fieldRef.value?.focus();

  if (props.tipo === "dia") {
    tipo.value = viewMode;
    return;
  }

  if (viewMode === "month") {
    tipo.value = "months";
    return;
  }

  tipo.value = "year";
};

const changePicker = (value, type = "month") => {
  fieldRef.value?.focus();

  switch (type) {
    case "year":
      data.value = dayjs()
        .month(month.value)
        .year(value)
        .format(formatoMascara.value.formatoInterno);
      break;
    case "months":
      data.value = dayjs()
        .month(value)
        .year(year.value)
        .format(formatoMascara.value.formatoInterno);
      break;
    default:
      data.value = dayjs(value).format(formatoMascara.value.formatoInterno);
      break;
  }

  menu.value = false;

  emit(
    "update:model-value",
    dayjs(data.value, formatoMascara.value.formatoInterno).format(
      formatoMascara.value.formato
    )
  );

  fieldRef.value?.blur();
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
    const dataInterna = dayjs(diaMes, formatoMascara.value.mes);
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

    switch (tipo.value) {
      case "months":
      case "year":
        const dateParts = data.value.split("/");
        const month = parseInt(dateParts[0]) - 1;
        const year = parseInt(dateParts[1]);
        datePicker.value = dayjs().year(year).month(month).date(1).toDate();
        break;
      default:
        datePicker.value = dayjs(data.value, "DD/MM/YYYY").toDate();
        break;
    }

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

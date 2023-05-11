<template>
  <v-text-field
    :dense="compacto"
    :label="nome"
    :rules="regras"
    v-model="data"
    :data-maska="mascara"
    v-maska
    :disabled="desabilitado"
    @blur="blurTextField"
    persistent-hint
  >
    <template v-slot:append>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-click="true"
        :close-on-content-click="false"
        transition="scale-transition"
        left
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-icon
            tabindex="-1"
            v-bind="attrs"
            v-on="menu"
          >mdi-calendar</v-icon>
        </template>
        <v-date-picker
          :type="tipoDatePicker"
          v-model="datePicker"
          no-title
          @input="menu = false"
          min="1900-01-01"
          max="2100-01-01"
        ></v-date-picker>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script>
import moment from "moment";
export default {
  data: (context) => ({
    menu: false,
    data: null,
    datePicker: null,
    manipulacaoFormatos: {
      0: () => {
        return "";
      },
      1: () => {
        const data = moment(
          context.data.padStart(2, "0"),
          context.formatoMascara.dia
        );

        if (context.dataValida(data)) {
          return data.isValid() ? data.format(context.formatoMascara.pt) : "";
        }

        return moment().format(context.formatoMascara.pt);
      },
      2: () => {
        const data = moment(context.data, context.formatoMascara.mes);
        if (context.dataValida(data)) {
          return data.isValid() ? data.format(context.formatoMascara.pt) : "";
        }
        return moment().format(context.formatoMascara.pt);
      },
      3: () => {
        const data = moment(context.data, context.formatoMascara.ano);
        if (context.dataValida(data)) {
          return data.isValid() ? data.format(context.formatoMascara.pt) : "";
        }
        return moment().format(context.formatoMascara.pt);
      },
    },
  }),
  computed: {
    formatoMascara() {
      return this.tipo === "mes"
        ? {
            en: "YYYY-MM",
            pt: "MM/YYYY",
            dia: "MM",
            mes: "MM/YYYY",
            ano: "MM/YYYY",
          }
        : {
            en: "YYYY-MM-DD",
            pt: "DD/MM/YYYY",
            dia: "DD",
            mes: "DD/MM",
            ano: "DD/MM/YYYY",
          };
    },
    mascara() {
      return this.tipo === "mes" ? "##/####" : "##/##/####";
    },
    tipoDatePicker() {
      return this.tipo === "mes" ? "month" : "date";
    },
    formatoPadrao() {
      return this.formato || this.formatoMascara.pt;
    },
  },
  methods: {
    dataValida(data) {
      return data.isBetween("1900-01-01", "2100-01-01");
    },
    formataData(data, de, para) {
      if (data) {
        const dataMoment = moment(data, de);

        if (this.dataValida(dataMoment)) {
          return dataMoment.format(para);
        }

        return null;
      }
    },
    blurTextField() {
      if (this.data) {
        const tamanho = this.data.split("/");
        this.data = this.manipulacaoFormatos[tamanho.length]();
        this.datePicker = this.formataData(
          this.data,
          this.formatoMascara.pt,
          this.formatoMascara.en
        );
        this.$emit(
          "input",
          moment(this.data, this.formatoMascara.pt).format(this.formatoPadrao)
        );

        return;
      }

      this.$emit("input", null);
    },
  },
  mounted() {
    this.data = this.formataData(
      this.value,
      this.formatoPadrao,
      this.formatoMascara.pt
    );
  },
  watch: {
    value() {
      this.data = this.formataData(
        this.value,
        this.formatoPadrao,
        this.formatoMascara.pt
      );
    },
    datePicker() {
      this.data = this.formataData(
        this.datePicker,
        this.formatoMascara.en,
        this.formatoMascara.pt
      );

      this.$emit(
        "input",
        moment(this.data, this.formatoMascara.pt).format(this.formatoPadrao)
      );
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
    value: {
      type: String,
    },
    tipo: {
      type: String,
    },
    desabilitado: {
      type: Boolean,
      default: () => false,
    },
    formato: {
      type: String,
    },
  },
};
</script>

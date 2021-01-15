<template>
  <v-text-field
    :dense="compacto"
    :label="nome"
    :rules="regras"
    v-cgi-mask="mask"
    v-model="data"
    @blur="formataData"
    persistent-hint
  >
    <template v-slot:append>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-click="false"
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
          :type="tipoDate"
          v-model="picker"
          no-title
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script>
import moment from "moment";
export default {
  data: (vm) => ({
    data: vm.value,
    picker: null,
    menu: false,
  }),
  watch: {
    value() {
      this.data = this.value;
    },
    picker() {
      this.data = moment(this.picker, "YYYY-MM-DD").format(this.format);
      this.$emit("input", this.data);
    },
  },
  computed: {
    format() {
      switch (this.tipo) {
        case "mes":
          return "MM/YYYY";
      }

      return "DD/MM/YYYY";
    },
    mask() {
      switch (this.tipo) {
        case "mes":
          return {
            tipo: "mes-ano",
          };
      }

      return {
        tipo: "dia-mes-ano",
      };
    },
    tipoDate() {
      switch (this.tipo) {
        case "mes":
          return "month";
      }

      return "date";
    },
  },
  methods: {
    formataData() {
      if (this.data) {
        let dia, mes, ano;
        if (this.mask.tipo == "mes-ano") {
          [mes, ano] = this.data.split("/");
        } else {
          [dia, mes, ano] = this.data.split("/");
        }

        let d = dia;
        let m = mes;
        let y = ano;

        if (!dia || dia == "") {
          d = 1;
        }

        if (!mes || mes == "") {
          m = moment().month() + 1;
        }

        if (!ano || ano == "") {
          y = moment().year();
        }

        const data = moment(`${d}/${m}/${y}`, "DD/MM/YYYY").format(this.format);

        if (moment(data, this.format, true).isValid()) {
          this.picker = moment(data, this.format).format("YYYY-MM-DD");
          this.data = moment(this.picker, "YYYY-MM-DD").format(this.format);
          this.$emit("input", this.data);
        } else {
          this.data = null;
        }
      }
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
  },
};
</script>

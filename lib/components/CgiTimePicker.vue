<template>
  <v-text-field
    :dense="compacto"
    :label="nome"
    :rules="regras"
    v-mask="mask"
    v-model="hora"
    @blur="formataData"
  >
    <template v-slot:append>
      <v-menu
        ref="menu"
        :return-value.sync="picker"
        v-model="menu"
        :close-on-content-click="false"
        :close-on-click="false"
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
          >mdi-alarm</v-icon>
        </template>
        <v-time-picker
          v-model="picker"
          full-width
          @click:minute="$refs.menu.save(picker)"
          format="24hr"
        ></v-time-picker>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script>
import moment from "moment";
export default {
  data: (vm) => ({
    hora: vm.value,
    picker: null,
    menu: false,
    mask: "##:##",
  }),
  watch: {
    picker() {
      this.hora = moment(this.picker, "HH:mm").format("HH:mm");
      this.$emit("input", this.hora);
    },
  },
  methods: {
    formataData() {
      if (this.hora) {
        const [hora, min] = this.hora.split(":");

        let h = hora;
        let m = min;

        if (!hora || hora == "") {
          h = moment().hour();
        }
        if (!min || min == "") {
          m = "00";
        }

        const horah = moment(`${h}:${m}`, "HH:mm").format("HH:mm");

        if (moment(horah, "HH:mm", true).isValid()) {
          this.picker = moment(horah, "HH:mm").format("HH:mm");
          this.hora = moment(this.picker, "HH:mm").format("HH:mm");
          this.$emit("input", this.hora);
        } else {
          this.hora = null;
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
  },
};
</script>


<template>
  <v-text-field
    :dense="compacto"
    :label="nome"
    :rules="regras"
    :data-maska="mascara"
    v-maska
    v-model="hora"
    :disabled="desabilitado"
    :readonly="somenteLeitura"
    @blur="formataData"
    @input="$emit('input', hora)"
  >
    <template v-slot:append>
      <v-menu
        ref="menu"
        :return-value.sync="picker"
        v-model="menu"
        :close-on-content-click="false"
        :close-on-click="true"
        transition="scale-transition"
        left
        max-width="290px"
        min-width="290px"
        :disabled="desabilitado || somenteLeitura"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-icon
            tabindex="-1"
            v-bind="attrs"
            v-on="menu"
            :disabled="desabilitado"
            :readonly="somenteLeitura"
          >
            mdi-alarm
          </v-icon>
        </template>

        <v-time-picker
          v-model="picker"
          full-width
          @click:minute="$refs.menu.save(picker)"
          format="24hr"
        />
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
    mascara: "##:##",
  }),
  watch: {
    value() {
      this.hora = this.value;
    },
    picker() {
      this.hora = moment(this.picker, "HH:mm").format("HH:mm");
      this.$emit("input", this.hora);
    },
  },
  methods: {
    async formataData() {
      if (this.hora) {
        const [hora1, hora2, min1, min2] = this.hora.replace(":", "").split("");

        const [h1, h2, m1, m2] = [
          hora1 ?? "0",
          hora2 ?? "0",
          min1 ?? "0",
          min2 ?? "0",
        ];

        const horah = moment(`${h1}${h2}:${m1}${m2}`, "HH:mm").format("HH:mm");

        if (moment(horah, "HH:mm", true).isValid()) {
          this.picker = moment(horah, "HH:mm").format("HH:mm");
          this.hora = moment(this.picker, "HH:mm").format("HH:mm");
          this.$emit("input", this.hora);
        } else {
          this.hora = null;
          this.$emit("input", null);
        }
      } else {
        this.$emit("input", null);
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
    desabilitado: {
      type: Boolean,
      default: false,
    },
    somenteLeitura: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

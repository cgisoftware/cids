<template>
  <v-card>
    <v-card-title
      class="pa-0"
      v-if="mostraToolbar"
    >
      <v-toolbar
        color="primary"
        class="white--text"
        dense
      >{{ titulo }}</v-toolbar>
    </v-card-title>
    <v-card-text class="mt-10">
      <v-form ref="form">
        <v-row
          v-for="linha in qtdLinhas"
          :key="linha"
        >
          <v-col
            :cols="configuracao[`linha${linha}`][coluna-1].coluna"
            v-for="coluna in configuracao[`linha${linha}`].length"
            :key="coluna"
          >
            <v-text-field
              :dense="configuracao[`linha${linha}`][coluna-1].compacto"
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'texto'"
              :rules="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="form[configuracao[`linha${linha}`][coluna-1].chave]"
              v-mask="configuracao[`linha${linha}`][coluna-1].mascara"
              :type="configuracao[`linha${linha}`][coluna-1].tipo"
            ></v-text-field>
            <v-textarea
              :dense="configuracao[`linha${linha}`][coluna-1].compacto"
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'texto-area'"
              :rules="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="form[configuracao[`linha${linha}`][coluna-1].chave]"
            ></v-textarea>
            <cgi-date-picker
              :compacto="configuracao[`linha${linha}`][coluna-1].compacto"
              :nome="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'data'"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="form[configuracao[`linha${linha}`][coluna-1].chave]"
            ></cgi-date-picker>
            <cgi-time-picker
              :compacto="configuracao[`linha${linha}`][coluna-1].compacto"
              :nome="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'hora'"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="form[configuracao[`linha${linha}`][coluna-1].chave]"
            ></cgi-time-picker>
            <cgi-zoom-picker
              :compacto="configuracao[`linha${linha}`][coluna-1].compacto"
              :nome="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'zoom'"
              :zoom="configuracao[`linha${linha}`][coluna-1].zoom"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              :chave="configuracao[`linha${linha}`][coluna-1].chaveZoom"
              v-model="form[configuracao[`linha${linha}`][coluna-1].chave]"
              :posicao="configuracao[`linha${linha}`][coluna-1].posicao"
              :formata-valor="configuracao[`linha${linha}`][coluna-1].formataValor"
            ></cgi-zoom-picker>
            <v-select
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'select'"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="form[configuracao[`linha${linha}`][coluna-1].chave]"
              :dense="configuracao[`linha${linha}`][coluna-1].compacto"
              :items="customProps[configuracao[`linha${linha}`][coluna-1].chave]"
              :item-text="configuracao[`linha${linha}`][coluna-1].textoItem"
              :item-value="configuracao[`linha${linha}`][coluna-1].valorItem"
            ></v-select>
            <v-autocomplete
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'autocomplete'"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="form[configuracao[`linha${linha}`][coluna-1].chave]"
              :dense="configuracao[`linha${linha}`][coluna-1].compacto"
              :items="customProps[configuracao[`linha${linha}`][coluna-1].chave]"
              :item-text="configuracao[`linha${linha}`][coluna-1].textoItem"
              :item-value="configuracao[`linha${linha}`][coluna-1].valorItem"
            ></v-autocomplete>
            <v-checkbox
              dense
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-model="form[configuracao[`linha${linha}`][coluna-1].chave]"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'checkbox'"
            >
            </v-checkbox>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        @click="cancelar"
        outlined
        color="red"
        small
      >
        <v-icon left>mdi-delete</v-icon> Cancelar
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        @click="limpar"
        outlined
        color="primary"
        small
      >
        <v-icon left>mdi-broom</v-icon> Limpar
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        small
        @click="confirmar"
      >
        <v-icon left>mdi-content-save</v-icon> Salvar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { mask } from "ke-the-mask";
export default {
  // directives: { mask },
  data: () => ({
    form: {},
  }),
  mounted() {
    this.limpar();
  },
  computed: {
    qtdLinhas() {
      return Object.entries(this.configuracao).length;
    },

    customProps() {
      return { ...this.$attrs };
    },
  },
  methods: {
    cancelar() {
      this.limpar();
      this.$emit("cancelar");
    },
    confirmar() {
      if (this.$refs.form.validate()) {
        this.$emit("confirmar", this.form);
        this.limpar();
        this.$refs.form.resetValidation();
      }
    },
    limpar() {
      const obj = {};
      for (let linha of Object.entries(this.configuracao)) {
        for (let item of linha[1]) {
          if (item.chave) {
            obj[item.chave] = item.valorInicial;
          }
        }
      }
      this.form = obj;
      this.$refs.form.resetValidation();
    },
  },
  props: {
    titulo: {
      type: String,
      required: true,
    },
    configuracao: {
      type: Object,
      required: true,
    },
    mostraToolbar: {
      type: Boolean,
      default: () => true,
    },
  },
};
</script>

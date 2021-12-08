<template>
  <v-card :width="largura">
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
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
              v-mask="configuracao[`linha${linha}`][coluna-1].mascara"
              :type="configuracao[`linha${linha}`][coluna-1].tipo"
            ></v-text-field>
            <v-textarea
              :dense="configuracao[`linha${linha}`][coluna-1].compacto"
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'texto-area'"
              :rules="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
            ></v-textarea>
            <cgi-date-picker
              :compacto="configuracao[`linha${linha}`][coluna-1].compacto"
              :nome="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'data'"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
            ></cgi-date-picker>
            <cgi-time-picker
              :compacto="configuracao[`linha${linha}`][coluna-1].compacto"
              :nome="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'hora'"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
            ></cgi-time-picker>
            <cgi-zoom-picker
              :compacto="configuracao[`linha${linha}`][coluna-1].compacto"
              :nome="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'zoom'"
              :zoom="configuracao[`linha${linha}`][coluna-1].zoom"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              :chave="configuracao[`linha${linha}`][coluna-1].chaveZoom"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
              :posicao="configuracao[`linha${linha}`][coluna-1].posicao"
              :formata-valor="configuracao[`linha${linha}`][coluna-1].formataValor"
              :ao-digitar="configuracao[`linha${linha}`][coluna-1].aoDigitar"
            ></cgi-zoom-picker>
            <v-select
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'select'"
              :rules="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
              :dense="configuracao[`linha${linha}`][coluna-1].compacto"
              :items="customProps[configuracao[`linha${linha}`][coluna-1].chave]"
              :item-text="configuracao[`linha${linha}`][coluna-1].textoItem"
              :item-value="configuracao[`linha${linha}`][coluna-1].valorItem"
            ></v-select>
            <v-autocomplete
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'autocomplete'"
              :rules="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
              :dense="configuracao[`linha${linha}`][coluna-1].compacto"
              :items="customProps[configuracao[`linha${linha}`][coluna-1].chave]"
              :item-text="configuracao[`linha${linha}`][coluna-1].textoItem"
              :item-value="configuracao[`linha${linha}`][coluna-1].valorItem"
            ></v-autocomplete>
            <v-checkbox
              dense
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
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
        <v-icon left>mdi-content-save</v-icon> {{ labelConfirmacao }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { mask } from "ke-the-mask";
import { toAblQueryForm } from '../util'
export default {
  // directives: { mask },
  data: (vm) => ({
    internalForm: vm.value,
  }),
  mounted() {
    const obj = {};
    for (let linha of Object.entries(this.configuracao)) {
      for (let item of linha[1]) {
        if (item.chave) {
          if (item.chave in this.internalForm) {
            obj[item.chave] = this.internalForm[item.chave];
          } else {
            obj[item.chave] = "valorInicial" in item ? item.valorInicial : null;
          }

          this.$watch(`internalForm.${item.chave}`, function (newValue, oldValue) {
            this.$emit(`change-${item.chave}`, {
              valorAnterior: oldValue,
              valorNovo: newValue
            })
          });
        }
      }
    }
    this.internalForm = obj;
    this.$refs.form.resetValidation();
  },
  computed: {
    qtdLinhas() {
      return Object.entries(this.configuracao).length;
    },

    customProps() {
      return { ...this.$attrs };
    },
  },
  watch: {
    internalForm: {
      handler(val) {
        this.$emit("input", val);
        this.$emit("change", val);
      },
      deep: true,
    },
  },
  methods: {
    cancelar() {
      //this.limpar();
      this.$emit("cancelar");
    },
    confirmar() {
      if (this.$refs.form.validate()) {
        if (this.retornarQuery) {
          const query = toAblQueryForm(this.configuracao, this.internalForm)
          this.$emit("confirmar", query);
        } else {
          this.$emit("confirmar");
        }

        // this.limpar();
        this.$refs.form.resetValidation();
      }
    },
    limpar() {
      const obj = {};
      for (let linha of Object.entries(this.configuracao)) {
        for (let item of linha[1]) {
          if (item.chave) {
            obj[item.chave] = "valorInicial" in item ? item.valorInicial : null;
          }
        }
      }
      this.internalForm = obj;
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
    "mostra-toolbar": {
      type: Boolean,
      default: () => true,
    },
    value: {},
    "label-confirmacao": {
      type: String,
      default: () => "Salvar",
    },
    largura: {
      type: String,
      default: () => ""
    },
    'retornar-query': {
      type: Boolean,
      default: () => false,
    }
  },
};
</script>

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
      <v-form
        ref="form"
        :disabled="carregando"
      >
        <v-row
          v-for="linha in qtdLinhas"
          :key="linha"
        >
          <v-col
            :cols="configuracao[`linha${linha}`][coluna-1].coluna"
            v-for="coluna in configuracao[`linha${linha}`].length"
            :key="coluna"
          >
            <v-row
              no-gutters
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'divisor'"
              class="mb-3"
            >
              <v-col>
                <v-divider class="mt-4" />
              </v-col>
              <v-col class="text-center"> {{ configuracao[`linha${linha}`][coluna-1].nome }} </v-col>
              <v-col>
                <v-divider class="mt-3" />
              </v-col>
            </v-row>
            <v-text-field
              :dense="configuracao[`linha${linha}`][coluna-1].compacto"
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'texto'"
              :rules="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
              v-mask="configuracao[`linha${linha}`][coluna-1].mascara"
              :type="configuracao[`linha${linha}`][coluna-1].tipo"
              :readonly="configuracao[`linha${linha}`][coluna-1].desabilitado"
            ></v-text-field>
            <v-textarea
              :dense="configuracao[`linha${linha}`][coluna-1].compacto"
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'texto-area'"
              :rules="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
              :readonly="configuracao[`linha${linha}`][coluna-1].desabilitado"
            ></v-textarea>
            <cgi-date-picker
              :compacto="configuracao[`linha${linha}`][coluna-1].compacto"
              :nome="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'data'"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
              :desabilitado="configuracao[`linha${linha}`][coluna-1].desabilitado"
            ></cgi-date-picker>
            <cgi-time-picker
              :compacto="configuracao[`linha${linha}`][coluna-1].compacto"
              :nome="configuracao[`linha${linha}`][coluna-1].nome"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'hora'"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
              :desabilitado="configuracao[`linha${linha}`][coluna-1].desabilitado"
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
              :desabilitado="configuracao[`linha${linha}`][coluna-1].desabilitado"
              :campo-valor-formatado="configuracao[`linha${linha}`][coluna-1].campoValorFormatado || 'nome'"
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
              :readonly="configuracao[`linha${linha}`][coluna-1].desabilitado"
              :multiple="configuracao[`linha${linha}`][coluna-1].multiplo"
              :chips="configuracao[`linha${linha}`][coluna-1].multiplo"
              :small-chips="configuracao[`linha${linha}`][coluna-1].multiplo"
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
              :readonly="configuracao[`linha${linha}`][coluna-1].desabilitado"
              :multiple="configuracao[`linha${linha}`][coluna-1].multiplo"
              :chips="configuracao[`linha${linha}`][coluna-1].multiplo"
              :small-chips="configuracao[`linha${linha}`][coluna-1].multiplo"
            ></v-autocomplete>
            <v-checkbox
              dense
              :label="configuracao[`linha${linha}`][coluna-1].nome"
              v-model="internalForm[configuracao[`linha${linha}`][coluna-1].chave]"
              :regras="configuracao[`linha${linha}`][coluna-1].regras"
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'checkbox'"
              :readonly="configuracao[`linha${linha}`][coluna-1].desabilitado"
            >
            </v-checkbox>
            <v-btn
              block
              v-if="configuracao[`linha${linha}`][coluna-1].campo == 'botao'"
              @click="$emit('click-'+configuracao[`linha${linha}`][coluna-1].chave)"
              :color="configuracao[`linha${linha}`][coluna-1].cor"
            >
              <v-icon
                v-if="configuracao[`linha${linha}`][coluna-1].icone"
                left
              >{{ configuracao[`linha${linha}`][coluna-1].icone }}</v-icon>
              {{ configuracao[`linha${linha}`][coluna-1].nome }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <cgi-btn
        cancelar
        @click="cancelar"
        v-if="mostraCancelar"
        :desabilitado="carregando"
      ></cgi-btn>
      <v-spacer v-if="mostraCancelar"></v-spacer>
      <cgi-btn
        limpar
        @click="limpar"
        :desabilitado="carregando"
      ></cgi-btn>
      <v-spacer></v-spacer>
      <cgi-btn
        :filtrar="filtrar"
        :salvar="!filtrar"
        @click="confirmar"
        :carregando="carregando"
      ></cgi-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { mask } from "ke-the-mask";
import { toAblQueryForm } from "../util";
export default {
  // directives: { mask },
  data: (vm) => ({
    internalForm: vm.value,
    enumTipos: {
      integer: (valor) => {
        return parseInt(valor);
      },
      float: (valor) => {
        return parseFloat(valor);
      },
      boolean: (valor) => {
        return valor === "true";
      },
      string: (valor) => {
        return valor;
      },
      list: (valor) => {
        return (
          valor
            ?.toString()
            .split(",")
            .map((val) => parseInt(val)) ?? []
        );
      },
    },
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

          if (item.campo !== "botao") {
            this.$watch(
              `internalForm.${item.chave}`,
              function (newValue, oldValue) {
                this.$emit(`change-${item.chave}`, {
                  valorAnterior: oldValue,
                  valorNovo: newValue,
                });
              }
            );
          }
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
    value() {
      const obj = Object.assign(this.internalForm, this.value);

      for (let linha of Object.entries(this.configuracao)) {
        for (let item of linha[1]) {
          if (obj[item.chave] && item.conversor) {
            obj[item.chave] = this.enumTipos[item.conversor](obj[item.chave]);
          }
        }
      }

      this.internalForm = obj;
      this.$refs.form.resetValidation();
    },
  },
  methods: {
    cancelar() {
      //this.limpar();
      this.$emit("cancelar");
    },
    confirmar() {
      if (!this.carregando) {
        if (this.$refs.form.validate()) {
          if (this.retornarQuery) {
            const query = toAblQueryForm(this.configuracao, this.internalForm);
            this.$emit("confirmar", query);
          } else {
            this.$emit("confirmar");
          }
          this.$refs.form.resetValidation();
        }
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
    value: {
      default: () => {},
    },
    "label-confirmacao": {
      type: String,
      default: () => "Salvar",
    },
    largura: {
      type: String,
      default: () => "",
    },
    "retornar-query": {
      type: Boolean,
      default: () => false,
    },
    carregando: {
      type: Boolean,
      default: () => false,
    },
    "icone-confirmacao": {
      type: String,
      default: () => "mdi-content-save",
    },
    "mostra-cancelar": {
      type: Boolean,
      default: () => true,
    },
    filtrar: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

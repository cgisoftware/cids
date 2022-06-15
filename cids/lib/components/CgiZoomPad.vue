<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-text-field
          :dense="compacto"
          :label="nome"
          :rules="regras"
          v-model="valor"
          :type="tipo"
          :disabled="desabilitado"
          @click:prepend-inner="chamaZoom"
          @click:append="clear"
          prepend-inner-icon="mdi-database-search-outline"
          append-icon="mdi-close"
          :loading="loading"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :dense="compacto"
          :value="descricao"
          readonly
          :loading="loading"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-dialog
      :width="largura"
      persistent
      v-model="dialog"
    >
      <v-card>

        <cgi-data-table
          :linhas="linhas"
          :colunas="colunas"
          :nome-tabela="nomeTabela"
          mostra-acoes
          mostra-pesquisa
          :mostra-paginacao="false"
          altura="80%"
          :zoom-dialog="true"
          @exporta-zoom="setaValor"
          :alterar="false"
          :copiar="false"
          :deletar="false"
          @cancelar-zoom="dialog = false"
        >
        </cgi-data-table>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import axios from "axios";
import { alert, snackbar } from "../util";

export default {
  data: (vm) => ({
    valor: vm.value,
    dialog: false,
    descricao: null,
    item: {},
    loading: false,
    linhas: [],
    colunas: [
      {
        text: "Código",
        align: "start",
        sortable: false,
        value: "codigo",
      },
      {
        text: "Descrição",
        align: "start",
        sortable: false,
        value: "descricao",
      },
    ],
  }),
  watch: {
    valor() {
      this.$emit("input", this.valor);
      this.buscaDescricao();
    },
    value() {
      this.valor = this.value;
    },
  },
  mounted() {
    this.valor = this.value;
  },
  methods: {
    async buscaDescricao() {
      try {
        this.loading = true;
        const serviceURI = localStorage.getItem("serviceURI");
        const url = serviceURI.split("|")[0];
        const response = await axios.get(`${url}/rest/admin/adm210`, {
          params: {
            filter: {
              ablFilter: `tipo = '${this.chave}' and codigo = '${this.valor}'`,
            },
          },
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        });
        this.descricao =
          response?.data?.dSet?.ttZoomPadSeq?.[0].descricao ?? "";
      } catch (error) {
        alert.show({ message: error.toString() });
      } finally {
        this.loading = false;
      }
    },

    async buscaValores() {
      try {
        debugger;
        this.loading = true;
        const serviceURI = localStorage.getItem("serviceURI");
        const url = serviceURI.split("|")[0];
        const response = await axios.get(`${url}/rest/admin/adm210`, {
          params: {
            filter: {
              ablFilter: `tipo = '${this.chave}'`,
            },
          },
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        });
        this.linhas = response?.data?.dSet?.ttZoomPadSeq ?? [];
      } catch (error) {
        snackbar.show({ message: error.toString() });
      } finally {
        this.loading = false;
      }
    },

    setaValor: function (valor) {
      this.valor = valor["codigo"];
      this.descricao = valor["descricao"];

      this.item = valor;
      this.dialog = false;
      
      this.$emit("change", this.item);
    },
    async chamaZoom() {
      if (!this.loading) {
        await this.buscaValores();
        this.dialog = true;
      }
    },
    clear() {
      this.valor = 0;
      this.descricao = null;
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
    value: {},
    desabilitado: {
      type: Boolean,
      default: false,
    },
    largura: {
      type: String,
      default: () => "70%",
    },
    tipo: {
      type: String,
      default: () => "number",
    },
    chave: {
      type: String,
      required: true,
    },
    "nome-tabela": {
      type: String,
      required: true,
    },
  },
};
</script>